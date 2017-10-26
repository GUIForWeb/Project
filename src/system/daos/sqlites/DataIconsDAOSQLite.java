package system.daos.sqlites;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

import system.daoInterfaces.DataIconsDAO;
import system.databases.SQLite;
import system.models.DataIcon;
import system.models.OS;

public class DataIconsDAOSQLite implements DataIconsDAO {
	private SQLite db;
	private ResultSet rset;
	private JSONArray jsonArray;
	private OS os;

	public DataIconsDAOSQLite() {
		this.db = new SQLite();
	}

	public DataIconsDAOSQLite(OS os) {
		this.db = new SQLite();
		this.os = os;
	}
	public void rename(JSONObject json){
		String query0 = "UPDATE dataicons_t SET name = ? WHERE name = ? AND os_id = ?";
		String query1 = "SELECT icon_id FROM dataicons_t WHERE name = ? AND os_id = ?";
		try {
			String[] info = new String[3];
			info[0] = json.getString("dest");
			info[1] = json.getString("src");
			info[2] = String.valueOf(this.os.getId());
			this.db.executeUpdate(query0,info);
			info = new String[2];
			info[0] = json.getString("dest");
			info[1] = String.valueOf(this.os.getId());
			this.rset = this.db.executeQuery(query1,info);
			this.rset.next();
			json.put("id",this.rset.getInt("icon_id"));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public void updateXY(JSONObject json){
		String query = "UPDATE dataicons_t SET x=?, y=? WHERE os_id = ? AND icon_id = ?";
		int[] info = new int[4];
		info[0] = json.getInt("x");
		info[1] = json.getInt("y");
		info[2] = this.os.getId();
		info[3] = json.getInt("id");
		this.db.executeUpdate(query,info);
	}
	public void updateXYs(JSONArray jsonArray){
		String query = "UPDATE dataicons_t SET x = ? ,y = ? WHERE icon_id = ? AND os_id = ?;";
		int[] info = new int[4];
		JSONObject newJ = null;
		int jLen = jsonArray.length();
		info[3] = this.os.getId();
		for(int ji=0; ji < jLen; ji++){
			newJ = (JSONObject) jsonArray.get(ji);
			info[0] = newJ.getInt("x");
			info[1] = newJ.getInt("y");
			info[2] = newJ.getInt("id");
			this.db.executeUpdate(query, info);
		}
	}
	
	public String delete(JSONArray jsonArray) {
		String ids = "";
		String query0 = "SELECT icon_id FROM dataicons_t WHERE os_id = ? AND name = ? AND type = ?";
		String query1 = "DELETE FROM dataicons_t WHERE os_id = ? AND name = ? AND type = ?";
		String[] info = new String[3];
		JSONObject newJ = null;
		int jLen = jsonArray.length();
		info[0] = String.valueOf(this.os.getId());
		for(int ji=0; ji < jLen; ji++){
			newJ = (JSONObject) jsonArray.get(ji);
			info[1] = newJ.getString("name");
			info[2] = newJ.getString("type");
			try {
				this.rset = this.db.executeQuery(query0, info);
				this.rset.next();
				ids += rset.getString("icon_id") + ",";
			} catch (SQLException e) {
				e.printStackTrace();
			}
			this.db.executeUpdate(query1, info);
		}
		return ids;
	}
	public void insert(JSONArray jsonArray) {
		int tmpIId = 0;
		String tmpY = null;
		String query0 = "SELECT MAX(icon_id) FROM dataicons_t WHERE os_id = ?";
		String query1 =  "SELECT MAX(y) FROM dataicons_t WHERE os_id = ?";
		String query2 =  "SELECT MAX(y) FROM icons_in_os_t WHERE os_id = ?";
		String query3 =  "INSERT INTO dataicons_t (icon_id,os_id,name,type,x,y) VALUES (?,?,?,?,0,?)";
		int jLen = jsonArray.length();
		JSONObject newJ = null;
		try {
			String[] info = new String[1];
			info[0] = String.valueOf(this.os.getId());
			this.rset = this.db.executeQuery(query0, info);
			while(this.rset.next())
				tmpIId = rset.getInt("MAX(icon_id)");
			if(tmpIId == 0)
				tmpIId = 1;
			for(int ji=0; ji < jLen; ji++){
				tmpIId++;
				info = new String[1];
				info[0] = String.valueOf(this.os.getId());
				this.rset = this.db.executeQuery(query1, info);
				while(this.rset.next())
					tmpY = rset.getString("MAX(y)");
				if(null == tmpY) {
					this.rset = this.db.executeQuery(query2, info);
					while(this.rset.next())
						tmpY = rset.getString("MAX(y)");
				}
				newJ = (JSONObject) jsonArray.get(ji);
				info = new String[5];
				info[0] = String.valueOf(tmpIId);
				info[1] = String.valueOf(this.os.getId());
				info[2] = newJ.getString("name");
				info[3] = newJ.getString("type");
				info[4] = tmpY;
				this.db.executeUpdate(query3, info);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void load() {
		this.jsonArray = new JSONArray();
		DataIcon tmpDataIcon;
		String query = "SELECT * FROM dataicons_t WHERE os_id = ?";
		int[] info = new int[1];
		info[0] = this.os.getId();
		try {
			this.rset = this.db.executeQuery(query, info);
			while (this.rset.next()) {
				tmpDataIcon = new DataIcon();
				tmpDataIcon.setId(this.rset.getInt("icon_id"));
				tmpDataIcon.setName(this.rset.getString("name"));
				tmpDataIcon.setType(this.rset.getString("type"));
				tmpDataIcon.setX(this.rset.getInt("x"));
				tmpDataIcon.setY(this.rset.getInt("y"));
				this.jsonArray.put(tmpDataIcon.getJSON());
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
	public JSONArray getJSONArray() {
		// TODO Auto-generated method stub
		return this.jsonArray;
	}
}
