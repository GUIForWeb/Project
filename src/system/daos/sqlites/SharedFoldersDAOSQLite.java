package system.daos.sqlites;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import system.daoInterfaces.SharedFoldersDAO;
import system.databases.SQLite;
import system.models.SharedFolder;
import system.models.User;

public class SharedFoldersDAOSQLite  implements SharedFoldersDAO{
	final private String table0 = "shared_folders_t";
	final private String expr0 = "id";
	final private String expr1 = "user_id";
	final private String expr2 = "folder";
	
	private SQLite db;
	private User user;
	private String folder;
	private ResultSet rset;
	private SharedFolder sharedFolder;
	private Map<Integer,SharedFolder> sharedFolderMap;
	public SharedFoldersDAOSQLite(){
		this.db = new SQLite();
	}
	@Override
	public void selectFolders(String ids){
		this.sharedFolderMap = new HashMap<Integer,SharedFolder>();
		String query = "SELECT * FROM "+this.table0+" WHERE id IN ("+ids+")";
		this.sharedFolder = null;
		try {
			this.rset = this.db.executeQuery(query);
			while(this.rset.next()){
				this.sharedFolder = new SharedFolder();
				this.sharedFolder.setId(this.rset.getInt(this.expr0));
				this.sharedFolder.setUserId(this.rset.getInt(this.expr1));
				this.sharedFolder.setFolder(this.rset.getString(this.expr2));
				this.sharedFolderMap.put(this.sharedFolder.getId(), this.sharedFolder);
		 	}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	@Override
	public void newSharedFolder() {
		String query = "INSERT INTO "+this.table0+" ("+this.expr1+", "+this.expr2+") VALUES (?,?)";
		String[] info = new String[2];
		info[0] = String.valueOf(this.user.getId());
		info[1] = this.folder;
		this.db.executeUpdate(query,info);
	}
	@Override
	public void loadUsersForFolder() {
		String query = "SELECT * FROM "+this.table0+" WHERE "+this.expr1+" = ? AND "+this.expr2+" = ?";
		String[] info = new String[2];
		info[0] = String.valueOf(this.user.getId());
		info[1] = this.folder;
		this.sharedFolder = null;
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				this.sharedFolder = new SharedFolder();
				this.sharedFolder.setId(this.rset.getInt(this.expr0));
				this.sharedFolder.setUserId(this.rset.getInt(this.expr1));
				this.sharedFolder.setFolder(this.rset.getString(this.expr2));
		 	}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	@Override
	public void setUser(User user) {
		this.user = user;
	}
	@Override
	public void setFolder(String folder) {
		this.folder = folder;
	}
	@Override
	public SharedFolder getShareFolder() {
		return sharedFolder;
	}
	@Override
	public void deleteAll(int userId) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr1+" = ?";
		this.db.executeUpdate(query,userId);
	}
	@Override
	public Map<Integer, SharedFolder> getSharedFolderMap() {
		return sharedFolderMap;
	}
}
