package apps.theme.controllers;



import javax.inject.Named;

import apps.Application;
import system.daoInterfaces.GUISettingDAO;
import system.daoInterfaces.GUIsInOSDAO;
import system.daoInterfaces.OSSettingDAO;
import system.daos.GUISettingDAOMySQL;
import system.daos.GUIsInOSDAOMySQL;
import system.daos.OSSettingDAOMySQL;
import system.models.GUISetting;
import system.models.GUIsInOS;
import system.models.OSSetting;

@Named
public class WindowTheme extends Application{
	private GUISettingDAO guiSettingDAO;
	private GUISetting guiSetting;
	public WindowTheme() {
		OSSettingDAO osSettingDAO = new OSSettingDAOMySQL(this.user);
		osSettingDAO.load();
		OSSetting osSetting = osSettingDAO.getOsSetting();
		this.session.setAttribute("osSetting", osSetting);
		GUIsInOSDAO guisInOSDAO = new  GUIsInOSDAOMySQL(osSetting);
		guisInOSDAO.load();
		GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
		this.guiSettingDAO = new GUISettingDAOMySQL(guisInOS);
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
