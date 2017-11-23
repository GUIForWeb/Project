package system.daos.sqlites;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import system.daoInterfaces.SharedUsersDAO;
import system.databases.SQLite;
import system.models.SharedFolder;
import system.models.SharedUser;
import system.models.User;

public class SharedUsersDAOSQLite  implements SharedUsersDAO{
	final private String table0 = "shared_users_t";
	final private String expr0 = "id";
	final private String expr1 = "user_id";
	final private String expr2 = "permissions";
	final private String expr3 = "shared_folder_id";
	
	private SQLite db;
	private User user;
	private ResultSet rset;
	private String permissions;
	private SharedFolder sharedFolder;
	private Map<Integer,SharedUser> sharedUserMap;
	public SharedUsersDAOSQLite(){
		this.db = new SQLite();
	}
	@Override
	public void update(int userId) {
		SharedUser sharedUser = this.sharedUserMap.get(userId);
		String query = "UPDATE "+this.table0+" SET "+this.expr2+" = ? WHERE "+this.expr0+" = ?";
		String[] info = new String[2];
		info[0] = this.permissions;
		info[1] = String.valueOf(sharedUser.getId());
		this.db.executeUpdate(query,info);
	}
	@Override
	public void delete(int sharedFolderId) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr0+" = ?;";
		this.db.executeUpdate(query,sharedFolderId);
	}
	@Override
	public void insert(){
		String query = "INSERT INTO "+this.table0+" ("+this.expr1+", "+this.expr3+", "+this.expr2+") VALUES (?,?,?)";
		String[] info = new String[3];
		info[0] = String.valueOf(this.user.getId());
		info[1] = String.valueOf(this.sharedFolder.getId());
		info[2] = this.permissions;
		this.db.executeUpdate(query,info);
	}
	@Override
	public void load() {
		SharedUser tmpSharedUser;
		this.sharedUserMap = new HashMap<Integer,SharedUser>();
		String query = "SELECT * FROM "+this.table0+" WHERE "+this.expr3+" = ?";
		int[] info = new int[1];
		info[0] = this.sharedFolder.getId();
		try {
			this.rset = this.db.executeQuery(query,info);
			while(this.rset.next()) {
				tmpSharedUser = new SharedUser();
				tmpSharedUser.setId(this.rset.getInt(this.expr0));
				tmpSharedUser.setUserId(this.rset.getInt(this.expr1));
				tmpSharedUser.setSharedFolderId(this.rset.getInt(this.expr3));
				tmpSharedUser.setPermissions(this.rset.getString(this.expr2));
				this.sharedUserMap.put(tmpSharedUser.getUserId(), tmpSharedUser);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Override
	public void setShareFolder(SharedFolder sharedFolder) {
		this.sharedFolder = sharedFolder;
	}
	@Override
	public void setUser(User user) {
		this.user = user;
	}
	@Override
	public void setPermissions(String permissions) {
		this.permissions = permissions;
		
	}
	@Override
	public String getPermissions() {
		return permissions;
	}
	@Override
	public Map<Integer, SharedUser> getSharedUserMap() {
		return sharedUserMap;
	}
	@Override
	public void deleteAll(int userId) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr1+" = ?";
		this.db.executeUpdate(query,userId);
	}
}

