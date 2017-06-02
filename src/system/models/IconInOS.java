package system.models;

public class IconInOS{
	private int iconId;
	private int osId;
	private int iconX;
	private int iconY;
	public IconInOS() {
		
	}
	public IconInOS(String[] param){
		this.iconId = Integer.valueOf(param[0]);
		this.iconX = Integer.valueOf(param[1]);
		this.iconY = Integer.valueOf(param[2]);
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
