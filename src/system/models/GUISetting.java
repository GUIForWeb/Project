package system.models;

public class GUISetting{
	private int id;
	private String themeName;
	private double iconWidth;
	private double iconHeight;
	private double iconBorderWidth;
	private double iconBorderHeight;
	private double iconTableLeft;
	private double iconTableTop;
	private String iconBorderColor;
	private String iconBorderStyle;
	private double winMinWidth;
	private double winMinHeight;
	private double winODefaultLeft;
	private double winODefaultTop;
	private double winODefaultWidth;
	private double winODefaultHeight;
	private double winOBorderWidth;
	private String winOBgColor;
	private double winHHeight;
	private String winHBgColor;
	private String winHFontFamily;
	private String winCBgColor;
	private double winBWidth;
	private double winBHeight;
	private double winBTop;
	private double winBBorderWidth;
	private String winBBorderColor;
	private String winBBgColor;
	private double barOWidth;
	private double barOHeight;
	private double barOBorderWidth;
	private String barOBgColor;
	private String barNBgColor;
	private double tbarOBorderWidth;
	private double tbarOOpacity;
	private String tbarOBgColor;
	private double cmenuOWidth;
	private double cmenuOHeight;
	private double cmenuOFontSize;
	private double cmenuOBorderRadius;
	private String cmenuOBgColor;
	private String cmenuOFontFamily;
	private double cmenuLHeight;
	private double cmenuLBorderRadiusHover;
	private String cmenuLColor;
	private String cmenuLBgColorHover;
	private String cmenuLColorHover;
	private double tmenuOWidth;
	private double tmenuOFontSize;
	private String tmenuOBgColor;
	private String tmenuOFontFamily;
	private double tmenuLHeight;
	private String tmenuLColor;
	private double tmenuLBorderRadiusHover;
	private String tmenuLColorHover;
	private String tmenuLBgColorHover;
	public GUISetting(){
	}
	public void forMobileMode() {
		this.iconWidth *= 2;
		this.iconHeight *= 2;
		this.iconBorderWidth *= 2;
		this.iconBorderHeight *= 2;
		this.iconTableLeft *= 2;
		this.iconTableTop *= 2;
		this.winMinWidth *= 2;
		this.winMinHeight *= 2;
		this.winODefaultLeft *= 2;
		this.winODefaultTop *= 2;
		this.winODefaultWidth *= 2;
		this.winODefaultHeight *= 2;
		this.winOBorderWidth *= 2;
		this.winHHeight *= 2;
		this.winBWidth *= 2;
		this.winBHeight *= 2;
		this.winBTop *= 2;
		this.winBBorderWidth *= 2;
		this.barOWidth *= 2;
		this.barOHeight *= 2;
		this.barOBorderWidth *= 2;
		this.tbarOBorderWidth *= 2;
		this.tbarOOpacity *= 2;
		this.cmenuOWidth *= 2;
		this.cmenuOHeight *= 2;
		this.cmenuOFontSize *= 2;
		this.cmenuOBorderRadius *= 2;
		this.cmenuLHeight *= 2;
		this.cmenuLBorderRadiusHover *= 2;
		this.tmenuOWidth *= 2;
		this.tmenuOFontSize *= 2;
		this.tmenuLHeight *= 2;
		this.tmenuLBorderRadiusHover *= 2;
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
	public String getWinCBgColor() {
		return winCBgColor;
	}
	public void setWinCBgColor(String winCBgColor) {
		this.winCBgColor = winCBgColor;
	}
	public String getWinHFontFamily() {
		return winHFontFamily;
	}
	public void setWinHFontFamily(String winMFontFamily) {
		this.winHFontFamily = winMFontFamily;
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
	public String getBarOBgColor() {
		return barOBgColor;
	}
	public void setBarOBgColor(String barOBgColor) {
		this.barOBgColor = barOBgColor;
	}
	public String getBarNBgColor() {
		return barNBgColor;
	}
	public void setBarNBgColor(String barNBgColor) {
		this.barNBgColor = barNBgColor;
	}
	public String getTbarOBgColor() {
		return tbarOBgColor;
	}
	public void setTbarOBgColor(String tbarOBgColor) {
		this.tbarOBgColor = tbarOBgColor;
	}
	public double getTbarOOpacity() {
		return tbarOOpacity;
	}
	public void setTbarOOpacity(double tbarOOpacity) {
		this.tbarOOpacity = tbarOOpacity;
	}
	public String getCmenuOFontFamily() {
		return cmenuOFontFamily;
	}
	public void setCmenuOFontFamily(String cmenuOFontFamily) {
		this.cmenuOFontFamily = cmenuOFontFamily;
	}
	public String getCmenuLBgColorHover() {
		return cmenuLBgColorHover;
	}
	public void setCmenuLBgColorHover(String cmenuLBgColorHover) {
		this.cmenuLBgColorHover = cmenuLBgColorHover;
	}
	public String getCmenuLColorHover() {
		return cmenuLColorHover;
	}
	public void setCmenuOColorHover(String cmenuLColorHover) {
		this.cmenuLColorHover = cmenuLColorHover;
	}
	public double getCmenuOBorderRadius() {
		return cmenuOBorderRadius;
	}
	public void setCmenuOBorderRadius(double cmenuOBorderRadius) {
		this.cmenuOBorderRadius = cmenuOBorderRadius;
	}
	public double getCmenuLBorderRadiusHover() {
		return cmenuLBorderRadiusHover;
	}
	public void setCmenuLBorderRadiusHover(double cmenuLBorderRadiusHover) {
		this.cmenuLBorderRadiusHover = cmenuLBorderRadiusHover;
	}
	public double getBarOWidth() {
		return barOWidth;
	}
	public void setBarOWidth(double barOWidth) {
		this.barOWidth = barOWidth;
	}
	public double getBarOHeight() {
		return barOHeight;
	}
	public void setBarOHeight(double barOHeight) {
		this.barOHeight = barOHeight;
	}
	public double getBarOBorderWidth() {
		return barOBorderWidth;
	}
	public void setBarOBorderWidth(double barOBorderWidth) {
		this.barOBorderWidth = barOBorderWidth;
	}
	public double getTbarOBorderWidth() {
		return tbarOBorderWidth;
	}
	public void setTbarOBorderWidth(double tbarOBorderWidth) {
		this.tbarOBorderWidth = tbarOBorderWidth;
	}
	public void setCmenuLColorHover(String cmenuLColorHover) {
		this.cmenuLColorHover = cmenuLColorHover;
	}
	public String getCmenuLColor() {
		return cmenuLColor;
	}
	public void setCmenuLColor(String cmenuLColor) {
		this.cmenuLColor = cmenuLColor;
	}
	public String getCmenuOBgColor() {
		return cmenuOBgColor;
	}
	public void setCmenuOBgColor(String cmenuOBgColor) {
		this.cmenuOBgColor = cmenuOBgColor;
	}
	public double getCmenuOWidth() {
		return cmenuOWidth;
	}
	public void setCmenuOWidth(double cmenuOWidth) {
		this.cmenuOWidth = cmenuOWidth;
	}
	public double getCmenuOHeight() {
		return cmenuOHeight;
	}
	public void setCmenuOHeight(double cmenuOHeight) {
		this.cmenuOHeight = cmenuOHeight;
	}
	public double getCmenuLHeight() {
		return cmenuLHeight;
	}
	public void setCmenuLHeight(double cmenuLHeight) {
		this.cmenuLHeight = cmenuLHeight;
	}
	public double getCmenuOFontSize() {
		return cmenuOFontSize;
	}
	public void setCmenuOFontSize(double cmenuOFontSize) {
		this.cmenuOFontSize = cmenuOFontSize;
	}
	public double getTmenuOWidth() {
		return tmenuOWidth;
	}
	public void setTmenuOWidth(double tmenuOWidth) {
		this.tmenuOWidth = tmenuOWidth;
	}
	public double getTmenuLHeight() {
		return tmenuLHeight;
	}
	public void setTmenuLHeight(double tmenuLHeight) {
		this.tmenuLHeight = tmenuLHeight;
	}
	public double getTmenuOFontSize() {
		return tmenuOFontSize;
	}
	public void setTmenuOFontSize(double tmenuOFontSize) {
		this.tmenuOFontSize = tmenuOFontSize;
	}
	public String getTmenuOBgColor() {
		return tmenuOBgColor;
	}
	public void setTmenuOBgColor(String tmenuOBgColor) {
		this.tmenuOBgColor = tmenuOBgColor;
	}
	public String getTmenuLColor() {
		return tmenuLColor;
	}
	public void setTmenuLColor(String tmenuLColor) {
		this.tmenuLColor = tmenuLColor;
	}
	public String getTmenuLBgColorHover() {
		return tmenuLBgColorHover;
	}
	public void setTmenuLBgColorHover(String tmenuLBgColorHover) {
		this.tmenuLBgColorHover = tmenuLBgColorHover;
	}
	public String getTmenuLColorHover() {
		return tmenuLColorHover;
	}
	public void setTmenuLColorHover(String tmenuLColorHover) {
		this.tmenuLColorHover = tmenuLColorHover;
	}
	public double getTmenuLBorderRadiusHover() {
		return tmenuLBorderRadiusHover;
	}
	public void setTmenuLBorderRadiusHover(double tmenuLBorderRadiusHover) {
		this.tmenuLBorderRadiusHover = tmenuLBorderRadiusHover;
	}
	public String getTmenuOFontFamily() {
		return tmenuOFontFamily;
	}
	public void setTmenuOFontFamily(String tmenuOFontFamily) {
		this.tmenuOFontFamily = tmenuOFontFamily;
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
		tmpStr += "Win B Bg Color: " + this.winBBgColor + System.lineSeparator();
		tmpStr += "Win O Bg Color: " + this.winOBgColor + System.lineSeparator();
		tmpStr += "Win H Bg Color: " + this.winHBgColor + System.lineSeparator();
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
		tmpStr += "Win C Bg Color: " + this.winCBgColor + System.lineSeparator();
		tmpStr += "Win M Font Family: " + this.winHFontFamily + System.lineSeparator();
		tmpStr += "Bar O Bg Color: " + this.barOBgColor + System.lineSeparator();
		tmpStr += "Bar O Width: " + this.barOWidth + System.lineSeparator();
		tmpStr += "Bar O Height: " + this.barOHeight + System.lineSeparator();
		tmpStr += "Bar O Border Width: " + this.barOBorderWidth + System.lineSeparator();
		tmpStr += "Bar N Bg Color: " + this.barNBgColor + System.lineSeparator();
		tmpStr += "TBar O Bg Color: " + this.tbarOBgColor + System.lineSeparator();
		tmpStr += "TBar O Opacity: " + this.tbarOOpacity + System.lineSeparator();
		tmpStr += "TBar O Border Width: " + this.tbarOBorderWidth + System.lineSeparator();
		tmpStr += "CMenu C Bg Color Hover: " + this.cmenuLBgColorHover + System.lineSeparator();
		tmpStr += "CMenu C Color: " + this.cmenuLColor + System.lineSeparator();
		tmpStr += "CMenu C Color Hover: " + this.cmenuLColorHover + System.lineSeparator();
		tmpStr += "CMenu O Font Family: " + this.cmenuOFontFamily + System.lineSeparator();
		tmpStr += "CMenu O Border Radius: " + this.cmenuOBorderRadius + System.lineSeparator();
		tmpStr += "CMenu O bg Color: " + this.cmenuOBgColor + System.lineSeparator();
		tmpStr += "CMenu C Border Radius Hover: " + this.cmenuLBorderRadiusHover + System.lineSeparator();
		tmpStr += "CMenu O Width: " + this.cmenuOWidth + System.lineSeparator();
		tmpStr += "CMenu O Height: " + this.cmenuOHeight + System.lineSeparator();
		tmpStr += "CMenu L Height: " + this.cmenuLHeight + System.lineSeparator();
		tmpStr += "CMenu Font Size: " + this.cmenuOFontSize +"%"+ System.lineSeparator();
		tmpStr += "TMenu O Width: " + this.tmenuOWidth + System.lineSeparator();
		tmpStr += "TMenu L Height: " + this.tmenuLHeight + System.lineSeparator();
		tmpStr += "TMenu Font Size: " + this.tmenuOFontSize +"%"+System.lineSeparator();
		tmpStr += "TMenu O Bg Color: " + this.tmenuOBgColor +System.lineSeparator();
		tmpStr += "TMenu O Font Family: " + this.tmenuOFontFamily +System.lineSeparator();
		tmpStr += "TMenu L Color: " + this.tmenuLColor +"%"+System.lineSeparator();
		tmpStr += "TMenu L Bg Color Hover: " + this.tmenuLBgColorHover + System.lineSeparator();
		tmpStr += "TMenu L Color Hover: " + this.tmenuLColorHover + System.lineSeparator();
		tmpStr += "TMenu L Border Radius Hover: " + this.tmenuLBorderRadiusHover + System.lineSeparator();
		return tmpStr;
	}
}
