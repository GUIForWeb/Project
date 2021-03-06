package system.models;

import org.json.JSONObject;

public class DataIcon{
	private JSONObject json;

	public DataIcon(){
		this.json = new JSONObject();
	}
	
	public int getId() {
		return this.json.getInt("id");
	}
	public void setId(int id) {
		this.json.put("id", id);
	}
	public int getX() {
		return this.json.getInt("x");
	}
	public void setX(int x) {
		this.json.put("x", x);
	}
	public int getY() {
		return this.json.getInt("y");
	}
	public void setY(int y) {
		this.json.put("y", y);
	}
	public String getName() {
		return this.json.getString("name");
	}
	public void setName(String name) {
		this.json.put("name", name);
	}
	public String getType() {
		return this.json.getString("type");
	}
	public void setType(String type) {
		this.json.put("type", type);
	}
	public String getDateModified() {
		return this.json.getString("dateModified");
	}
	public void setDateModified(String dateModified) {
		this.json.put("dateModified", dateModified);
	}
	public long getSize() {
		return this.json.getLong("size");
	}
	public void setSize(long size) {
		this.json.put("size", size);
	}
	
	public JSONObject getJSON() {
		return json;
	}

	public void setJSON(JSONObject json) {
		this.json = json;
	}
	public String toString()
	{
		String tmpStr = "";
		tmpStr += this.json;
		return tmpStr;
	}
}
