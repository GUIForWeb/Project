package system.models;

public class Route {
	private String lastPath;
	private String path;
	private String permissions;
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getPermissions() {
		return permissions;
	}
	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}
	public String getLastPath() {
		return lastPath;
	}
	public void setLastPath(String lastPath) {
		this.lastPath = lastPath;
	}
	public String toString() {
		String tmpStr = "";
		tmpStr += "File Path  :"+this.path + System.getProperty("line.separator");
		tmpStr += "Last Path  :"+this.lastPath + System.getProperty("line.separator");
		tmpStr += "Permissions:"+this.permissions;
		return tmpStr;
	}
}
