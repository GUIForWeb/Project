/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: User DAO for MySQL
****************************************************************************************************/
package system.daos;

import java.sql.ResultSet;
import java.sql.SQLException;

import system.daoInterfaces.GUIsInOSDAO;
import system.databases.MySQL;
import system.models.GUIsInOS;
import system.models.OSSetting;

public class GUIsInOSDAOMySQL implements GUIsInOSDAO{
	private MySQL db;
	private ResultSet rset;
	private GUIsInOS guisInOs;
	private OSSetting osSetting;
	
	public GUIsInOSDAOMySQL(){
		this.db = new MySQL();
		this.osSetting = new OSSetting();
		this.guisInOs = new GUIsInOS();
	}
	public GUIsInOSDAOMySQL(OSSetting osSetting){
		this.db = new MySQL();
		this.osSetting = osSetting;
		this.guisInOs = new GUIsInOS();
	}
	
	@Override
	public void load(){
		String query = "SELECT * FROM guisinos_t WHERE selected = 1 AND os_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.osSetting.getId());
		this.db.connect();
		this.rset = this.db.select(query, info);
		try {
			while(this.rset.next()){
				this.guisInOs.setId(this.rset.getInt("id"));
				this.guisInOs.setOSId(this.rset.getInt("os_id"));
				this.guisInOs.setGuiId(this.rset.getInt("gui_id"));
				this.guisInOs.setSelected(this.rset.getBoolean("selected"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.db.close();
	}
	public MySQL getDb() {
		return db;
	}
	public void setDb(MySQL db) {
		this.db = db;
	}
	public ResultSet getRset() {
		return rset;
	}
	public void setRset(ResultSet rset) {
		this.rset = rset;
	}
	public GUIsInOS getGUIsInOS() {
		return guisInOs;
	}
	public void setGUIsInOS(GUIsInOS guisInOs) {
		this.guisInOs = guisInOs;
	}
}
