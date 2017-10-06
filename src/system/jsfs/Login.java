package system.jsfs;

import java.io.IOException;

import javax.enterprise.context.RequestScoped;
import javax.faces.context.FacesContext;
import javax.inject.Named;

import system.authentications.Authentication;
import system.jsfs.SystemJSF;
import system.models.User;

@Named
@RequestScoped
public class Login extends SystemJSF {
	public Login(){
		this.viewArray[IN] = "desktop";
        this.viewArray[OUT] = "login";
		this.auth.setAuthSeqArray(new Integer[]{
				Authentication.EMPTY,
	    		Authentication.EXCEPTION_TO_ACCEPT,
	    		Authentication.AUTHRULE,
	    		Authentication.PROCEDURE	
			});
		this.auth.getProcedureMap().put("UsersDAOMySQL", "login");
	}
	public String login(){
		this.redirect(IN);
		this.auth.start();
		if(this.auth.getAuthErrorList().size() == 0) {
			this.user = (User) this.session.getAttribute("User");
			if(this.user.isActivation()) {
				String uri = "desktop.jsf";
				try {
					 FacesContext.getCurrentInstance().getExternalContext().redirect(uri);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			else {
				this.session.removeAttribute("User");
				this.auth.display("etc", "No Activation");
			}
		}
		return "";
	}
}
