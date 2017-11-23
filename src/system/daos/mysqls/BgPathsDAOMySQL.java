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

import system.daoInterfaces.BgPathsDAO;
import system.databases.MySQL;
import system.models.BgPath;
import system.models.GUISettingsInOS;

public class BgPathsDAOMySQL implements BgPathsDAO{
	private MySQL db;
	private GUISettingsInOS guisInOS;
	private ResultSet rset;
	private BgPath bgPath;
	public BgPathsDAOMySQL(){
		this.db = new MySQL();
		this.guisInOS = new GUISettingsInOS();
		this.bgPath = new BgPath();
	}
	public BgPathsDAOMySQL(GUISettingsInOS guisInOS){
		this.db = new MySQL();
		this.guisInOS = guisInOS;
		this.bgPath = new BgPath();
	}
	public void setGUIId(int guiId) {
		this.guisInOS.setGUISettingId(guiId);
	}
	public void setBgPath(String bgPath) {
		this.bgPath.setBgPath(bgPath);
	}
	@Override
	public void update() {
		String query = "call WebGUI.bg_path_p(?,?)";
		String[] info = new String[2];
		info[0] = String.valueOf(this.guisInOS.getGUISettingId());
		info[1] = this.bgPath.getBgPath();
		this.db.connect();
		this.db.call(query, info);
		this.db.close();
	}
	@Override
	public void load(){
		String query = "SELECT * from bg_paths_t WHERE gui_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.guisInOS.getGUISettingId());
		this.bgPath = new BgPath();
		this.db.connect();
		this.rset = this.db.select(query, info);
		try {
			while(this.rset.next()){
				this.bgPath.setId(this.rset.getInt("id"));
				this.bgPath.setGUISettingId(this.rset.getInt("guisetting_id"));
				this.bgPath.setBgPath(this.rset.getString("bg_path"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.db.close();
	}
	
	public BgPath getBgPath() {
		return bgPath;
	}
	public void setBgPath(BgPath bgPath) {
		this.bgPath = bgPath;
	}
	@Override
	public void deleteAll(int guisettingId) {
		
	}
	@Override
	public void setGUISettingId(int guiId) {
		// TODO Auto-generated method stub
		
	}
}
