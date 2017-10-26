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
import system.models.GUIsInOS;

public class BgPathsDAOSQLite implements BgPathsDAO{
	private SQLite db;
	private GUIsInOS guisInOS;
	private ResultSet rset;
	private BgPath bgPath;
	public BgPathsDAOSQLite(){
		this.db = new SQLite();
		this.guisInOS = new GUIsInOS();
		this.bgPath = new BgPath();
	}
	public BgPathsDAOSQLite(GUIsInOS guisInOS){
		this.db = new SQLite();
		this.guisInOS = guisInOS;
		this.bgPath = new BgPath();
	}
	public void setGUIId(int guiId) {
		this.guisInOS.setGuiId(guiId);
	}
	public void setBgPath(String bgPath) {
		this.bgPath.setBgPath(bgPath);
	}
	@Override
	public void update() {
		int tmpGId = 0;
		String query = "SELECT id FROM bg_paths_t WHERE gui_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.guisInOS.getGuiId());
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				tmpGId = this.rset.getInt("id");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		info = new String[2];
		if(tmpGId == 0) {
			query = "INSERT INTO bg_paths_t (bg_path, gui_id) VALUES (?, ?)";
			
		}
		else {
			query = "UPDATE bg_paths_t SET bg_path = ? WHERE gui_id = ?";
		}
		info[0] = this.bgPath.getBgPath();
		info[1] = String.valueOf(this.guisInOS.getGuiId());
		this.db.executeUpdate(query, info);
	}
	@Override
	public void load(){
		String query = "SELECT * from bg_paths_t WHERE gui_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.guisInOS.getGuiId());
		this.bgPath = new BgPath();
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				this.bgPath.setId(this.rset.getInt("id"));
				this.bgPath.setGuiId(this.rset.getInt("gui_id"));
				this.bgPath.setBgPath(this.rset.getString("bg_path"));
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
}
