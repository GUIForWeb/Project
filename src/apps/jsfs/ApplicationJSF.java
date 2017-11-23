package apps.jsfs;

import java.io.IOException;

import javax.enterprise.context.RequestScoped;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import system.jsfs.SystemJSF;
import system.models.User;
public class ApplicationJSF extends SystemJSF{
	protected String importLib;
	public ApplicationJSF() {
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





