package system.models;

public class GUISettingsInOS {
	private int id;
	private int osId;
	private int guisettingId;
	private boolean selected;
	public GUISettingsInOS(){
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
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
	public void setOSId(int osId) {
		this.osId = osId;
	}
	public int getGUISettingId() {
		return guisettingId;
	}
	public void setGUISettingId(int guisettingId) {
		this.guisettingId = guisettingId;
	}
	public String toString(){
		String str = "";
		str += "ID       : " + this.id + System.getProperty("line.separator");
		str += "OS    ID : " + this.osId + System.getProperty("line.separator");
		str += "GUI   ID : " + this.guisettingId + System.getProperty("line.separator");
		str += "SELECTED : " + this.selected + System.getProperty("line.separator");
		return str;
	}
}
