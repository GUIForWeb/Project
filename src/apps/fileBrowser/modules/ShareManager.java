package apps.fileBrowser.modules;

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
	private User user;
	private SharedFoldersDAO sfDAO;
	private SharedUsersDAO suDAO;
	private String[] permissions;
	private String folder;
	public ShareManager() {
		this.sfDAO = new SharedFoldersDAOSQLite();
		this.suDAO = new SharedUsersDAOSQLite(); 
	}
	public void start() {
		String[] tmpPermissions = {"-","-","-"};
		this.checkPermissions(tmpPermissions, this.permissions, 0);
		String permissions = tmpPermissions[0]+tmpPermissions[1]+tmpPermissions[2];
		if(this.sfDAO.getShareFolder() == null) {
			this.sfDAO.setUser(this.user);
			this.sfDAO.setFolder(this.folder);
			this.sfDAO.newSharedFolder();
			this.sfDAO.load();
			this.suDAO.setShareFolder(this.sfDAO.getShareFolder());
		}
		UsersDAO usersDAO = new UsersDAOSQLite();
		User user = usersDAO.selectUser(this.toId);
		this.suDAO.setUser(user);
		this.suDAO.setPermissions(permissions);
		if(this.suDAO.getSharedUserMap().size() == 0)
			this.suDAO.shareFolderWithUser();
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
		this.sfDAO.load();
		if(this.sfDAO.getShareFolder() != null) {
			this.suDAO.setShareFolder(this.sfDAO.getShareFolder());
			this.suDAO.setFolder(this.folder);
			this.suDAO.setUser(this.user);
			this.suDAO.load();
		}
		System.out.println(this.suDAO.getSharedUserMap());
		//make users + permissions array
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
}
