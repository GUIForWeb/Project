package system.model;

public class Bar{
	private boolean windowOnScreen;
	private int numId;
	private int wNumId;
	private String name;
	public Bar(){
		this.windowOnScreen = false;
		this.wNumId = 0;
		this.name = "";
	}
	public Bar(String[] valArray){
		this.windowOnScreen = Boolean.valueOf(valArray[0]);
		this.numId = Integer.valueOf(valArray[1]);
		this.wNumId = Integer.valueOf(valArray[2]);
		this.name = valArray[3];
	}
	public boolean isWindowOnScreen() {
		return windowOnScreen;
	}
	public void setWindowOnScreen(boolean windowOnScreen) {
		this.windowOnScreen = windowOnScreen;
	}
	public int getNumId() {
		return numId;
	}
	public void setNumId(int numId) {
		this.numId = numId;
	}
	public int getWNumId() {
		return wNumId;
	}
	public void setWNumId(int wNumId) {
		this.wNumId = wNumId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String toString()
	{
		String tmpStr = "";
		tmpStr += "(";
		tmpStr += "windowOnScreen:=" + this.windowOnScreen + ", ";
		tmpStr += "numId:=" + this.numId + ", ";
		tmpStr += "wNumId:=" + this.wNumId + ", ";
		tmpStr += "name:=" + this.name + ")";
		return tmpStr;
	}
}
