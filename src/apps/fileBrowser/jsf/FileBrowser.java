package apps.fileBrowser.jsf;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;
import javax.servlet.http.Part;

import org.json.JSONArray;

import apps.fileBrowser.module.FBManager;
import apps.jsf.ApplicationJSF;

@Named
@RequestScoped
public class FileBrowser extends ApplicationJSF{
	private FBManager fbm;
	private Part file;
	public FileBrowser() {
		this.fbm = new FBManager();
	}
	
	public void init(){
		this.redirect();
		String root = this.context.getRealPath(".").replace(this.contextPath.substring(1), "");
		root += "driver/home/" + this.user.getEmail();
		this.fbm.setRoot(root);
		this.fbm.setSession(this.session);
		String path = this.externalContext.getRequestParameterMap().get("path");
		if(null == path)
			this.fbm.newFB();
		else
			this.fbm.newFBFrom(path);
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
	public Part getFile() {
		return file;
	}
	public void setFile(Part file) {
		this.file = file;
	}
	public String getServerName() {
		return this.serverName;
	}
	public void setServerName(String serverName) {
		this.serverName = serverName;
	}
}
