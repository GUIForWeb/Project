package system.model;

public class OS {
	private int id;
	private int userId;
	private boolean selected;
	private long lastModifiedDesktop;
	
	public OS(){
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
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public long getLastModifiedDesktop() {
		return lastModifiedDesktop;
	}
	public void setLastModifiedDesktop(long lastModifiedDesktop) {
		this.lastModifiedDesktop = lastModifiedDesktop;
	}
	public String toString(){
		String str = "";
		str += "OS    ID : " + this.id + System.getProperty("line.separator");
		str += "USER  ID : " + this.userId + System.getProperty("line.separator");
		str += "SELECTED : " + this.selected + System.getProperty("line.separator");
		str += "Last Modified Desktop : " + this.lastModifiedDesktop;
		return str;
	}
}
