package system.model;

public class BgPath {
	private int id;
	private int guiId;
	private String bgPath;
	
	public BgPath(){
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getGuiId() {
		return guiId;
	}

	public void setGuiId(int guiId) {
		this.guiId = guiId;
	}

	public String getBgPath() {
		return bgPath;
	}

	public void setBgPath(String bgPath) {
		this.bgPath = bgPath;
	}

	public String toString(){
		String str = "";
		str += "ID      : " + this.id + System.getProperty("line.separator");
		str += "GUI  ID : " + this.guiId + System.getProperty("line.separator");
		str += "Bg Path : " + this.bgPath + System.getProperty("line.separator");
		return str;
	}
}
