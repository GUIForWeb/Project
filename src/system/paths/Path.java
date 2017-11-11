package system.paths;

import javax.faces.context.ExternalContext;
import javax.servlet.ServletContext;

import org.json.JSONObject;

public class Path {
	//public static String ;
	public static String appDir;
	public static String serverXMLFile;
	public static String storageDir;
	public static String serverDir;
	public static String sqliteFile;
	public Path() {
	}
	private static Path instance;
	public static Path newInstance() {
		if(null == instance) {
			instance = new Path();
		}
		return instance;
	}
}
