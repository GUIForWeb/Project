package system.controllers;

import java.io.IOException;

import javax.enterprise.context.RequestScoped;
import javax.faces.context.FacesContext;
import javax.inject.Named;

import system.authentication.Authentication;
import system.controllers.Controller;
import system.models.User;

@Named
@RequestScoped
public class Login extends Controller {
	public Login(){
		this.viewArray[IN] = "background";
        this.viewArray[OUT] = "login";
		this.auth.setAuthSeqArray(new Integer[]{
				Authentication.EMPTY,
	    		Authentication.EXCEPTION_TO_ACCEPT,
	    		Authentication.AUTHRULE,
	    		Authentication.PROCEDURE	
			});
		this.auth.getProcedureMap().put("UserDAOMySQL", "login");
	}
	public String login(){
		this.auth.start();
		if(this.auth.getAuthErrorList().size() == 0) {
			this.user = (User) this.session.getAttribute("User");
			if(this.user.isActivation()) {
				String uri = "background.jsf";
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
