package system.jsfs;

import javax.faces.context.ExternalContext;
import javax.servlet.ServletContext;

import org.json.JSONObject;

public class SystemProp {
	public static JSONObject dirs;
	public SystemProp() {
		
	}
	private static SystemProp instance;
	public static SystemProp newInstance() {
		if(null == instance) {
			instance = new SystemProp();
		}
		return instance;
	}
}
