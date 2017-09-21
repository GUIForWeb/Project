/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: User DAO for MySQL
****************************************************************************************************/
package system.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;

import system.authentication.Authentication;
import system.authentication.DbAuth;
import system.authentication.Parameter;
import system.daoInterface.UsersDAO;
import system.database.MySQL;
import system.helper.Encryption;
import system.model.User;

public class UsersDAOMySQL implements UsersDAO{
	private MySQL db;
	private User user;
	private ResultSet rset;
	private Parameter pMap;
	private HttpSession session;
	private Authentication authentication;
	public UsersDAOMySQL(){
		this.db = new MySQL();
		this.user = new User();
		ExternalContext externalContext = FacesContext.getCurrentInstance().getExternalContext();
		this.session = (HttpSession) externalContext.getSession(false);
	}
	public void delete(int id) {
		String query = "DELETE FROM users_t WHERE id = ?;";
		this.db.connect();
		this.db.executeUpdate(query,id);
		this.db.close();
	}
	public void activate(int id) {
		String query = "UPDATE users_t SET activation = 1 WHERE id = ?";
		this.db.connect();
		this.db.executeUpdate(query,id);
		this.db.close();
	}
	public void deactivate(int id) {
		String query = "UPDATE users_t SET activation = 0 WHERE id = ?";
		this.db.connect();
		this.db.executeUpdate(query,id);
		this.db.close();
	}
	public UsersDAOMySQL(User user){
		this.db = new MySQL();
		this.user = user;
	}
	public User selectUser(int id) {
		String query = "SELECT * FROM users_v WHERE id = ?";
		this.db.connect();
		this.rset = this.db.select(query,new String[] {String.valueOf(id)});
		User tmpUser = new User();
		try {
			this.rset.first();
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
	public User[] selectAll() {
		String query = "SELECT * FROM users_v";
		this.db.connect();
		this.rset = this.db.select(query);
		User userArray[] = new User[1];
		try {
			this.rset.last();
			userArray = new User[this.rset.getRow()];
			this.rset.first();
			int idx = 0;
			do {
				userArray[idx] = new User();
				userArray[idx].setId(this.rset.getInt("id"));
				userArray[idx].setEmail(this.rset.getString("email"));
				userArray[idx].setNickname(this.rset.getString("nickname"));
				userArray[idx].setRole(this.rset.getString("role"));
				userArray[idx].setActivation(this.rset.getBoolean("activation"));
				idx++;
			}while(this.rset.next());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.db.close();
		return userArray;
	}
	@Override
	public DbAuth login() {
		DbAuth dbAuth = new DbAuth(this.authentication);
		this.user = new User();
		this.user.setEmail(this.pMap.get("email"));
		this.user.setPassword(this.pMap.get("password"));
		String query = "call login(?,?)";
		String[] info = new String[2];
		info[0] = this.user.getEmail();
		info[1] = Encryption.encrypt(this.user.getPassword());
		this.db.connect();
		this.rset = this.db.call(query, info);
		try {
			while(this.rset.next()){
				int id = this.rset.getInt(1);
				dbAuth.addErrorCode(id, false);
				if(id > 0) {
					this.user.setId(id);
					this.user.setEmail(this.rset.getString("email"));
					this.user.setPassword(this.rset.getString("password"));
					this.user.setRole(this.rset.getString("role"));
					if(this.rset.getInt("activation") == 1)
						this.user.setActivation(true);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.db.close();
		if(!dbAuth.isError())
			this.session.setAttribute("User", this.user);
		return dbAuth;
	}
	public void newUser(int id) {
		String query = "call newUser(?)";
		this.db.connect();
		String info[] = new String[1];
		info[0] = String.valueOf(id);
		this.rset = this.db.call(query,info);
		this.db.close();
	}
	@Override
	public DbAuth register() {
		DbAuth dbAuth = new DbAuth(this.authentication);
		String query = "call register(?,?,?)";
		this.user = new User();
		this.user.setEmail(this.pMap.get("email"));
		this.user.setPassword(this.pMap.get("password"));
		this.user.setNickname(this.pMap.get("nickname"));
		String[] info = new String[3];
		info[0] = this.user.getEmail();
		info[1] = this.user.getNickname().toLowerCase();
		info[2] = Encryption.encrypt(this.user.getPassword());
		
		this.db.connect();
		this.rset = this.db.call(query, info);
		try {
			while(this.rset.next()){
				String result = this.rset.getString(1);
				String[] errorCode = result.split(",");
				for(String error : errorCode)
					dbAuth.addErrorCode(Integer.valueOf(error), true);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.db.close();
		return dbAuth;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Authentication getAuthentication() {
		return authentication;
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
