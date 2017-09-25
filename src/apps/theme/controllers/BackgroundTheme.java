package apps.theme.controllers;
import java.io.IOException;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import apps.jsfs.ApplicationJSF;
import system.daoInterfaces.BgPathsDAO;
import system.daoInterfaces.GUISettingsInOSDAO;
import system.daos.BgPathsDAOMySQL;
import system.daos.GUISettingsInOSDAOMySQL;
import system.models.GUIsInOS;
import system.models.OS;

@Named
@RequestScoped
public class BackgroundTheme extends ApplicationJSF{
	public BackgroundTheme() {
		
	}
	public void start() {
		this.redirect();
	}
	
	public String listen() {
		String srcPath = (String) this.session.getAttribute("fbOption");
		if(null != srcPath) {
			this.session.removeAttribute("fbOption");
			srcPath = srcPath.substring(1);
		}
		
		OS osSetting = (OS)this.session.getAttribute("osSetting");
		GUISettingsInOSDAO guisInOSDAO = new  GUISettingsInOSDAOMySQL(osSetting);
		guisInOSDAO.load();
		GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
		BgPathsDAO bgPathDAO = new BgPathsDAOMySQL();
		bgPathDAO.setGUIId(guisInOS.getGuiId());
		bgPathDAO.setBgPath(srcPath);
		bgPathDAO.update();
		
		try {
			this.externalContext.redirect(this.contextPath+"/system/comps/views/background.jsf");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
