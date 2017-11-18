package system.jsfs;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import system.authentications.Authentication;
import system.jsfs.SystemJSF;

@Named
@RequestScoped
public class Register extends SystemJSF {
	public Register() {
		this.viewArray[IN] = "desktop";
		this.viewArray[OUT] = "register";
		this.auth.setAuthSeqArray(new Integer[]{
			Authentication.EMPTY,
    		Authentication.EXCEPTION_TO_DENY,
    		Authentication.AUTHRULE,
    		Authentication.DB_AUTH	
		});
		this.auth.setDaos("system.daos.sqlites.");
		this.auth.getProcedureMap().put("UsersDAOSQLite", "register");
	}
	public void init(){
		this.redirect(IN);
	}
	public String register(){
		String str = "register";
		this.auth.start();
		if(this.auth.getAuthErrorList().size() == 0) {
			this.auth.display("etc", "Registered!");
		}
		return str;
	}
}
