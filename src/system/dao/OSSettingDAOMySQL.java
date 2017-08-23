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

import system.daoInterface.OSSettingDAO;
import system.database.MySQL;
import system.model.OSSetting;
import system.model.User;

public class OSSettingDAOMySQL implements OSSettingDAO{
	private MySQL db;
	private User user;
	private ResultSet rset;
	private OSSetting osSetting;
	
	public OSSettingDAOMySQL(){
		this.db = new MySQL();
		this.user = new User();
		this.osSetting = new OSSetting();
	}
	public OSSettingDAOMySQL(User user){
		this.db = new MySQL();
		this.user = user;
		this.osSetting = new OSSetting();
	}
	
	@Override
	public void load(){
		String query = "SELECT * FROM ossetting_t WHERE selected = 1 AND user_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.user.getId());
		this.db.connect();
		this.rset = this.db.select(query, info);
		try {
			while(this.rset.next()){
				this.osSetting.setId(this.rset.getInt("id"));
				this.osSetting.setUserId(this.rset.getInt("user_id"));
				this.osSetting.setSelected(this.rset.getBoolean("selected"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.db.close();
	}
	public OSSetting getOsSetting() {
		return osSetting;
	}
	public void setOsSetting(OSSetting osSetting) {
		this.osSetting = osSetting;
	}
	public MySQL getDb() {
		return db;
	}
	public void setDb(MySQL db) {
		this.db = db;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public ResultSet getRset() {
		return rset;
	}
	public void setRset(ResultSet rset) {
		this.rset = rset;
	}
}
