package apps;

import java.io.IOException;
import java.util.Map;

import javax.faces.annotation.RequestMap;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import system.model.User;

public class Application {
	protected User user;
	protected HttpSession session;
	protected ExternalContext externalContext;
	protected String contextPath;
	protected String[] viewArray;
	protected String view;
	protected ServletContext context; 
	final protected int IN = 0;
	final protected int OUT = 1;
	public Application() {
		this.externalContext = FacesContext.getCurrentInstance().getExternalContext();
		this.session = (HttpSession) this.externalContext.getSession(true);
		this.viewArray = new String[2];
		if(null != this.session.getAttribute("User")) {
			this.user = (User) this.session.getAttribute("User");
		}
		this.contextPath = this.externalContext.getApplicationContextPath();
		this.context = (ServletContext) this.externalContext.getContext();
		this.externalContext.getApplicationMap().put("contextPath",this.contextPath);
	}
	
	public void redirect(){
		if(null == this.user)
			try {
				this.externalContext.redirect(this.contextPath+"/view/logout.jsf");
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





