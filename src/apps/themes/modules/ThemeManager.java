package apps.themes.modules;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import system.daoInterfaces.BgPathsDAO;
import system.daoInterfaces.GUISettingsInOSDAO;
import system.daos.BgPathsDAOMySQL;
import system.daos.GUISettingsInOSDAOMySQL;
import system.models.GUIsInOS;
import system.models.OS;

public class ThemeManager {
	private HttpSession session;
	private JSONObject json;
	public void setBgImg(String srcPath) {
		OS osSetting = (OS)this.session.getAttribute("os");
		GUISettingsInOSDAO guisInOSDAO = new  GUISettingsInOSDAOMySQL(osSetting);
		guisInOSDAO.load();
		GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
		BgPathsDAO bgPathDAO = new BgPathsDAOMySQL();
		bgPathDAO.setGUIId(guisInOS.getGuiId());
		bgPathDAO.setBgPath(srcPath);
		bgPathDAO.update();
		this.json = new JSONObject();
		this.json.put("status", "updateBgImg");
		/*
		try {
			this.externalContext.redirect(this.contextPath+"/system/comps/views/desktop.jsf");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		*/
	}
	public HttpSession getSession() {
		return session;
	}
	public void setSession(HttpSession session) {
		this.session = session;
	}
	public JSONObject getJson() {
		return json;
	}
	public void setJson(JSONObject json) {
		this.json = json;
	}
}
