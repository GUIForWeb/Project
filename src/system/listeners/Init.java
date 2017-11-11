package system.listeners;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.json.JSONArray;
import org.json.JSONObject;

import system.jsfs.SystemProp;
import system.xmls.XMLManager;

public class Init implements ServletContextListener {
	private XMLManager xm;
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		SystemProp.newInstance();
		this.xm = new XMLManager(arg0.getServletContext().getRealPath(".")+"/WEB-INF/settings.xml","directory");
		this.xm.read();
		SystemProp.dirs = new JSONObject();
		JSONArray xmlJArr = this.xm.getJSON().getJSONArray("directory");
		JSONObject tmpJSON;
		for(int ji=0; ji<xmlJArr.length(); ji++) {
			tmpJSON = xmlJArr.getJSONObject(ji);
			SystemProp.dirs.put(tmpJSON.getString("name"), tmpJSON.getString("textContent"));
		}
	}
}
