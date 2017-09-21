package system.jsf;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import system.jsf.SystemJSF;

@Named
@RequestScoped
public class Logout extends SystemJSF {
	public Logout(){
	}
	public String logout(){
		String str = "login";
		this.session.invalidate();
		return str;
	}
}
