package apps.fileBrowser.model;

import org.json.JSONObject;

public class DataItem {
	private JSONObject json;
	
	public DataItem(){
		this.json = new JSONObject();
	}
	public String getName() {
		return this.json.getString("name");
	}
	public void setName(String name) {
		this.json.put("name",name);
	}
	public String getDateModified() {
		return this.json.getString("dateModified");
	}
	public void setDateModified(String dateModified) {
		this.json.put("dateModified",dateModified);
	}
	public String getType() {
		return this.json.getString("type");
	}
	public void setType(String type) {
		this.json.put("type",type);
	}
	public String getSize() {
		return this.json.getString("size");
	}
	public void setSize(double size) {
		this.json.put("size",size);
	}
	public JSONObject getJSON() {
		return json;
	}
	public void setJSON(JSONObject json) {
		this.json = json;
	}
	public String toString() {
		return this.json.toString();
	}
}
