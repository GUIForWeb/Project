package apps.fileBrowser.jsfs;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;
import javax.servlet.http.Part;

import org.json.JSONArray;

import apps.fileBrowser.modules.FBManager;
import apps.jsfs.ApplicationJSF;

@Named
@RequestScoped
public class FileBrowser extends ApplicationJSF{
	private FBManager fbm;
	public FileBrowser() {
		this.fbm = new FBManager();
	}
	public void init(){
		this.redirect();
		this.fbm.setSession(this.session);
		this.fbm.loadRoot();
		String path = this.externalContext.getRequestParameterMap().get("path");
		if(null == path)
			this.fbm.newFB();
		else
			this.fbm.newFBFrom(path);
	}
	public void initShare() {
		this.redirect();
		this.fbm.setSession(this.session);
		this.fbm.setUser(this.user);
		this.fbm.loadRoot();
		this.fbm.loadSharedFolders();
		this.fbm.newSFB();
	}
	public JSONArray getDataItemArray() {
		return this.fbm.getJSONArray();
	}
	public void setDataItemArray(JSONArray dataItemArray) {
		this.fbm.setDataItemArray(dataItemArray);
	}
	public int getId() {
		return this.fbm.getId();
	}
	public void setId(int id) {
		this.fbm.setId(id);
	}
	public String getServerName() {
		return this.serverName;
	}
	public void setServerName(String serverName) {
		this.serverName = serverName;
	}
}
