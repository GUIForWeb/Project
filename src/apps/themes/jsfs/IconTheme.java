package apps.themes.jsfs;


import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import apps.jsfs.ApplicationJSF;
import system.daoInterfaces.GUISettingsDAO;
import system.daoInterfaces.GUISettingsInOSDAO;
import system.daoInterfaces.OSsDAO;
import system.daos.sqlites.GUISettingsDAOSQLite;
import system.daos.sqlites.GUISettingsInOSDAOSQLite;
import system.daos.sqlites.OSsDAOSQLite;
import system.models.GUISetting;

@Named
@RequestScoped
public class IconTheme extends ApplicationJSF{
	private String themeName;
	private double iconWidth;
	private double iconHeight;
	private double iconBorderWidth;
	private double iconBorderHeight;
	private String iconBorderColor;
	private GUISetting guiSetting;
	private GUISettingsDAO guiSettingDAO;
	public IconTheme() {
		super();
		OSsDAO osSettingDAO = new OSsDAOSQLite(this.user);
		osSettingDAO.load();
		GUISettingsInOSDAO gioDAO = new  GUISettingsInOSDAOSQLite(osSettingDAO.getOS());
		gioDAO.load();
		this.guiSettingDAO = new GUISettingsDAOSQLite(gioDAO.getGUISettingsInOS());
		this.guiSettingDAO.load();
		this.guiSetting = guiSettingDAO.getGUISetting();
	}
	public void start() {
		this.redirect();
		this.themeName = this.guiSetting.getThemeName();
		this.iconWidth = this.guiSetting.getIconWidth();
		this.iconHeight = this.guiSetting.getIconHeight();
		this.iconBorderWidth = this.guiSetting.getIconBorderWidth();
		this.iconBorderHeight = this.guiSetting.getIconBorderHeight();
		this.iconBorderColor = this.guiSetting.getIconBorderColor();
	}
	public String submit() {
		this.guiSetting.setThemeName(this.guiSetting.getThemeName());
		this.guiSetting.setIconWidth(this.iconWidth);
		this.guiSetting.setIconHeight(this.iconHeight);
		this.guiSetting.setIconBorderWidth(this.iconBorderWidth);
		this.guiSetting.setIconBorderHeight(this.iconBorderHeight);
		this.guiSetting.setIconBorderColor(this.iconBorderColor);
		this.guiSettingDAO.setGUISetting(this.guiSetting);
		this.guiSettingDAO.updateIcon();
		return "";
	}
	public String getThemeName() {
		return themeName;
	}
	public void setThemeName(String themeName) {
		this.themeName = themeName;
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
	public double getIconBorderHeight() {
		return iconBorderHeight;
	}
	public void setIconBorderHeight(double iconBorderHeight) {
		this.iconBorderHeight = iconBorderHeight;
	}
	public String getIconBorderColor() {
		return iconBorderColor;
	}
	public void setIconBorderColor(String iconBorderColor) {
		this.iconBorderColor = iconBorderColor;
	}
}
