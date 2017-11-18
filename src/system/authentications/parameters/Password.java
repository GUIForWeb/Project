package system.authentications.parameters;

import system.authentications.AuthModel;
import system.authentications.AuthModelInterface;
import system.authentications.Authentication;

public class Password extends AuthModel implements AuthModelInterface {
	public Password(Authentication authentication){
		super(authentication);
	}
	public void doFormAuth() {
		if(this.paramValue.length() < 4){
			this.msg = this.className + " is too short!!!";
		}
		else if(this.pMap.containsKey("confirm") && !this.pMap.get("password").equals(this.pMap.get("confirm")))
			this.msg = this.className + " is different!!!";
	}
	public void doDbAuth() {
		if(this.errorType.equals("equal"))
			this.msg = "Password is wrong";
	}
}
