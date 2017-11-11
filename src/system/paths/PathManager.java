package system.paths;

import org.json.JSONArray;
import org.json.JSONObject;

import system.xmls.XMLManager;

public class PathManager {
	private XMLManager xm;
	public PathManager() {
		Path.serverXMLFile = Path.appDir+"/WEB-INF/settings.xml";
		this.xm = new XMLManager(Path.serverXMLFile,"directory");
		this.xm.read();
		JSONArray xmlJArr = this.xm.getJSON().getJSONArray("directory");
		JSONObject tmpJSON;
		for(int ji=0; ji<xmlJArr.length(); ji++) {
			tmpJSON = xmlJArr.getJSONObject(ji);
			if(tmpJSON.getString("name").equals("serverDir"))
				Path.serverDir = tmpJSON.getString("textContent");
			else if(tmpJSON.getString("name").equals("storageDir"))
				Path.storageDir = tmpJSON.getString("textContent");
			else if(tmpJSON.getString("name").equals("sqliteFile"))
				Path.sqliteFile = tmpJSON.getString("textContent");
		}
	}
}
