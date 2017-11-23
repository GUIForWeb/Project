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
	final private String table0 = "dataicons_t";
	final private String table1 = "icons_in_os_t";
	final private String expr0 = "os_id";
	final private String expr1 = "icon_id";
	final private String expr2 = "name";
	final private String expr3 = "type";
	final private String expr4 = "x";
	final private String expr5 = "y";
	final private String expr6 = "id";
	final private String expr7 = "dest";
	final private String expr8 = "src";
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
		String query0 = "UPDATE "+this.table0+" SET "+this.expr2+" = ? WHERE "+this.expr2+" = ? AND "+this.expr0+" = ?";
		String query1 = "SELECT "+this.expr1+" FROM "+this.table0+" WHERE "+this.expr2+" = ? AND "+this.expr0+" = ?";
		try {
			String[] info = new String[3];
			info[0] = json.getString(this.expr7);
			info[1] = json.getString(this.expr8);
			info[2] = String.valueOf(this.os.getId());
			this.db.executeUpdate(query0,info);
			info = new String[2];
			info[0] = json.getString(this.expr7);
			info[1] = String.valueOf(this.os.getId());
			this.rset = this.db.executeQuery(query1,info);
			this.rset.next();
			json.put("id",this.rset.getInt(this.expr1));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public void updateXY(JSONObject json){
		String query = "UPDATE "+this.table0+" SET "+this.expr4+"=?, "+this.expr5+"=? WHERE "+this.expr0+" = ? AND "+this.expr1+" = ?";
		int[] info = new int[4];
		info[0] = json.getInt(this.expr4);
		info[1] = json.getInt(this.expr5);
		info[2] = this.os.getId();
		info[3] = json.getInt(this.expr6);
		this.db.executeUpdate(query,info);
	}
	public void updateXYs(JSONArray jsonArray){
		String query = "UPDATE "+this.table0+" SET "+this.expr4+"=?, "+this.expr5+"=? WHERE "+this.expr1+" = ? AND "+this.expr0+" = ?;";
		int[] info = new int[4];
		JSONObject newJ = null;
		int jLen = jsonArray.length();
		info[3] = this.os.getId();
		for(int ji=0; ji < jLen; ji++){
			newJ = (JSONObject) jsonArray.get(ji);
			info[0] = newJ.getInt(this.expr4);
			info[1] = newJ.getInt(this.expr5);
			info[2] = newJ.getInt(this.expr6);
			this.db.executeUpdate(query, info);
		}
	}
	
	public String delete(JSONArray jsonArray) {
		String ids = "";
		String query0 = "SELECT "+this.expr1+" FROM "+this.table0+" WHERE "+this.expr0+" = ? AND "+this.expr2+" = ? AND "+this.expr3+" = ?";
		String query1 = "DELETE FROM "+this.table0+" WHERE "+this.expr0+" = ? AND "+this.expr2+" = ? AND "+this.expr3+" = ?";
		String[] info = new String[3];
		JSONObject newJ = null;
		int jLen = jsonArray.length();
		info[0] = String.valueOf(this.os.getId());
		for(int ji=0; ji < jLen; ji++){
			newJ = (JSONObject) jsonArray.get(ji);
			info[1] = newJ.getString(this.expr2);
			info[2] = newJ.getString(this.expr3);
			try {
				this.rset = this.db.executeQuery(query0, info);
				this.rset.next();
				ids += rset.getString(this.expr1) + ",";
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
		String query0 = "SELECT MAX("+this.expr1+") FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		String query1 =  "SELECT MAX("+this.expr5+") FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		String query2 =  "SELECT MAX("+this.expr5+") FROM "+this.table1+" WHERE "+this.expr0+" = ?";
		String query3 =  "INSERT INTO "+this.table0+" ("+this.expr1+","+this.expr0+","+this.expr2+","+this.expr3+","+this.expr4+","+this.expr5+") VALUES (?,?,?,?,0,?)";
		int jLen = jsonArray.length();
		JSONObject newJ = null;
		try {
			String[] info = new String[1];
			info[0] = String.valueOf(this.os.getId());
			this.rset = this.db.executeQuery(query0, info);
			while(this.rset.next())
				tmpIId = rset.getInt("MAX("+this.expr1+")");
			if(tmpIId == 0)
				tmpIId = 1;
			for(int ji=0; ji < jLen; ji++){
				tmpIId++;
				info = new String[1];
				info[0] = String.valueOf(this.os.getId());
				this.rset = this.db.executeQuery(query1, info);
				while(this.rset.next())
					tmpY = rset.getString("MAX("+this.expr5+")");
				if(null == tmpY) {
					this.rset = this.db.executeQuery(query2, info);
					while(this.rset.next())
						tmpY = rset.getString("MAX("+this.expr5+")");
				}
				newJ = (JSONObject) jsonArray.get(ji);
				info = new String[5];
				info[0] = String.valueOf(tmpIId);
				info[1] = String.valueOf(this.os.getId());
				info[2] = newJ.getString(this.expr2);
				info[3] = newJ.getString(this.expr3);
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
		String query = "SELECT * FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		int[] info = new int[1];
		info[0] = this.os.getId();
		try {
			this.rset = this.db.executeQuery(query, info);
			while (this.rset.next()) {
				tmpDataIcon = new DataIcon();
				tmpDataIcon.setId(this.rset.getInt(this.expr1));
				tmpDataIcon.setName(this.rset.getString(this.expr2));
				tmpDataIcon.setType(this.rset.getString(this.expr3));
				tmpDataIcon.setX(this.rset.getInt(this.expr4));
				tmpDataIcon.setY(this.rset.getInt(this.expr5));
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
		return this.jsonArray;
	}

	@Override
	public void deleteAll(int osId) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		this.db.executeUpdate(query,osId);
	}
}
