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
import java.util.ArrayList;
import java.util.List;

import system.daoInterface.IconsInOSDAO;
import system.database.MySQL;
import system.model.IconInOS;
import system.model.OS;

public class IconsInOSDAOMySQL implements IconsInOSDAO{
	private MySQL db;
	private OS os;
	private ResultSet rset;
	private List<IconInOS> iconsInOSList;
	
	
	public IconsInOSDAOMySQL(){
		this.db = new MySQL();
		this.os = new OS();
	}
	public IconsInOSDAOMySQL(OS os){
		this.db = new MySQL();
		this.os = os;
	}
	@Override
	public void updateXY(IconInOS iconInOS){
		String query = "UPDATE icons_in_os_t SET iconX=?, iconY=? WHERE os_id = ? AND icon_id = ?";
		String[] info = new String[4];
		info[0] = String.valueOf(iconInOS.getX());
		info[1] = String.valueOf(iconInOS.getY());
		info[2] = String.valueOf(iconInOS.getOSId());
		info[3] = String.valueOf(iconInOS.getId());
		this.db.connect();
		this.db.update(query,info);
		this.db.close();
	}
	@Override
	public void load(){
		this.iconsInOSList = new ArrayList<IconInOS>();
		IconInOS tmpUserIcon;
		String query = "SELECT * FROM icons_in_os_t WHERE os_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.os.getId());
		this.db.connect();
		this.rset = this.db.select(query, info);
		try {
			while(this.rset.next()){
				tmpUserIcon = new IconInOS();
				tmpUserIcon.setOSId(this.rset.getInt("os_id"));
				tmpUserIcon.setId(this.rset.getInt("icon_id"));
				tmpUserIcon.setX(this.rset.getInt("iconX"));
				tmpUserIcon.setY(this.rset.getInt("iconY"));
				this.iconsInOSList.add(tmpUserIcon);
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
	public List<IconInOS> getIconsInOSList() {
		return iconsInOSList;
	}
	public void setIconsInOSList(List<IconInOS> iconsInOSList) {
		this.iconsInOSList = iconsInOSList;
	}
}
