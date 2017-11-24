package system.jsfs;

import java.util.Enumeration;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import system.jsfs.SystemJSF;

@Named
@RequestScoped
public class Logout extends SystemJSF {
	public Logout(){
	}
	public String logout(){
		String str = "login";
		this.session.invalidate();
		/*
		Enumeration<String> names = this.session.getAttributeNames();
		while(names.hasMoreElements())
			this.session.removeAttribute(names.nextElement());
		*/
		return str;
	}
}
