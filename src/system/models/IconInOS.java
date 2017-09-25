package system.models;

import org.json.JSONObject;

public class IconInOS{
	private int id;
	private int osId;
	private int x;
	private int y;
	public IconInOS() {
		
	}
	public IconInOS(JSONObject json){
		this.id = json.getInt("id");
		this.x = json.getInt("x");
		this.y = json.getInt("y");
	}
	public int getX() {
		return x;
	}
	public void setX(int x) {
		this.x = x;
	}
	public int getY() {
		return y;
	}
	public void setY(int y) {
		this.y = y;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getOSId() {
		return osId;
	}
	public void setOSId(int userId) {
		this.osId = userId;
	}
	
	public String toString()
	{
		String str = "";
		str += "(Icon ID = " + this.id + ", ";
		str += "OS ID = " + this.osId + ", ";
		str += "iconX = " + this.x + ", ";
		str += "iconY = " + this.y + ")";
		return str;
	}
}
