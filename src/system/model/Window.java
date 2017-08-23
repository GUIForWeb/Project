package system.model;

public class Window{
	private boolean fullScreen;
	private int numId;
	private int bNumId;
	private double oWidth;
	private double oHeight;
	private double oLeft;
	private double oTop;
	private double preOWidth;
	private double preOHeight;
	private double preOLeft;
	private double preOTop;
	private int zIndex;
	private String tagId;
	private String name;
	private String content;
	public Window(){
	}
	public Window(String[] valArray){
		this.fullScreen = Boolean.valueOf(valArray[0]);
		this.tagId = valArray[1];
		this.name = valArray[2];
		this.numId = Integer.valueOf(valArray[3]);
		this.bNumId = Integer.valueOf(valArray[4]);
		this.content = valArray[5];
		this.oWidth = Double.valueOf(valArray[6]);
		this.oHeight = Double.valueOf(valArray[7]);
		this.oLeft = Double.valueOf(valArray[8]);
		this.oTop = Double.valueOf(valArray[9]);
		this.preOWidth = Double.valueOf(valArray[10]);
		this.preOHeight = Double.valueOf(valArray[11]);
		this.preOLeft = Double.valueOf(valArray[12]);
		this.preOTop = Double.valueOf(valArray[13]);
		this.zIndex = Integer.valueOf(valArray[14]);
	}
	public boolean isFullScreen() {
		return fullScreen;
	}
	public void setFullScreen(boolean fullScreen) {
		this.fullScreen = fullScreen;
	}
	public String getTagId() {
		return tagId;
	}
	public void setTagId(String tagId) {
		this.tagId = tagId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getNumId() {
		return numId;
	}
	public void setNumId(int numId) {
		this.numId = numId;
	}
	public int getBNumId() {
		return bNumId;
	}
	public void setBNumId(int bNumId) {
		this.bNumId = bNumId;
	}
	public double getOWidth() {
		return oWidth;
	}
	public void setOWidth(double oWidth) {
		this.oWidth = oWidth;
	}
	public double getOHeight() {
		return oHeight;
	}
	public void setOHeight(double oHeight) {
		this.oHeight = oHeight;
	}
	public double getOLeft() {
		return oLeft;
	}
	public void setOLeft(double oLeft) {
		this.oLeft = oLeft;
	}
	public double getOTop() {
		return oTop;
	}
	public void setOTop(double oTop) {
		this.oTop = oTop;
	}
	public double getPreOWidth() {
		return preOWidth;
	}
	public void setPreOWidth(double preOWidth) {
		this.preOWidth = preOWidth;
	}
	public double getPreOHeight() {
		return preOHeight;
	}
	public void setPreOHeight(double preOHeight) {
		this.preOHeight = preOHeight;
	}
	public double getPreOLeft() {
		return preOLeft;
	}
	public void setPreOLeft(double preOLeft) {
		this.preOLeft = preOLeft;
	}
	public double getPreOTop() {
		return preOTop;
	}
	public void setPreOTop(double preOTop) {
		this.preOTop = preOTop;
	}
	public int getZIndex() {
		return zIndex;
	}
	public void setZIndex(int zIndex) {
		this.zIndex = zIndex;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String toString()
	{
		String tmpStr = "";
		tmpStr += "(";
		tmpStr += "numId:=" + this.numId + ", ";
		tmpStr += "fullScreen:=" + this.fullScreen + ", ";
		tmpStr += "name:=" + this.name + ", ";
		tmpStr += "tagId:=" + this.tagId + ", ";
		tmpStr += "bNumId:=" + this.bNumId + ", ";
		tmpStr += "content:=" + this.content + ", ";
		tmpStr += "oWidth:=" + this.oWidth + ", ";
		tmpStr += "oHeight:=" + this.oHeight + ", ";
		tmpStr += "oLeft:="+this.oLeft + ", ";
		tmpStr += "oTop:=" +this.oTop+", ";
		tmpStr += "preOWidth:=" + this.preOWidth + ", ";
		tmpStr += "preOHeight:=" + this.preOHeight + ", ";
		tmpStr += "preOLeft:="+this.preOLeft + ", ";
		tmpStr += "preOTop:=" +this.preOTop+", ";
		tmpStr += "zIndex:=" +this.zIndex+")";
		return tmpStr;
	}
}
