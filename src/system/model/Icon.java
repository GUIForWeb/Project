package system.model;

import org.json.JSONObject;

public class Icon{
	private JSONObject json;

	public Icon(){
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
	public void setX(int iconX) {
		this.json.put("x", iconX);
	}
	public int getY() {
		return this.json.getInt("y");
	}
	public void setY(int iconY) {
		this.json.put("y", iconY);
	}
	public int getIconTypeId() {
		return this.json.getInt("iconTypeId");
	}
	public void setIconTypeId(int iconTypeId) {
		this.json.put("iconTypeId", iconTypeId);
	}
	public String getName() {
		return this.json.getString("name");
	}
	public void setName(String name) {
		this.json.put("name", name);
	}
	public String getIconType() {
		return this.json.getString("iconType");
	}
	public void setIconType(String iconType) {
		this.json.put("iconType", iconType);
	}
	public String getContentURL() {
		return this.json.getString("contentURL");
	}
	public void setContentURL(String contentURL) {
		this.json.put("contentURL", contentURL);
	}
	public String getIconURL() {
		return this.json.getString("iconURL");
	}
	public void setIconURL(String iconURL) {
		this.json.put("iconURL", iconURL);
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
