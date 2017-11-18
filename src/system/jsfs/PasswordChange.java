package system.jsfs;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import system.authentications.Authentication;
import system.jsfs.SystemJSF;

@Named
@RequestScoped
public class PasswordChange extends SystemJSF {
	public PasswordChange() {
		this.viewArray[IN] = "desktop";
        this.viewArray[OUT] = "login";
		this.auth.setAuthSeqArray(new Integer[]{
			Authentication.EMPTY,
			Authentication.EXCEPTION_TO_DENY,
    		Authentication.AUTHRULE,
    		Authentication.DB_AUTH	
		});
		this.auth.setDaos("system.daos.sqlites.");
		this.auth.getProcedureMap().put("UsersDAOSQLite", "changePassword");
	}
	public String run(){
		String str = "changePassword";
		System.out.println(this.auth);
		this.auth.start();
		if(this.auth.getAuthErrorList().size() == 0) {
			this.auth.display("etc", "Changed!");
		}
		return str;
	}
	public void init(){
		this.redirect(OUT);
	}
}