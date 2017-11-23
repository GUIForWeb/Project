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

import system.daoInterfaces.GUISettingsInOSDAO;
import system.databases.SQLite;
import system.models.GUISettingsInOS;
import system.models.OS;

public class GUISettingsInOSDAOSQLite implements GUISettingsInOSDAO{
	final private String table0 = "guisettings_in_os_t";
	final private String expr0 = "id";
	final private String expr1 = "os_id";
	final private String expr2 = "guisetting_id";
	final private String expr3 = "selected";
	private SQLite db;
	private ResultSet rset;
	private GUISettingsInOS guiSettingsInOS;
	private OS os;
	
	
	public GUISettingsInOSDAOSQLite(){
		this.db = new SQLite();
		this.os = new OS();
		this.guiSettingsInOS = new GUISettingsInOS();
	}
	public GUISettingsInOSDAOSQLite(OS osSetting){
		this.db = new SQLite();
		this.os = osSetting;
		this.guiSettingsInOS = new GUISettingsInOS();
	}
	
	@Override
	public void load(){
		String query = "SELECT * FROM "+this.table0+" WHERE "+this.expr3+" = 1 AND "+this.expr1+" = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.os.getId());
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				this.guiSettingsInOS.setId(this.rset.getInt(this.expr0));
				this.guiSettingsInOS.setOSId(this.rset.getInt(this.expr1));
				this.guiSettingsInOS.setGUISettingId(this.rset.getInt(this.expr2));
				this.guiSettingsInOS.setSelected(this.rset.getBoolean(this.expr3));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public ResultSet getRset() {
		return rset;
	}
	public void setRset(ResultSet rset) {
		this.rset = rset;
	}
	@Override
	public void deleteAll(int osId) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr1+" = ?";
		this.db.executeUpdate(query,osId);
	}
	@Override
	public void setOs(OS os) {
		this.os = os;
	}
	@Override
	public GUISettingsInOS getGUISettingsInOS() {
		return guiSettingsInOS;
	}
}
