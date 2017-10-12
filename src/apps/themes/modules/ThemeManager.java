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
	private BgPathsDAO bgPathDAO;
	public ThemeManager(){
		
	}
	public void init(){
		OS osSetting = (OS)this.session.getAttribute("os");
		GUISettingsInOSDAO guisInOSDAO = new  GUISettingsInOSDAOMySQL(osSetting);
		guisInOSDAO.load();
		GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
		this.bgPathDAO = new BgPathsDAOMySQL();
		this.bgPathDAO.setGUIId(guisInOS.getGuiId());
	}
	public void empty(){
		bgPathDAO.setBgPath("NULL");
		this.bgPathDAO.update();
		this.json = new JSONObject();
		this.json.put("status", "updateBgImg");
	}
	public void setBgImg(String srcPath) {
		bgPathDAO.setBgPath(srcPath);
		bgPathDAO.update();
		this.json = new JSONObject();
		this.json.put("status", "updateBgImg");
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
