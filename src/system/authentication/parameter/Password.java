package system.authentication.parameter;

import system.authentication.AuthModel;
import system.authentication.AuthModelInterface;
import system.authentication.Authentication;

public class Password extends AuthModel implements AuthModelInterface {
	public Password(Authentication authentication){
		super(authentication);
	}
	public void doFormAuth() {
		if(this.paramValue.length() < 4){
			this.msg = this.className + " is too short!!!";
		}
		else if(this.pMap.containsKey("confirm") && !this.paramValue.equals(this.pMap.get("confirm")))
			this.msg = this.className + " is different!!!";
	}
	public void doDbAuth() {
		this.msg = "Password is wrong";
	}
}
