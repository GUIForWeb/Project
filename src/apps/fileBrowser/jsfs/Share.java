package apps.fileBrowser.jsfs;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import org.json.JSONObject;

import apps.jsfs.ApplicationJSF;
@Named
@RequestScoped
public class Share extends ApplicationJSF {
	private String folder;
	public Share() {
	}
	public void init() {
		this.redirect();
		JSONObject json = (JSONObject) this.session.getAttribute("clipboard");
		this.folder = json.getString("path") + System.getProperty("file.separator") + json.getJSONArray("data").getJSONObject(0).getString("name");
	}
	public String getFolder() {
		return folder;
	}
	public void setFolder(String folder) {
		this.folder = folder;
	}
}
