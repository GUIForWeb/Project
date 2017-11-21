package system.models;

public class SharedFolder {
	private int id;
	private int userId;
	private String folder;
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
	public String getFolder() {
		return folder;
	}
	public void setFolder(String folder) {
		this.folder = folder;
	}
	public String toString() {
		String tmpStr = "";
		tmpStr += "ID      : " + this.id + System.getProperty("line.separator");
		tmpStr += "USER ID : " + this.userId + System.getProperty("line.separator");
		tmpStr += "Folder  : " + this.folder;
		return tmpStr;
	}
}
