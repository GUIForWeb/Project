package system.authentications.parameters;

import system.authentications.AuthModel;
import system.authentications.AuthModelInterface;
import system.authentications.Authentication;

public class Nickname extends AuthModel implements AuthModelInterface {
	public Nickname(Authentication authentication){
		super(authentication);
	}
	public void doFormAuth() {
		if(this.paramValue.length() < 4){
			this.msg = this.className + " is too short!!!";
		}
	}
	public void doDbAuth() {
		if(this.errorType.equals("overlap"))
			this.msg = "You cannot use this nickname";
		else if(this.errorType.equals("exist"))
			this.msg = "Nickname is wrong";
	}
}
