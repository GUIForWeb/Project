package apps.jsfs;

import java.io.IOException;

import system.jsfs.SystemJSF;
public class ApplicationJSF extends SystemJSF{
	protected String importLib;
	public ApplicationJSF() {
		super();
	}
	public void redirect(){
		if(null == this.user)
			try {
				this.externalContext.redirect(this.contextPath+"/system/comps/views/logout.jsf");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	public String getContextPath() {
		return contextPath;
	}

	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}
}





