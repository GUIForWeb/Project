package system.model;

public class OSSetting {
	private int id;
	private int userId;
	private boolean selected;
	public OSSetting(){
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
	public String toString(){
		String str = "";
		str += "OS    ID : " + this.id + System.getProperty("line.separator");
		str += "USER  ID : " + this.userId + System.getProperty("line.separator");
		str += "SELECTED : " + this.selected + System.getProperty("line.separator");
		return str;
	}
}
