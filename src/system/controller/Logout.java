package system.controller;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import system.controller.Controller;

@Named
@RequestScoped
public class Logout extends Controller {
	public Logout(){
	}
	public String logout(){
		String str = "login";
		this.session.invalidate();
		return str;
	}
}
