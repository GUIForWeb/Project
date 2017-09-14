package system.model;

import org.json.JSONObject;

public class IconInOS{
	private int iconId;
	private int osId;
	private int iconX;
	private int iconY;
	public IconInOS() {
		
	}
	public IconInOS(JSONObject json){
		this.iconId = json.getInt("iconNumId");
		this.iconX = json.getInt("iconX");
		this.iconY = json.getInt("iconY");
	}
	public int getIconX() {
		return iconX;
	}
	public void setIconX(int iconX) {
		this.iconX = iconX;
	}
	public int getIconY() {
		return iconY;
	}
	public void setIconY(int iconY) {
		this.iconY = iconY;
	}
	public int getIconId() {
		return iconId;
	}
	public void setIconId(int iconId) {
		this.iconId = iconId;
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
		str += "(Icon ID = " + this.iconId + ", ";
		str += "OS ID = " + this.osId + ", ";
		str += "iconX = " + this.iconX + ", ";
		str += "iconY = " + this.iconY + ")";
		return str;
	}
}
