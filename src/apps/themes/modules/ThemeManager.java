package apps.themes.modules;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import system.daoInterfaces.BgPathsDAO;
import system.daoInterfaces.GUISettingsInOSDAO;
import system.daos.sqlites.BgPathsDAOSQLite;
import system.daos.sqlites.GUISettingsInOSDAOSQLite;
import system.models.GUIsInOS;
import system.models.OS;

public class ThemeManager {
	private HttpSession session;
	private JSONObject json;
	private BgPathsDAO bgPathDAO;
	public ThemeManager(){
		
	}
	public void init(){
		OS os = (OS)this.session.getAttribute("os");
		GUISettingsInOSDAO guisInOSDAO = new  GUISettingsInOSDAOSQLite(os);
		guisInOSDAO.load();
		GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
		this.bgPathDAO = new BgPathsDAOSQLite();
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
