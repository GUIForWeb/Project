package apps.theme.controllers;
import java.io.IOException;

import javax.inject.Named;

import apps.Application;
import system.daoInterfaces.BgPathDAO;
import system.daoInterfaces.GUIsInOSDAO;
import system.daos.BgPathDAOMySQL;
import system.daos.GUIsInOSDAOMySQL;
import system.models.GUIsInOS;
import system.models.OSSetting;

@Named
public class BackgroundTheme extends Application{
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
		
		OSSetting osSetting = (OSSetting)this.session.getAttribute("osSetting");
		GUIsInOSDAO guisInOSDAO = new  GUIsInOSDAOMySQL(osSetting);
		guisInOSDAO.load();
		GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
		BgPathDAO bgPathDAO = new BgPathDAOMySQL();
		bgPathDAO.setGUIId(guisInOS.getGuiId());
		bgPathDAO.setBgPath(srcPath);
		bgPathDAO.update();
		
		try {
			this.externalContext.redirect(this.contextPath+"/view/background.jsf");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
