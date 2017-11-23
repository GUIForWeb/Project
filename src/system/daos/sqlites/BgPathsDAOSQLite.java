/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: User DAO for MySQL
****************************************************************************************************/
package system.daos.sqlites;

import java.sql.ResultSet;
import java.sql.SQLException;

import system.daoInterfaces.BgPathsDAO;
import system.databases.SQLite;
import system.models.BgPath;
import system.models.GUISettingsInOS;

public class BgPathsDAOSQLite implements BgPathsDAO{
	final private String table0 = "bg_paths_t";
	final private String expr0 = "guisetting_id";
	final private String expr1 = "bg_path";
	final private String expr2 = "id";
	private SQLite db;
	private GUISettingsInOS guisInOS;
	private ResultSet rset;
	private BgPath bgPath;
	public BgPathsDAOSQLite(){
		this.db = new SQLite();
		this.guisInOS = new GUISettingsInOS();
		this.bgPath = new BgPath();
	}
	public BgPathsDAOSQLite(GUISettingsInOS guisInOS){
		this.db = new SQLite();
		this.guisInOS = guisInOS;
		this.bgPath = new BgPath();
	}
	public void setGUISettingId(int guiSettingId) {
		this.guisInOS.setGUISettingId(guiSettingId);
	}
	public void setBgPath(String bgPath) {
		this.bgPath.setBgPath(bgPath);
	}
	@Override
	public void update() {
		int tmpGId = 0;
		String query = "SELECT "+this.expr2+" FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.guisInOS.getGUISettingId());
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				tmpGId = this.rset.getInt(this.expr2);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		info = new String[2];
		if(tmpGId == 0) {
			query = "INSERT INTO "+this.table0+" ("+this.expr1+", "+this.expr0+") VALUES (?, ?)";
			
		}
		else {
			query = "UPDATE "+this.table0+" SET "+this.expr1+" = ? WHERE "+this.expr0+" = ?";
		}
		info[0] = this.bgPath.getBgPath();
		info[1] = String.valueOf(this.guisInOS.getGUISettingId());
		this.db.executeUpdate(query, info);
	}
	@Override
	public void load(){
		String query = "SELECT * from "+this.table0+" WHERE "+this.expr0+" = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.guisInOS.getGUISettingId());
		this.bgPath = new BgPath();
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				this.bgPath.setId(this.rset.getInt(this.expr2));
				this.bgPath.setGUISettingId(this.rset.getInt(this.expr0));
				this.bgPath.setBgPath(this.rset.getString(this.expr1));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public BgPath getBgPath() {
		return bgPath;
	}
	public void setBgPath(BgPath bgPath) {
		this.bgPath = bgPath;
	}
	@Override
	public void deleteAll(int guisettingId) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		this.db.executeUpdate(query,guisettingId);
	}
}
