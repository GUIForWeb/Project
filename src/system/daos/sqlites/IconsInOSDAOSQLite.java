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
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import system.daoInterfaces.IconsInOSDAO;
import system.databases.SQLite;
import system.models.IconInOS;
import system.models.OS;

public class IconsInOSDAOSQLite implements IconsInOSDAO{
	private SQLite db;
	private OS os;
	private ResultSet rset;
	private List<IconInOS> iconsInOSList;
	
	
	public IconsInOSDAOSQLite(){
		this.db = new SQLite();
		this.os = new OS();
	}
	public IconsInOSDAOSQLite(OS os){
		this.db = new SQLite();
		this.os = os;
	}
	@Override
	public void updateXY(JSONObject json){
		String query = "UPDATE icons_in_os_t SET x=?, y=? WHERE os_id = ? AND icon_id = ?";
		int[] info = new int[4];
		info[0] = json.getInt("x");
		info[1] = json.getInt("y");
		info[2] = this.os.getId();
		info[3] = json.getInt("id");
		this.db.executeUpdate(query,info);
	}
	@Override
	public void load(){
		this.iconsInOSList = new ArrayList<IconInOS>();
		IconInOS tmpUserIcon;
		String query = "SELECT * FROM icons_in_os_t WHERE os_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.os.getId());
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				tmpUserIcon = new IconInOS();
				tmpUserIcon.setOSId(this.rset.getInt("os_id"));
				tmpUserIcon.setId(this.rset.getInt("icon_id"));
				tmpUserIcon.setX(this.rset.getInt("x"));
				tmpUserIcon.setY(this.rset.getInt("y"));
				this.iconsInOSList.add(tmpUserIcon);
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
	public List<IconInOS> getIconsInOSList() {
		return iconsInOSList;
	}
	public void setIconsInOSList(List<IconInOS> iconsInOSList) {
		this.iconsInOSList = iconsInOSList;
	}
}
