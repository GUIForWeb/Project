package system.models;

public class BgPath {
	private int id;
	private int guiSettingId;
	private String bgPath;
	
	public BgPath(){
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getGUISettingId() {
		return guiSettingId;
	}

	public void setGUISettingId(int guiSettingId) {
		this.guiSettingId = guiSettingId;
	}

	public String getBgPath() {
		return bgPath;
	}

	public void setBgPath(String bgPath) {
		this.bgPath = bgPath;
	}

	public String toString(){
		String str = "";
		str += "ID             : " + this.id + System.getProperty("line.separator");
		str += "GUISetting  ID : " + this.guiSettingId + System.getProperty("line.separator");
		str += "Bg Path        : " + this.bgPath + System.getProperty("line.separator");
		return str;
	}
}
