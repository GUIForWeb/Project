package apps.fileBrowser.modules;

import java.util.HashMap;
import java.util.Map;

import system.daoInterfaces.SharedFoldersDAO;
import system.daoInterfaces.SharedUsersDAO;
import system.daoInterfaces.UsersDAO;
import system.daos.sqlites.SharedFoldersDAOSQLite;
import system.daos.sqlites.SharedUsersDAOSQLite;
import system.daos.sqlites.UsersDAOSQLite;
import system.models.SharedUser;
import system.models.User;

public class ShareManager {
	private int toId;
	private int suId;
	private User user;
	private SharedFoldersDAO sfDAO;
	private SharedUsersDAO suDAO;
	private String[] permissions;
	private String folder;
	private Map<Integer,SharedUser> sharedUserMap;
	private SharedUser[] sharedUsers;
	public ShareManager() {
		this.sfDAO = new SharedFoldersDAOSQLite();
		this.suDAO = new SharedUsersDAOSQLite();
		this.sharedUserMap = new HashMap<Integer, SharedUser>();
	}
	public void start() {
		String[] tmpPermissions = {"-","-","-"};
		this.checkPermissions(tmpPermissions, this.permissions, 0);
		String permissions = tmpPermissions[0]+tmpPermissions[1]+tmpPermissions[2];
		this.suDAO.setPermissions(permissions);
		if(this.sfDAO.getShareFolder() == null) {
			this.sfDAO.setUser(this.user);
			this.sfDAO.setFolder(this.folder);
			this.sfDAO.newSharedFolder();
			this.sfDAO.loadUsersForFolder();
			this.suDAO.setShareFolder(this.sfDAO.getShareFolder());
		}
		if(this.suDAO.getSharedUserMap() != null)
			this.sharedUserMap = this.suDAO.getSharedUserMap();
		if(this.sharedUserMap.get(this.toId) == null) {
			UsersDAO usersDAO = new UsersDAOSQLite();
			User user = usersDAO.selectUser(this.toId);
			this.suDAO.setUser(user);
			this.suDAO.insert();
		}
		else {
			this.suDAO.update(this.toId);
		}
		this.suDAO.load();
		this.makeSharedUsers();
	}
	public void stop() {
		this.suDAO.delete(this.suId);
		this.suDAO.load();
		this.makeSharedUsers();
	}
	private void checkPermissions(String[] tmpPermissions,String[] permissions, int cnt) {
		if(this.permissions.length >= cnt+1) {
			if(this.permissions[cnt].equals("r"))
				tmpPermissions[0] = "r";
			else if(this.permissions[cnt].equals("w")) 
				tmpPermissions[1] = "w";
			else if(this.permissions[cnt].equals("x")) 
				tmpPermissions[2] = "x";
			this.checkPermissions(tmpPermissions,this.permissions, ++cnt);
		}
	}
	public void loadSharedUsers(){
		this.sfDAO.setUser(this.user);
		this.sfDAO.setFolder(this.folder);
		this.sfDAO.loadUsersForFolder();
		if(this.sfDAO.getShareFolder() != null) {
			this.suDAO.setShareFolder(this.sfDAO.getShareFolder());
			this.suDAO.setUser(this.user);
			this.suDAO.load();
			this.makeSharedUsers();
		}
	}
	private void makeSharedUsers(){
		this.sharedUserMap = this.suDAO.getSharedUserMap();
		String ids = this.sharedUserMap.keySet().toString();
		ids = ids.substring(0, ids.length()-1);
		ids = ids.substring(1, ids.length());
		UsersDAO usersDAO = new UsersDAOSQLite();
		User[] users = usersDAO.selectUsers(ids);
		this.sharedUsers = new SharedUser[this.sharedUserMap.size()];
		for(int ui=0; ui<users.length; ui++) {
			this.sharedUsers[ui] = this.sharedUserMap.get(users[ui].getId());
			this.sharedUsers[ui].setUser(users[ui]);
		}
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public int getToId() {
		return toId;
	}
	public void setToId(int toId) {
		this.toId = toId;
	}
	public String[] getPermissions() {
		return permissions;
	}
	public void setPermissions(String[] permissions) {
		this.permissions = permissions;
	}
	public String getFolder() {
		return folder;
	}
	public void setFolder(String folder) {
		this.folder = folder;
	}
	public SharedUser[] getSharedUsers() {
		return sharedUsers;
	}
	public void setSharedUsers(SharedUser[] sharedUsers) {
		this.sharedUsers = sharedUsers;
	}
	public int getSuId() {
		return suId;
	}
	public void setSuId(int suId) {
		this.suId = suId;
	}
	public Map<Integer, SharedUser> getSharedUserMap() {
		return sharedUserMap;
	}
	public void setSharedUserMap(Map<Integer, SharedUser> sharedUserMap) {
		this.sharedUserMap = sharedUserMap;
	}
}
