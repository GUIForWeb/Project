package system.daos.mysqls;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

import system.daoInterfaces.DataIconsDAO;
import system.databases.MySQL;
import system.models.DataIcon;
import system.models.OS;

public class DataIconsDAOMySQL implements DataIconsDAO {
	private MySQL db;
	private ResultSet rset;
	private JSONArray jsonArray;
	private OS os;

	public DataIconsDAOMySQL() {
		this.db = new MySQL();
	}

	public DataIconsDAOMySQL(OS os) {
		this.db = new MySQL();
		this.os = os;
	}
	public void rename(JSONObject json){
		String query = "call renameDataIcon(?,?,?)";
		String[] info = new String[3];
		info[0] = String.valueOf(this.os.getId());
		info[1] = json.getString("src");
		info[2] = json.getString("dest");
		this.db.connect();
		this.rset = this.db.call(query, info);
		try {
			this.rset.next();
			json.put("id",rset.getString(1));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.db.close();
	}
	public void updateXY(JSONObject json){
		String query = "UPDATE dataicons_t SET x=?, y=? WHERE os_id = ? AND icon_id = ?";
		int[] info = new int[4];
		info[0] = json.getInt("x");
		info[1] = json.getInt("y");
		info[2] = this.os.getId();
		info[3] = json.getInt("id");
		this.db.connect();
		this.db.update(query,info);
		this.db.close();
	}
	public void updateXYs(JSONArray jsonArray){
		String query = "call updateDataIconXYs(?,?,?,?)";
		String[] info = new String[4];
		String id = "";
		String x = "";
		String y = "";
		JSONObject newJ = null;
		int jLen = jsonArray.length();
		for(int ji=0; ji < jLen; ji++){
			newJ = (JSONObject) jsonArray.get(ji);
			id += newJ.getInt("id") + ",";
			x += newJ.getInt("x") + ",";
			y += newJ.getInt("y") + ",";
		}
		this.db.connect();
		info[0] = String.valueOf(this.os.getId());
		info[1] = id.substring(0, id.length()-1);
		info[2] = x.substring(0, x.length()-1);
		info[3] = y.substring(0, y.length()-1);
		rset = this.db.call(query, info);
		this.db.close();
	}
	
	public String delete(JSONArray jsonArray) {
		String ids = "";
		String query = "call delDataIcon(?,?,?)";
		String[] info = new String[3];
		String names = "";
		String types = "";
		JSONObject newJ = null;
		int jLen = jsonArray.length();
		for(int ji=0; ji < jLen; ji++){
			newJ = (JSONObject) jsonArray.get(ji);
			names += newJ.getString("name") + ",";
			types += newJ.getString("type") + ",";
		}
		this.db.connect();
		info[0] = String.valueOf(this.os.getId());
		info[1] = names.substring(0, names.length()-1);
		info[2] = types.substring(0, types.length()-1);
		this.rset = this.db.call(query, info);
		try {
			this.rset.next();
			ids = rset.getString(1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.db.close();
		return ids;
	}
	public void insert(JSONArray jsonArray) {
		String query = "call newDataIcon(?,?,?)";
		String[] info = new String[3];
		String names = "";
		String types = "";
		JSONObject newJ = null;
		int jLen = jsonArray.length();
		for(int ji=0; ji < jLen; ji++){
			newJ = (JSONObject) jsonArray.get(ji);
			names += newJ.getString("name") + ",";
			types += newJ.getString("type") + ",";
		}
		this.db.connect();
		info[0] = String.valueOf(this.os.getId());
		info[1] = names.substring(0, names.length()-1);
		info[2] = types.substring(0, types.length()-1);
		this.rset = this.db.call(query, info);
		this.db.close();
	}
	public void update(JSONArray jsonArray) {
		boolean isDuplicated = false;
		boolean isNew = false;
		int jLen = this.jsonArray.length();
		JSONObject oldJ = null;
		JSONObject newJ = null;
		int id = 0;
		String query0 = "INSERT INTO dataicons_t (id,name,type) VALUES ";
		int[] infoInt = new int[jLen];
		for(int ji = 0; ji < jLen; ji++){
			oldJ = this.jsonArray.getJSONObject(ji);
			newJ = (JSONObject) jsonArray.get(0);
			jsonArray.remove(0);
			id = oldJ.getInt("id");
			infoInt[ji] = id;
			query0 += "(?, '"+newJ.getString("name")+"', '"+newJ.getString("type")+"'),";
			isDuplicated = true;
		}
		query0 = query0.substring(0, query0.length()-1);
		query0 += " ON DUPLICATE KEY UPDATE name=VALUES(name),type=VALUES(type)";
		
		String query1 = "call newDataIcon(?,?,?)";
		String[] infoStr = new String[3];
		String names = "";
		String types = "";
		
		jLen = jsonArray.length();
		for(int ji=0; ji < jLen; ji++){
			isNew = true;
			newJ = (JSONObject) jsonArray.get(0);
			jsonArray.remove(0);
			names += newJ.getString("name") + ",";
			types += newJ.getString("type") + ",";
		}
		this.db.connect();
		if(isDuplicated)
			this.db.executeUpdate(query0,infoInt);
		if(isNew) {
			infoStr[0] = String.valueOf(this.os.getId());
			infoStr[1] = names.substring(0, names.length()-1);
			infoStr[2] = types.substring(0, types.length()-1);
			this.db.call(query1, infoStr);
		}
		this.db.close();
	}

	@Override
	public void load() {
		this.jsonArray = new JSONArray();
		DataIcon tmpDataIcon;
		String query = "SELECT * FROM dataicons_t WHERE os_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.os.getId());
		this.db.connect();
		this.rset = this.db.select(query, info);
		try {
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
	public JSONArray getJSONArray() {
		// TODO Auto-generated method stub
		return this.jsonArray;
	}

	@Override
	public void deleteAll(int osId) {
		// TODO Auto-generated method stub
		
	}
}
