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
import java.util.ArrayList;
import java.util.List;

import system.daoInterfaces.IconsInOSDAO;
import system.databases.MySQL;
import system.models.IconInOS;
import system.models.OSSetting;

public class IconsInOSDAOMySQL implements IconsInOSDAO{
	private MySQL db;
	private OSSetting osSetting;
	private ResultSet rset;
	private List<IconInOS> iconsInOSList;
	
	
	public IconsInOSDAOMySQL(){
		this.db = new MySQL();
		this.osSetting = new OSSetting();
	}
	public IconsInOSDAOMySQL(OSSetting osSetting){
		this.db = new MySQL();
		this.osSetting = osSetting;
	}
	@Override
	public void updateXY(IconInOS iconInOS){
		String query = "UPDATE iconsinos_t SET iconX=?, iconY=? WHERE os_id = ? AND icon_id = ?";
		String[] info = new String[4];
		info[0] = String.valueOf(iconInOS.getIconX());
		info[1] = String.valueOf(iconInOS.getIconY());
		info[2] = String.valueOf(iconInOS.getOSId());
		info[3] = String.valueOf(iconInOS.getIconId());
		this.db.connect();
		this.db.update(query,info);
		this.db.close();
	}
	@Override
	public void load(){
		this.iconsInOSList = new ArrayList<IconInOS>();
		IconInOS tmpUserIcon;
		String query = "SELECT * FROM iconsinos_t WHERE os_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.osSetting.getId());
		this.db.connect();
		this.rset = this.db.select(query, info);
		try {
			while(this.rset.next()){
				tmpUserIcon = new IconInOS();
				tmpUserIcon.setOSId(this.rset.getInt("os_id"));
				tmpUserIcon.setIconId(this.rset.getInt("icon_id"));
				tmpUserIcon.setIconX(this.rset.getInt("iconX"));
				tmpUserIcon.setIconY(this.rset.getInt("iconY"));
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
