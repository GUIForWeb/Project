package apps.theme.controllers;


import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import apps.Application;
import system.daoInterfaces.GUISettingDAO;
import system.daoInterfaces.GUIsInOSDAO;
import system.daoInterfaces.OSSettingDAO;
import system.daos.GUISettingDAOMySQL;
import system.daos.GUIsInOSDAOMySQL;
import system.daos.OSSettingDAOMySQL;
import system.models.GUISetting;

@Named
@RequestScoped
public class IconTheme extends Application{
	private String themeName;
	private double iconWidth;
	private double iconHeight;
	private double iconBorderWidth;
	private double iconBorderHeight;
	private String iconBorderColor;
	private GUISetting guiSetting;
	private GUISettingDAO guiSettingDAO;
	public IconTheme() {
		OSSettingDAO osSettingDAO = new OSSettingDAOMySQL(this.user);
		osSettingDAO.load();
		GUIsInOSDAO guisInOSDAO = new  GUIsInOSDAOMySQL(osSettingDAO.getOsSetting());
		guisInOSDAO.load();
		this.guiSettingDAO = new GUISettingDAOMySQL(guisInOSDAO.getGUIsInOS());
		this.guiSettingDAO.load();
		this.guiSetting = guiSettingDAO.getGUISetting();
	}
	public void start() {
		this.redirect();
		System.out.println(this.guiSetting);
		this.themeName = this.guiSetting.getThemeName();
		this.iconWidth = this.guiSetting.getIconWidth();
		this.iconHeight = this.guiSetting.getIconHeight();
		this.iconBorderWidth = this.guiSetting.getIconBorderWidth();
		this.iconBorderHeight = this.guiSetting.getIconBorderHeight();
		this.iconBorderColor = this.guiSetting.getIconBorderColor();
	}
	public String listen() {
		this.guiSetting.setThemeName(this.themeName);
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
