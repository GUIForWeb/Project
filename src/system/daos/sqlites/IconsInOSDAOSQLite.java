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
	final private String table0 = "icons_in_os_t";
	final private String expr0 = "os_id";
	final private String expr1 = "icon_id";
	final private String expr2 = "x";
	final private String expr3 = "y";
	final private String expr4 = "id";
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
		String query = "UPDATE "+this.table0+" SET "+this.expr2+"=?, "+this.expr3+"=? WHERE "+this.expr0+" = ? AND "+this.expr1+" = ?";
		int[] info = new int[4];
		info[0] = json.getInt(this.expr2);
		info[1] = json.getInt(this.expr3);
		info[2] = this.os.getId();
		info[3] = json.getInt(this.expr4);
		this.db.executeUpdate(query,info);
	}
	@Override
	public void load(){
		this.iconsInOSList = new ArrayList<IconInOS>();
		IconInOS tmpUserIcon;
		String query = "SELECT * FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.os.getId());
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				tmpUserIcon = new IconInOS();
				tmpUserIcon.setOSId(this.rset.getInt(this.expr0));
				tmpUserIcon.setId(this.rset.getInt(this.expr1));
				tmpUserIcon.setX(this.rset.getInt(this.expr2));
				tmpUserIcon.setY(this.rset.getInt(this.expr3));
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
	@Override
	public void deleteAll(int osId) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		this.db.executeUpdate(query,osId);
	}
}
