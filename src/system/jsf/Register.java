package system.jsf;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import system.authentication.Authentication;
import system.jsf.System;

@Named
@RequestScoped
public class Register extends System {
	public Register() {
		this.viewArray[IN] = "background";
		this.viewArray[OUT] = "register";
		this.auth.setAuthSeqArray(new Integer[]{
			Authentication.EMPTY,
    		Authentication.EXCEPTION_TO_DENY,
    		Authentication.AUTHRULE,
    		Authentication.PROCEDURE	
		});
		this.auth.getProcedureMap().put("UserDAOMySQL", "register");
	}
	public String register(){
		this.redirect(IN);
		String str = "register";
		this.auth.start();
		if(this.auth.getAuthErrorList().size() == 0) {
			this.auth.display("etc", "Registered!");
		}
		return str;
	}
}