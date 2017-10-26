package system.daos.sqlites;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.json.JSONArray;

import system.daoInterfaces.IconsDAO;
import system.databases.SQLite;
import system.models.Icon;
import system.models.IconInOS;

public class IconsDAOSQLite implements IconsDAO{
	private SQLite db;
	private ResultSet rset;
	private List<IconInOS> userIconList;
	private JSONArray iconJSONArray;
	
	public IconsDAOSQLite(){
		this.db = new SQLite();
	}
	public IconsDAOSQLite(List<IconInOS> userIconList){
		this.db = new SQLite();
		this.userIconList = userIconList;
	}
	
	@Override
	public void load(){
		String iconIds = "";
		for(IconInOS tmpUserIcon : this.userIconList){
			iconIds += tmpUserIcon.getId() + ",";
		}
		iconIds = iconIds.substring(0,iconIds.length()-1);
		this.iconJSONArray = new JSONArray();
		Icon tmpIcon;
		String query = "SELECT * FROM icons_v WHERE id IN ("+iconIds+")";
		String[] info = new String[1];
		info[0] = String.valueOf(iconIds);
		int idx = 0;
		try {
			this.rset = this.db.executeQuery(query);
			while(this.rset.next()){
				tmpIcon = new Icon();
				tmpIcon.setId(this.rset.getInt("id"));
				tmpIcon.setTypeId(this.rset.getInt("type_id"));
				tmpIcon.setType(this.rset.getString("type"));
				tmpIcon.setX(this.userIconList.get(idx).getX());
				tmpIcon.setY(this.userIconList.get(idx).getY());
				tmpIcon.setName(this.rset.getString("name"));
				tmpIcon.setContentURL(this.rset.getString("content_url"));
				tmpIcon.setImgURL(this.rset.getString("img_url"));
				this.iconJSONArray.put(tmpIcon.getJSON());
				idx++;
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
	public JSONArray getIconJSONArray() {
		// TODO Auto-generated method stub
		return this.iconJSONArray;
	}
}
