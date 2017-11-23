/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: User DAO for MySQL
****************************************************************************************************/
package system.daos.mysqls;

import java.sql.ResultSet;
import java.sql.SQLException;

import system.daoInterfaces.GUISettingsInOSDAO;
import system.databases.MySQL;
import system.models.GUISettingsInOS;
import system.models.OS;

public class GUISettingsInOSDAOMySQL implements GUISettingsInOSDAO{
	private MySQL db;
	private ResultSet rset;
	private GUISettingsInOS guiSettingsInOS;
	private OS os;
	
	public GUISettingsInOSDAOMySQL(){
		this.db = new MySQL();
		this.os = new OS();
		this.guiSettingsInOS = new GUISettingsInOS();
	}
	public GUISettingsInOSDAOMySQL(OS osSetting){
		this.db = new MySQL();
		this.os = osSetting;
		this.guiSettingsInOS = new GUISettingsInOS();
	}
	
	@Override
	public void load(){
		String query = "SELECT * FROM guisettings_in_os_t WHERE selected = 1 AND os_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.os.getId());
		this.db.connect();
		this.rset = this.db.select(query, info);
		try {
			while(this.rset.next()){
				this.guiSettingsInOS.setId(this.rset.getInt("id"));
				this.guiSettingsInOS.setOSId(this.rset.getInt("os_id"));
				this.guiSettingsInOS.setGUISettingId(this.rset.getInt("guisetting_id"));
				this.guiSettingsInOS.setSelected(this.rset.getBoolean("selected"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.db.close();
		System.out.println(this.guiSettingsInOS);
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
	public GUISettingsInOS getGUISettingsInOS() {
		return guiSettingsInOS;
	}
	public void setGUISettingsInOS(GUISettingsInOS guiSettingsInOS) {
		this.guiSettingsInOS = guiSettingsInOS;
	}
	@Override
	public void deleteAll(int osId) {
		String query = "DELETE FROM guisettings_in_os_t WHERE os_id = ?";
		this.db.connect();
		this.db.executeUpdate(query,osId);
		this.db.close();
	}
	@Override
	public void setOs(OS os) {
		this.os = os;
	}
}
