package apps.theme.controller;



import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import apps.jsf.ApplicationJSF;
import system.dao.GUISettingsDAOMySQL;
import system.dao.GUISettingsInOSDAOMySQL;
import system.dao.OSsDAOMySQL;
import system.daoInterface.GUISettingsDAO;
import system.daoInterface.GUISettingsInOSDAO;
import system.daoInterface.OSsDAO;
import system.model.GUISetting;
import system.model.GUIsInOS;
import system.model.OS;

@Named
@RequestScoped
public class WindowTheme extends ApplicationJSF{
	private GUISettingsDAO guiSettingDAO;
	private GUISetting guiSetting;
	public WindowTheme() {
		OSsDAO osSettingDAO = new OSsDAOMySQL(this.user);
		osSettingDAO.load();
		OS osSetting = osSettingDAO.getOS();
		this.session.setAttribute("osSetting", osSetting);
		GUISettingsInOSDAO guisInOSDAO = new  GUISettingsInOSDAOMySQL(osSetting);
		guisInOSDAO.load();
		GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
		this.guiSettingDAO = new GUISettingsDAOMySQL(guisInOS);
		guiSettingDAO.load();
		this.guiSetting = this.guiSettingDAO.getGUISetting();
	}
	public void start() {
		this.redirect();
	}
	public String listen() {
		this.guiSettingDAO.setGUISetting(this.guiSetting);
		this.guiSettingDAO.updateWindow();
		return "";
	}
	public GUISetting getGuiSetting() {
		return guiSetting;
	}
	public void setGuiSetting(GUISetting guiSetting) {
		this.guiSetting = guiSetting;
	}
}
