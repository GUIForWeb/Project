package system.listeners;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.json.JSONArray;
import org.json.JSONObject;

import system.paths.Path;
import system.paths.PathManager;
import system.xmls.XMLManager;

public class Init implements ServletContextListener {
	private PathManager pm;
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		Path.newInstance();
		Path.appDir = arg0.getServletContext().getRealPath(".");
		this.pm = new PathManager();
	}
}
