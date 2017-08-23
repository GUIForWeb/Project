package system.authentication.parameter;

import system.authentication.AuthModel;
import system.authentication.AuthModelInterface;
import system.authentication.Authentication;

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
		if(overlap)
			this.msg = "You cannot use this nickname";
		else
			this.msg = "Nickname is wrong";
	}
}
