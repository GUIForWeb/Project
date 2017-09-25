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

import system.daoInterfaces.BgPathsDAO;
import system.databases.MySQL;
import system.models.BgPath;
import system.models.GUIsInOS;

public class BgPathsDAOMySQL implements BgPathsDAO{
	private MySQL db;
	private GUIsInOS guisInOS;
	private ResultSet rset;
	private BgPath bgPath;
	public BgPathsDAOMySQL(){
		this.db = new MySQL();
		this.guisInOS = new GUIsInOS();
		this.bgPath = new BgPath();
	}
	public BgPathsDAOMySQL(GUIsInOS guisInOS){
		this.db = new MySQL();
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
		String query = "call WebGUI.bg_path_p(?,?)";
		String[] info = new String[2];
		info[0] = String.valueOf(this.guisInOS.getGuiId());
		info[1] = this.bgPath.getBgPath();
		this.db.connect();
		this.db.call(query, info);
		this.db.close();
	}
	@Override
	public void load(){
		String query = "SELECT * from bg_paths_t WHERE gui_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.guisInOS.getGuiId());
		this.bgPath = new BgPath();
		this.db.connect();
		this.rset = this.db.select(query, info);
		try {
			while(this.rset.next()){
				this.bgPath.setId(this.rset.getInt("id"));
				this.bgPath.setGuiId(this.rset.getInt("gui_id"));
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
}
