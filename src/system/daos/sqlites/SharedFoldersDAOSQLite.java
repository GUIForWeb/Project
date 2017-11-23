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
	final private String table0 = "shared_folders_t";
	final private String expr0 = "id";
	final private String expr1 = "user_id";
	final private String expr2 = "folder";
	
	private SQLite db;
	private User user;
	private String folder;
	private ResultSet rset;
	private SharedFolder sharedFolder;
	public SharedFoldersDAOSQLite(){
		this.db = new SQLite();
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
	public void load() {
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
	@Override
	public void deleteAll(int userId) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr1+" = ?";
		this.db.executeUpdate(query,userId);
	}
}
