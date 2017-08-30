package apps.fileBrowser.model;

public class Browser {
	private int id;
	private String path;
	public Browser(){
		this.id = 0;
		this.path = "";
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
	public String toString(){
		String str = "";
		str += "ID       :"+this.id + System.getProperty("line.separator");
		str += "File Path:"+this.path;
		return str;
	}
}
