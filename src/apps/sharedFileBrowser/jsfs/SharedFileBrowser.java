package apps.sharedFileBrowser.jsfs;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;
import javax.servlet.http.HttpSession;

import apps.jsfs.ApplicationJSF;
import apps.sharedFileBrowser.modules.SFBManager;

@Named
@RequestScoped
public class SharedFileBrowser extends ApplicationJSF {
	private SFBManager sfbm;
	public SharedFileBrowser() {
		this.sfbm = new SFBManager();
	}
	public void init(){
		this.redirect();
		this.sfbm.setUser(this.user);
		this.sfbm.loadSharedFolders();
		/*
		String path = this.externalContext.getRequestParameterMap().get("path");
		if(null == path)
			this.fbm.newFB();
		else
			this.fbm.newFBFrom(path);
		*/
	}
}
