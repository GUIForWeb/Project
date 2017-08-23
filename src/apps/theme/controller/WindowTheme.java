package apps.theme.controller;



import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import apps.Application;
import system.dao.GUISettingDAOMySQL;
import system.dao.GUIsInOSDAOMySQL;
import system.dao.OSSettingDAOMySQL;
import system.daoInterface.GUISettingDAO;
import system.daoInterface.GUIsInOSDAO;
import system.daoInterface.OSSettingDAO;
import system.model.GUISetting;
import system.model.GUIsInOS;
import system.model.OSSetting;

@Named
@RequestScoped
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
