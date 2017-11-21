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
		String query = "UPDATE shared_users_t SET permissions = ? WHERE id = ?";
		String[] info = new String[2];
		info[0] = this.permissions;
		info[1] = String.valueOf(sharedUser.getId());
		this.db.executeUpdate(query,info);
	}
	@Override
	public void delete(int sharedFolderId) {
		String query = "DELETE FROM shared_users_t WHERE id = ?;";
		this.db.executeUpdate(query,sharedFolderId);
	}
	@Override
	public void insert(){
		String query = "INSERT INTO shared_users_t (user_id, shared_folder_id, permissions) VALUES (?,?,?)";
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
		String query = "SELECT * FROM shared_users_t WHERE shared_folder_id = ?";
		int[] info = new int[1];
		info[0] = this.sharedFolder.getId();
		try {
			this.rset = this.db.executeQuery(query,info);
			while(this.rset.next()) {
				tmpSharedUser = new SharedUser();
				tmpSharedUser.setId(this.rset.getInt("id"));
				tmpSharedUser.setUserId(this.rset.getInt("user_id"));
				tmpSharedUser.setSharedFolderId(this.rset.getInt("shared_folder_id"));
				tmpSharedUser.setPermissions(this.rset.getString("permissions"));
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
}
