package apps.fileBrowser.model;

public class Browser {
	private int id;
	private String path;
	private boolean isWeb;
	
	public Browser(){
		this.id = 0;
		this.path = "";
		this.isWeb = false;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public boolean isWeb() {
		return isWeb;
	}
	public void setWeb(boolean isWeb) {
		this.isWeb = isWeb;
	}
	public String toString(){
		String str = "";
		str += "ID       :"+this.id + System.getProperty("line.separator");
		str += "File Path:"+this.path + System.getProperty("line.separator");
		str += "Is Web   :"+this.isWeb;
		return str;
	}
}
