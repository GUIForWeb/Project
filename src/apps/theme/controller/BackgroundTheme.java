package apps.theme.controller;
import java.io.IOException;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import apps.jsf.ApplicationJSF;
import system.dao.BgPathsDAOMySQL;
import system.dao.GUISettingsInOSDAOMySQL;
import system.daoInterface.BgPathsDAO;
import system.daoInterface.GUISettingsInOSDAO;
import system.model.GUIsInOS;
import system.model.OS;

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
