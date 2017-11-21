package system.daos.sqlites;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;

import system.authentications.Authentication;
import system.authentications.DbAuth;
import system.authentications.Parameter;
import system.daoInterfaces.SharedFoldersDAO;
import system.daoInterfaces.SharedUsersDAO;
import system.daoInterfaces.UsersDAO;
import system.databases.SQLite;
import system.helpers.Encryption;
import system.models.SharedFolder;
import system.models.User;

public class SharedFoldersDAOSQLite  implements SharedFoldersDAO{
	private SQLite db;
	private User user;
	private String folder;
	private String permissions;
	private ResultSet rset;
	private HttpSession session;
	private SharedFolder sharedFolder;
	public SharedFoldersDAOSQLite(){
		this.db = new SQLite();
		ExternalContext externalContext = FacesContext.getCurrentInstance().getExternalContext();
	}
	@Override
	public void newSharedFolder() {
		String query = "INSERT INTO shared_folders_t (user_id, folder) VALUES (?,?)";
		String[] info = new String[2];
		info[0] = String.valueOf(this.user.getId());
		info[1] = this.folder;
		this.db.executeUpdate(query,info);
	}
	@Override
	public void load() {
		String query = "SELECT * FROM shared_folders_t WHERE user_id = ? AND folder = ?";
		String[] info = new String[2];
		info[0] = String.valueOf(this.user.getId());
		info[1] = this.folder;
		this.sharedFolder = null;
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				this.sharedFolder = new SharedFolder();
				this.sharedFolder.setId(this.rset.getInt("id"));
				this.sharedFolder.setUserId(this.rset.getInt("user_id"));
				this.sharedFolder.setFolder(this.rset.getString("folder"));
		 	}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
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
}
