package apps.theme.controller;
import java.io.IOException;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import apps.Application;
import system.dao.BgPathDAOMySQL;
import system.dao.GUIsInOSDAOMySQL;
import system.daoInterface.BgPathDAO;
import system.daoInterface.GUIsInOSDAO;
import system.model.GUIsInOS;
import system.model.OSSetting;

@Named
@RequestScoped
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
			this.externalContext.redirect(this.contextPath+"/system/comps/views/background.jsf");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
