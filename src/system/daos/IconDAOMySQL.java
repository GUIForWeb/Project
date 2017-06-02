package system.daos;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import system.daoInterfaces.IconDAO;
import system.databases.MySQL;
import system.models.Icon;
import system.models.IconInOS;

public class IconDAOMySQL implements IconDAO{
	private MySQL db;
	private ResultSet rset;
	private List<Icon> iconList;
	private List<IconInOS> userIconList;
	
	public IconDAOMySQL(){
		this.db = new MySQL();
	}
	public IconDAOMySQL(List<IconInOS> userIconList){
		this.db = new MySQL();
		this.userIconList = userIconList;
	}
	
	@Override
	public void load(){
		String iconIds = "";
		for(IconInOS tmpUserIcon : this.userIconList){
			iconIds += tmpUserIcon.getIconId() + ",";
		}
		iconIds = iconIds.substring(0,iconIds.length()-1);
		this.iconList = new ArrayList<Icon>();
		Icon tmpIcon;
		String query = "SELECT * FROM icons_v WHERE id IN ("+iconIds+")";
		String[] info = new String[1];
		info[0] = String.valueOf(iconIds);
		this.db.connect();
		this.rset = this.db.select(query);
		int idx = 0;
		try {
			while(this.rset.next()){
				tmpIcon = new Icon();
				tmpIcon.setId(this.rset.getInt("id"));
				tmpIcon.setIconTypeId(this.rset.getInt("icon_type_id"));
				tmpIcon.setIconType(this.rset.getString("icon_type"));
				tmpIcon.setIconX(this.userIconList.get(idx).getIconX());
				tmpIcon.setIconY(this.userIconList.get(idx).getIconY());
				tmpIcon.setName(this.rset.getString("name"));
				tmpIcon.setContentURL(this.rset.getString("content_url"));
				tmpIcon.setIconURL(this.rset.getString("icon_url"));
				this.iconList.add(tmpIcon);
				idx++;
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
	@Override
	public List<Icon> getIconList() {
		return this.iconList;
	}
	public void setIconList(List<Icon> iconList) {
		this.iconList = iconList;
	}
}
