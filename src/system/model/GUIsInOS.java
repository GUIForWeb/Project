package system.model;

public class GUIsInOS {
	private int id;
	private int osId;
	private int guiId;
	private boolean selected;
	public GUIsInOS(){
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
	public int getGuiId() {
		return guiId;
	}
	public void setGuiId(int guiId) {
		this.guiId = guiId;
	}
	public String toString(){
		String str = "";
		str += "ID       : " + this.id + System.getProperty("line.separator");
		str += "OS    ID : " + this.osId + System.getProperty("line.separator");
		str += "GUI   ID : " + this.guiId + System.getProperty("line.separator");
		str += "SELECTED : " + this.selected + System.getProperty("line.separator");
		return str;
	}
}
