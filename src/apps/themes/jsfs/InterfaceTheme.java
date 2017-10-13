package apps.themes.jsfs;



import java.io.IOException;

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
public class InterfaceTheme extends ApplicationJSF{
	private GUISettingsDAO guiSettingDAO;
	private GUISetting guiSetting;
	public InterfaceTheme() {
		super();
		OS os = (OS)this.session.getAttribute("os");
		GUISettingsInOSDAO guisInOSDAO = new  GUISettingsInOSDAOMySQL(os);
		guisInOSDAO.load();
		GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
		this.guiSettingDAO = new GUISettingsDAOMySQL(guisInOS);
		this.guiSettingDAO.load();
		this.guiSetting = this.guiSettingDAO.getGUISetting();
	}
	public void start() {
		this.redirect();
	}
	public String submit() {
		this.guiSettingDAO.setGUISetting(this.guiSetting);
		this.guiSettingDAO.updateWindow();
		try {
			this.externalContext.redirect(this.contextPath+"/system/comps/views/desktop.jsf");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}
	public GUISetting getGuiSetting() {
		return guiSetting;
	}
	public void setGuiSetting(GUISetting guiSetting) {
		this.guiSetting = guiSetting;
	}
}
