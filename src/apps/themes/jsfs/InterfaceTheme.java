package apps.themes.jsfs;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import apps.jsfs.ApplicationJSF;
import system.daoInterfaces.GUISettingsDAO;
import system.daoInterfaces.GUISettingsInOSDAO;
import system.daos.sqlites.GUISettingsDAOSQLite;
import system.daos.sqlites.GUISettingsInOSDAOSQLite;
import system.models.GUISetting;
import system.models.GUIsInOS;
import system.models.OS;

@Named
@RequestScoped
public class InterfaceTheme extends ApplicationJSF{
	private GUISettingsDAO guiSettingDAO;
	private GUISetting guiSetting;
	public InterfaceTheme() {
		super();
		OS os = (OS)this.session.getAttribute("os");
		GUISettingsInOSDAO guisInOSDAO = new  GUISettingsInOSDAOSQLite(os);
		guisInOSDAO.load();
		GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
		this.guiSettingDAO = new GUISettingsDAOSQLite(guisInOS);
		this.guiSettingDAO.load();
		this.guiSetting = this.guiSettingDAO.getGUISetting();
	}
	public void start() {
		this.redirect();
	}
	public String submit() {
		this.guiSettingDAO.setGUISetting(this.guiSetting);
		this.guiSettingDAO.updateInteface();
		return "";
	}
	public GUISetting getGuiSetting() {
		return guiSetting;
	}
	public void setGuiSetting(GUISetting guiSetting) {
		this.guiSetting = guiSetting;
	}
}
