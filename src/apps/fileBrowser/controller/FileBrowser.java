package apps.fileBrowser.controller;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;
import javax.servlet.http.Part;

import org.json.JSONArray;

import apps.Application;
import apps.fileBrowser.module.FBManager;

@Named
@RequestScoped
public class FileBrowser extends Application{
	private FBManager fbm;
	private Part file;
	public FileBrowser() {
		this.fbm = new FBManager();
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
	public void upload(){
		System.out.println("upload");
	}
	public JSONArray getDataItemArray() {
		return this.fbm.getDataItemArray();
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
