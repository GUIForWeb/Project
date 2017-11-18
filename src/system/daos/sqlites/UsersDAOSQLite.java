package system.daos.sqlites;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;

import system.authentications.Authentication;
import system.authentications.DbAuth;
import system.authentications.Parameter;
import system.daoInterfaces.UsersDAO;
import system.databases.SQLite;
import system.helpers.Encryption;
import system.models.User;

public class UsersDAOSQLite  implements UsersDAO{
	private SQLite db;
	private User user;
	private ResultSet rset;
	private Parameter pMap;
	private HttpSession session;
	private Authentication authentication;
	public UsersDAOSQLite(){
		this.db = new SQLite();
		ExternalContext externalContext = FacesContext.getCurrentInstance().getExternalContext();
		this.session = (HttpSession) externalContext.getSession(false);
	}
	@Override
	public DbAuth login() {
		DbAuth dbAuth = new DbAuth(this.authentication);
		User inputUser = new User();
		this.user = new User();
		inputUser.setEmail(this.pMap.get("email"));
		inputUser.setPassword(this.pMap.get("password"));
		String query = "SELECT * FROM users_v WHERE email = ?";
		String[] info = new String[1];
		info[0] = inputUser.getEmail();
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				this.user.setId(this.rset.getInt("id"));
				this.user.setEmail(this.rset.getString("email"));
				this.user.setPassword(this.rset.getString("password"));
				this.user.setRole(this.rset.getString("role"));
				if(this.rset.getInt("activation") == 1)
					this.user.setActivation(true);
		 	}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		String inputPw = Encryption.encrypt(inputUser.getPassword());
		if(null == this.user.getEmail()) {
			dbAuth.addErrorCode(-2, "exist");
		}
		else if(!this.user.getPassword().equals(inputPw)){
			dbAuth.addErrorCode(-3, "equal");
		}
		if(!dbAuth.isError())
			this.session.setAttribute("User", this.user);
		return dbAuth;
	}
	@Override
	public DbAuth changePassword() {
		DbAuth dbAuth = new DbAuth(this.authentication);
		this.user = (User) this.session.getAttribute("User");
		if(!Encryption.encrypt(this.pMap.get("currentPassword")).equals(this.user.getPassword()))
			dbAuth.addErrorCode(-4, "equal");
		if(!dbAuth.isError()) {
			String query = "UPDATE users_t SET password = ? WHERE id = ?";
			String[] info = new String[2];
			info[0] = Encryption.encrypt(this.pMap.get("password"));
			info[1] = String.valueOf(this.user.getId());
			this.db.executeUpdate(query,info);
		}
		return dbAuth;
	}
	@Override
	public DbAuth register() {
		String tmpNName = "";
		String tmpEmail = "";
		String[] info0 = new String[1];
		String[] info1 = new String[1];
		DbAuth dbAuth = new DbAuth(this.authentication);
		
		String query0 = "SELECT nickname FROM users_t WHERE nickname = ?";
		String query1 = "SELECT email FROM users_t WHERE email = ?";
		info0[0] = this.pMap.get("nickname");
		info1[0] = this.pMap.get("email");
		try {
			ResultSet rset0 = this.db.executeQuery(query0,info0);
			ResultSet rset1 = this.db.executeQuery(query1,info1);
			while(rset0.next()){
				tmpNName = rset0.getString("nickname");
			}
			while(rset1.next()){
				tmpEmail = rset1.getString("email");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if(tmpNName.equals("") && tmpEmail.equals("")) {
			query0 = "INSERT INTO users_t (email, password, nickname) VALUES (?,?,?)";
			info0 = new String[3];
			info0[0] = this.pMap.get("email");
			info0[1] = Encryption.encrypt(this.pMap.get("password"));
			info0[2] = this.pMap.get("nickname");
			this.db.executeUpdate(query0,info0);
		}
		else {
			if(!tmpNName.equals("")) {
				dbAuth.addErrorCode(-1, "overlap");
			}
			if(!tmpEmail.equals("")) {
				dbAuth.addErrorCode(-2, "overlap");
			}
		}
		return dbAuth;
	}
	
	@Override
	public void newUser(int id, long lastModified) {
		// TODO Auto-generated method stub
		int tmpGId = 0;
		int tmpOId = 0;
		String query0 = "SELECT MAX(id) FROM guisettings_t";
		String query1 = "INSERT INTO guisettings_t (id) VALUES (?)";
		String query2 = "INSERT INTO oss_t (user_id, selected,last_modified_desktop) VALUES (?, 1,?)";
		String query3 = "SELECT MAX(id) FROM oss_t";
		String query4 = "INSERT INTO guisettings_in_os_t (os_id, guisetting_id, selected) VALUES (?, ?, 1)";
		String query5 = "INSERT INTO icons_in_os_t (os_id,icon_id, x, y) VALUES (?, 1, 0, 0)";
		String query6 = "INSERT INTO icons_in_os_t (os_id,icon_id, x, y) VALUES (?, 3, 0, 1);";
		try {
			ResultSet rset0 = this.db.executeQuery(query0);
			while(rset0.next()){
				tmpGId = rset0.getInt("MAX(id)");
			}
			tmpGId++;
			long[] info = new long[1];
			info[0] = tmpGId;
			this.db.executeUpdate(query1,info);
			info = new long[2];
			info[0] = id;
			info[1] = lastModified;
			this.db.executeUpdate(query2,info);
			rset0 = this.db.executeQuery(query3);
			while(rset0.next()){
				tmpOId = rset0.getInt("MAX(id)");
			}
			info[0] = tmpOId;
			info[1] = tmpGId;
			this.db.executeUpdate(query4,info);
			info = new long[1];
			info[0] = tmpOId;
			this.db.executeUpdate(query5,info);
			this.db.executeUpdate(query6,info);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public User[] selectAll() {
		int cnt = 0;
		String query0 = "SELECT COUNT(*) FROM users_v";
		String query1 = "SELECT * FROM users_v";
		User userArray[] = new User[1];
		try {
			this.rset = this.db.executeQuery(query0);
			while(this.rset.next()){
				cnt = this.rset.getInt("COUNT(*)");
			}
			userArray = new User[cnt-1];
			this.rset = this.db.executeQuery(query1);
			int idx = 0;
			while(this.rset.next()){
				if(!this.rset.getString("email").equals("admin")) {
					userArray[idx] = new User();
					userArray[idx].setId(this.rset.getInt("id"));
					userArray[idx].setEmail(this.rset.getString("email"));
					userArray[idx].setNickname(this.rset.getString("nickname"));
					userArray[idx].setRole(this.rset.getString("role"));
					userArray[idx].setActivation(this.rset.getBoolean("activation"));
					idx++;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return userArray;
	}
	
	@Override
	public User selectUser(int id) {
		String query = "SELECT * FROM users_v WHERE id = ?";
		User tmpUser = new User();
		try {
			this.rset = this.db.executeQuery(query,new int[] {id});
			this.rset.next();
			tmpUser.setId(this.rset.getInt("id"));
			tmpUser.setEmail(this.rset.getString("email"));
			tmpUser.setNickname(this.rset.getString("nickname"));
			tmpUser.setRole(this.rset.getString("role"));
			tmpUser.setActivation(this.rset.getBoolean("activation"));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return tmpUser;
	}
	
	@Override
	public void delete(int id) {
		String query = "DELETE FROM users_t WHERE id = ?;";
		this.db.executeUpdate(query,id);
	}
	
	@Override
	public void activate(int id) {
		String query = "UPDATE users_t SET activation = 1 WHERE id = ?";
		this.db.executeUpdate(query,id);
	}
	
	@Override
	public void deactivate(int id) {
		String query = "UPDATE users_t SET activation = 0 WHERE id = ?";
		this.db.executeUpdate(query,id);
	}
	
	@Override
	public void setPMap(Parameter pMap) {
		this.pMap = pMap;
	}
	
	@Override
	public void setAuthentication(Authentication authentication) {
		this.authentication = authentication;
	}
}
