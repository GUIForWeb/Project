package system.model;

public class GUISetting{
	private int id;
	private String themeName;
	private double iconWidth;
	private double iconHeight;
	private double iconBorderWidth;
	private double iconBorderHeight;
	private String iconBorderStyle;
	private String iconBorderColor;
	private double winBBorderWidth;
	private String winBBorderColor;
	private String winBBgColor;
	private String winOBgColor;
	private String winHBgColor;
	private double winODefaultLeft;
	private double winODefaultTop;
	private double winODefaultWidth;
	private double winODefaultHeight;
	private double winOBorderWidth;
	private double winHHeight;
	private double winBWidth;
	private double winBHeight;
	private double winBTop;
	private double winMinWidth;
	private double winMinHeight;
	private double iconTableTop;
	private double iconTableLeft;
	
	public GUISetting(){
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getThemeName() {
		return themeName;
	}
	public void setThemeName(String themeName) {
		this.themeName = themeName;
	}
	public double getWinBBorderWidth() {
		return winBBorderWidth;
	}
	public void setWinBBorderWidth(double winBBorderWidth) {
		this.winBBorderWidth = winBBorderWidth;
	}
	public String getWinBBorderColor() {
		return winBBorderColor;
	}
	public void setWinBBorderColor(String winBBorderColor) {
		this.winBBorderColor = winBBorderColor;
	}
	public String getWinBBgColor() {
		return winBBgColor;
	}
	public void setWinBBgColor(String winBBgColor) {
		this.winBBgColor = winBBgColor;
	}
	public String getWinOBgColor() {
		return winOBgColor;
	}
	public void setWinOBgColor(String winOBgColor) {
		this.winOBgColor = winOBgColor;
	}
	public String getWinHBgColor() {
		return winHBgColor;
	}
	public void setWinHBgColor(String winHBgColor) {
		this.winHBgColor = winHBgColor;
	}
	public double getWinODefaultLeft() {
		return winODefaultLeft;
	}
	public void setWinODefaultLeft(double winODefaultLeft) {
		this.winODefaultLeft = winODefaultLeft;
	}
	public double getWinODefaultTop() {
		return winODefaultTop;
	}
	public void setWinODefaultTop(double winODefaultTop) {
		this.winODefaultTop = winODefaultTop;
	}
	public double getWinODefaultWidth() {
		return winODefaultWidth;
	}
	public void setWinODefaultWidth(double winODefaultWidth) {
		this.winODefaultWidth = winODefaultWidth;
	}
	public double getWinODefaultHeight() {
		return winODefaultHeight;
	}
	public void setWinODefaultHeight(double winODefaultHeight) {
		this.winODefaultHeight = winODefaultHeight;
	}
	public double getWinOBorderWidth() {
		return winOBorderWidth;
	}
	public void setWinOBorderWidth(double winOBorderWidth) {
		this.winOBorderWidth = winOBorderWidth;
	}
	public double getWinHHeight() {
		return winHHeight;
	}
	public void setWinHHeight(double winHHeight) {
		this.winHHeight = winHHeight;
	}
	public double getWinBWidth() {
		return winBWidth;
	}
	public void setWinBWidth(double winBWidth) {
		this.winBWidth = winBWidth;
	}
	public double getWinBHeight() {
		return winBHeight;
	}
	public void setWinBHeight(double winBHeight) {
		this.winBHeight = winBHeight;
	}
	public double getIconWidth() {
		return iconWidth;
	}
	public void setIconWidth(double iconWidth) {
		this.iconWidth = iconWidth;
	}
	public double getIconHeight() {
		return iconHeight;
	}
	public void setIconHeight(double iconHeight) {
		this.iconHeight = iconHeight;
	}
	public double getIconBorderWidth() {
		return iconBorderWidth;
	}
	public void setIconBorderWidth(double iconBorderWidth) {
		this.iconBorderWidth = iconBorderWidth;
	}
	public String getIconBorderStyle() {
		return iconBorderStyle;
	}
	public void setIconBorderStyle(String iconBorderStyle) {
		this.iconBorderStyle = iconBorderStyle;
	}
	public String getIconBorderColor() {
		return iconBorderColor;
	}
	public void setIconBorderColor(String iconBorderColor) {
		this.iconBorderColor = iconBorderColor;
	}
	public double getWinBTop() {
		return winBTop;
	}
	public void setWinBTop(double winBTop) {
		this.winBTop = winBTop;
	}
	public double getWinMinWidth() {
		return winMinWidth;
	}
	public void setWinMinWidth(double winMinWidth) {
		this.winMinWidth = winMinWidth;
	}
	public double getWinMinHeight() {
		return winMinHeight;
	}
	public void setWinMinHeight(double winMinHeight) {
		this.winMinHeight = winMinHeight;
	}
	public double getIconBorderHeight() {
		return iconBorderHeight;
	}
	public void setIconBorderHeight(double iconBorderHeight) {
		this.iconBorderHeight = iconBorderHeight;
	}
	public double getIconTableTop() {
		return iconTableTop;
	}
	public void setIconTableTop(double iconTablePaddingTop) {
		this.iconTableTop = iconTablePaddingTop;
	}
	public double getIconTableLeft() {
		return iconTableLeft;
	}
	public void setIconTableLeft(double iconTableLeft) {
		this.iconTableLeft = iconTableLeft;
	}
	public String toString() {
		String tmpStr = "";
		tmpStr += "GUI ID: " + this.id + System.lineSeparator();
		tmpStr += "Theme Name: " + this.themeName + System.lineSeparator();
		tmpStr += "Icon Width: " + this.iconWidth + System.lineSeparator();
		tmpStr += "Icon Height: " + this.iconHeight + System.lineSeparator();
		tmpStr += "Icon Border Width: " + this.iconBorderWidth + System.lineSeparator();
		tmpStr += "Icon Border Style: " + this.iconBorderStyle + System.lineSeparator();
		tmpStr += "Icon Border Color: " + this.iconBorderColor + System.lineSeparator();
		tmpStr += "Icon Border Color: " + this.winBBorderWidth + System.lineSeparator();
		tmpStr += "Icon Table Top: " + this.iconTableTop + System.lineSeparator();
		tmpStr += "Icon Table Left: " + this.iconTableLeft + System.lineSeparator();
		tmpStr += "Win B Border Color: " + this.winBBorderColor + System.lineSeparator();
		tmpStr += "Win B Background Color: " + this.winBBgColor + System.lineSeparator();
		tmpStr += "Win O Background Color: " + this.winOBgColor + System.lineSeparator();
		tmpStr += "Win H Background Color: " + this.winHBgColor + System.lineSeparator();
		tmpStr += "Win O Default Left: " + this.winODefaultLeft + System.lineSeparator();
		tmpStr += "Win O Default Top: " + this.winODefaultTop + System.lineSeparator();
		tmpStr += "Win O Default Width: " + this.winODefaultWidth + System.lineSeparator();
		tmpStr += "Win O Default Height: " + this.winODefaultHeight + System.lineSeparator();
		tmpStr += "Win O Border Width: " + this.winOBorderWidth + System.lineSeparator();
		tmpStr += "Win H Height: " + this.winHHeight + System.lineSeparator();
		tmpStr += "Win B Width: " + this.winBWidth + System.lineSeparator();
		tmpStr += "Win B Height: " + this.winBHeight + System.lineSeparator();
		tmpStr += "Win B Top: " + this.winBTop + System.lineSeparator();
		tmpStr += "Win minimum width: " + this.winMinWidth + System.lineSeparator();
		tmpStr += "Win minimum Height: " + this.winMinHeight + System.lineSeparator();
		return tmpStr;
	}
}
