package system.jsfs;

import java.io.IOException;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import system.authentications.Authentication;
import system.models.User;
import system.xmls.XMLManager;

public class SystemJSF {
	protected int port;
	protected User user;
	protected Authentication auth;
	protected HttpSession session;
	protected ExternalContext externalContext;
	protected String contextPath;
	protected String contextURL;
	protected String[] viewArray;
	protected String view;
	protected ServletContext context;
	protected String serverName;
	protected String userFolder;
	protected XMLManager xm;
	final protected int IN = 0;
	final protected int OUT = 1;
	public SystemJSF() {
		this.externalContext = FacesContext.getCurrentInstance().getExternalContext();
		this.context = (ServletContext) this.externalContext.getContext();
		this.contextPath = this.externalContext.getApplicationContextPath();
		this.xm = new XMLManager(this.context.getRealPath(".")+"/WEB-INF/settings.xml","directory");
		this.xm.read();
		System.out.println(this.xm.getJSON());
		//set specific folders
		this.auth = new Authentication();
		this.session = (HttpSession) this.externalContext.getSession(true);
		this.viewArray = new String[2];
		if(null != this.session.getAttribute("User")) {
			this.user = (User) this.session.getAttribute("User");
			this.userFolder = this.context.getRealPath(".").replace(this.contextPath.substring(1), "");
			this.userFolder += "driver/home/" + this.user.getEmail();
		}
		String scheme = this.externalContext.getRequestScheme();
		this.serverName = this.externalContext.getRequestServerName();
		this.port = this.externalContext.getRequestServerPort();
		this.contextURL = scheme+"://"+this.serverName+":"+this.port+this.contextPath;
		this.externalContext.getApplicationMap().put("contextPath", this.contextPath);
	}
	public void redirect(int view){
		try {
			if(view == IN && null != this.user)
				this.externalContext.redirect(this.contextPath+"/system/comps/views/"+ this.viewArray[IN] +".jsf");
			else if(view == OUT && null == this.user)
				this.externalContext.redirect(this.contextPath+"/system/comps/views/"+ this.viewArray[OUT] +".jsf");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
