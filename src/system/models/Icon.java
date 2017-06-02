package system.models;

public class Icon{
	private int id;
	private int iconX;
	private int iconY;
	private int iconTypeId;
	private String name;
	private String iconType;
	private String contentURL;
	private String iconURL;
	public Icon(){
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public int getIconTypeId() {
		return iconTypeId;
	}
	public void setIconTypeId(int iconTypeId) {
		this.iconTypeId = iconTypeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIconType() {
		return iconType;
	}
	public void setIconType(String iconType) {
		this.iconType = iconType;
	}
	public String getContentURL() {
		return contentURL;
	}
	public void setContentURL(String contentURL) {
		this.contentURL = contentURL;
	}
	public String getIconURL() {
		return iconURL;
	}
	public void setIconURL(String iconURL) {
		this.iconURL = iconURL;
	}
	public String toString()
	{
		String tmpStr = "";
		tmpStr += "(";
		tmpStr += "iconNumId:=" + this.id + ", ";
		tmpStr += "iconX:=" + this.iconX + ", ";
		tmpStr += "iconY:=" + this.iconY + ", ";
		tmpStr += "name:=" + this.name + ", ";
		tmpStr += "iconTypeId:="+this.iconTypeId + ", ";
		tmpStr += "iconType:=" +this.iconType+", ";
		tmpStr += "contentURL:=" +this.contentURL+", ";
		tmpStr += "iconURL:=" +this.iconURL+")";
		return tmpStr;
	}
}
