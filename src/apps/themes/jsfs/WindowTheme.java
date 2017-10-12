package apps.themes.jsfs;



import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import apps.jsfs.ApplicationJSF;
import system.daoInterfaces.GUISettingsDAO;
import system.daoInterfaces.GUISettingsInOSDAO;
import system.daoInterfaces.OSsDAO;
import system.daos.GUISettingsDAOMySQL;
import system.daos.GUISettingsInOSDAOMySQL;
import system.daos.OSsDAOMySQL;
import system.models.GUISetting;
import system.models.GUIsInOS;
import system.models.OS;

@Named
@RequestScoped
public class WindowTheme extends ApplicationJSF{
	private GUISettingsDAO guiSettingDAO;
	private GUISetting guiSetting;
	public WindowTheme() {
		super();
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
