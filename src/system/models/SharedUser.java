package system.models;

public class SharedUser {
	private int id;
	private int userId;
	private int sharedFolderId;
	private String permissions;
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
	public int getSharedFolderId() {
		return sharedFolderId;
	}
	public void setSharedFolderId(int sharedFolderId) {
		this.sharedFolderId = sharedFolderId;
	}
	public String getPermissions() {
		return permissions;
	}
	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}
	public String toString() {
		String tmpStr = "";
		tmpStr += "ID                 : " + this.id + System.getProperty("line.separator");
		tmpStr += "USER ID            : " + this.userId + System.getProperty("line.separator");
		tmpStr += "Shared FolderId ID : " + this.sharedFolderId + System.getProperty("line.separator");
		tmpStr += "Permissions        : " + this.permissions;
		return tmpStr;
	}
}
