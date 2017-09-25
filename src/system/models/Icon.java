package system.models;

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
	public void setX(int x) {
		this.json.put("x", x);
	}
	public int getY() {
		return this.json.getInt("y");
	}
	public void setY(int y) {
		this.json.put("y", y);
	}
	public int getTypeId() {
		return this.json.getInt("typeId");
	}
	public void setTypeId(int typeId) {
		this.json.put("typeId", typeId);
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
	public String getContentURL() {
		return this.json.getString("contentURL");
	}
	public void setContentURL(String contentURL) {
		this.json.put("contentURL", contentURL);
	}
	public String getImgURL() {
		return this.json.getString("imgURL");
	}
	public void setImgURL(String imgURL) {
		this.json.put("imgURL", imgURL);
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
