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
	final private String table0 = "users_t";
	final private String view0 = "users_v";
	final private String expr0 = "id";
	final private String expr1 = "email";
	final private String expr2 = "nickname";
	final private String expr3 = "password";
	final private String expr4 = "role";
	final private String expr5 = "activation";
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
		inputUser.setEmail(this.pMap.get(this.expr1));
		inputUser.setPassword(this.pMap.get(this.expr3));
		String query = "SELECT * FROM "+this.view0+" WHERE "+this.expr1+" = ?";
		String[] info = new String[1];
		info[0] = inputUser.getEmail();
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				this.user.setId(this.rset.getInt(this.expr0));
				this.user.setEmail(this.rset.getString(this.expr1));
				this.user.setPassword(this.rset.getString(this.expr3));
				this.user.setRole(this.rset.getString(this.expr4));
				if(this.rset.getInt(this.expr5) == 1)
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
			String query = "UPDATE "+this.table0+" SET "+this.expr3+" = ? WHERE "+this.expr0+" = ?";
			String[] info = new String[2];
			info[0] = Encryption.encrypt(this.pMap.get(this.expr3));
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
		
		String query0 = "SELECT "+this.expr2+" FROM "+this.table0+" WHERE "+this.expr2+" = ?";
		String query1 = "SELECT "+this.expr1+" FROM "+this.table0+" WHERE "+this.expr1+" = ?";
		info0[0] = this.pMap.get(this.expr2);
		info1[0] = this.pMap.get(this.expr1);
		try {
			ResultSet rset0 = this.db.executeQuery(query0,info0);
			ResultSet rset1 = this.db.executeQuery(query1,info1);
			while(rset0.next()){
				tmpNName = rset0.getString(this.expr2);
			}
			while(rset1.next()){
				tmpEmail = rset1.getString(this.expr1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if(tmpNName.equals("") && tmpEmail.equals("")) {
			query0 = "INSERT INTO "+this.table0+" ("+this.expr1+", "+this.expr3+", "+this.expr2+") VALUES (?,?,?)";
			info0 = new String[3];
			info0[0] = this.pMap.get(this.expr1);
			info0[1] = Encryption.encrypt(this.pMap.get(this.expr3));
			info0[2] = this.pMap.get(this.expr2);
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
		int tmpGId = 0;
		int tmpOId = 0;
		String query0 = "SELECT MAX(id) FROM guisettings_t";
		String query1 = "INSERT INTO guisettings_t (id) VALUES (?)";
		String query2 = "INSERT INTO oss_t (user_id, selected,last_modified_desktop) VALUES (?, 1,?)";
		String query3 = "SELECT MAX(id) FROM oss_t";
		String query4 = "INSERT INTO guisettings_in_os_t (os_id, guisetting_id, selected) VALUES (?, ?, 1)";
		String query5 = "INSERT INTO icons_in_os_t (os_id,icon_id, x, y) VALUES (?, 1, 0, 0)";
		String query6 = "INSERT INTO icons_in_os_t (os_id,icon_id, x, y) VALUES (?, 2, 0, 0)";
		String query7 = "INSERT INTO icons_in_os_t (os_id,icon_id, x, y) VALUES (?, 4, 0, 2);";
		try {
			ResultSet rset0 = this.db.executeQuery(query0);
			while(rset0.next())
				tmpGId = rset0.getInt("MAX(id)");
			tmpGId++;
			long[] info = new long[1];
			info[0] = tmpGId;
			this.db.executeUpdate(query1,info);
			info = new long[2];
			info[0] = id;
			info[1] = lastModified;
			this.db.executeUpdate(query2,info);
			rset0 = this.db.executeQuery(query3);
			while(rset0.next())
				tmpOId = rset0.getInt("MAX(id)");
			info[0] = tmpOId;
			info[1] = tmpGId;
			this.db.executeUpdate(query4,info);
			info = new long[1];
			info[0] = tmpOId;
			this.db.executeUpdate(query5,info);
			this.db.executeUpdate(query6,info);
			this.db.executeUpdate(query7,info);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public User[] selectAll() {
		int cnt = 0;
		String query0 = "SELECT COUNT(*) FROM "+this.view0;
		String query1 = "SELECT * FROM "+this.view0;
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
				if(!this.rset.getString(this.expr1).equals("admin")) {
					userArray[idx] = new User();
					userArray[idx].setId(this.rset.getInt(this.expr0));
					userArray[idx].setEmail(this.rset.getString(this.expr1));
					userArray[idx].setNickname(this.rset.getString(this.expr2));
					userArray[idx].setRole(this.rset.getString(this.expr4));
					userArray[idx].setActivation(this.rset.getBoolean(this.expr5));
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
		String query = "SELECT * FROM "+this.view0+" WHERE "+this.expr0+" = ?";
		User tmpUser = new User();
		try {
			this.rset = this.db.executeQuery(query,new int[] {id});
			this.rset.next();
			tmpUser.setId(this.rset.getInt(this.expr0));
			tmpUser.setEmail(this.rset.getString(this.expr1));
			tmpUser.setNickname(this.rset.getString(this.expr2));
			tmpUser.setRole(this.rset.getString(this.expr4));
			tmpUser.setActivation(this.rset.getBoolean(this.expr5));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return tmpUser;
	}
	@Override
	public User[] selectUsers(String ids) {
		String query = "SELECT COUNT(*) FROM "+this.view0+" WHERE "+this.expr0+" IN ("+ids+")";
		int cnt = 0;
		try {
			this.rset = this.db.executeQuery(query);
			this.rset.next();
			cnt = this.rset.getInt("COUNT(*)");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		query = "SELECT * FROM "+this.view0+" WHERE "+this.expr0+" IN ("+ids+")";
		User[] tmpUsers = new User[cnt];
		cnt = 0;
		try {
			this.rset = this.db.executeQuery(query);
			while(this.rset.next()) {
				tmpUsers[cnt] = new User();
				tmpUsers[cnt].setId(this.rset.getInt(this.expr0));
				tmpUsers[cnt].setEmail(this.rset.getString(this.expr1));
				tmpUsers[cnt].setNickname(this.rset.getString(this.expr2));
				tmpUsers[cnt].setRole(this.rset.getString(this.expr4));
				tmpUsers[cnt].setActivation(this.rset.getBoolean(this.expr5));
				cnt++;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return tmpUsers;
	}
	@Override
	public void delete(int id) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		this.db.executeUpdate(query,id);
	}
	
	@Override
	public void activate(int id) {
		String query = "UPDATE "+this.table0+" SET "+this.expr5+" = 1 WHERE "+this.expr0+" = ?";
		this.db.executeUpdate(query,id);
	}
	
	@Override
	public void deactivate(int id) {
		String query = "UPDATE "+this.table0+" SET "+this.expr5+" = 0 WHERE "+this.expr0+" = ?";
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
