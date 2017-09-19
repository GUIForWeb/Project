package system.jsf;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import system.jsf.System;

@Named
@RequestScoped
public class Logout extends System {
	public Logout(){
	}
	public String logout(){
		String str = "login";
		this.session.invalidate();
		return str;
	}
}
