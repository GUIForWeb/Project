package apps.fileBrowser.model;

public class Browser {
	private int id;
	private String filePath;
	public Browser(){
		this.id = 0;
		this.filePath = "";
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String toString(){
		String str = "";
		str += "ID       :"+this.id + System.getProperty("line.separator");
		str += "File Path:"+this.filePath;
		return str;
	}
}
