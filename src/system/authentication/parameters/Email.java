package system.authentication.parameters;

import java.util.regex.Pattern;

import system.authentication.AuthModel;
import system.authentication.AuthModelInterface;
import system.authentication.Authentication;

public class Email extends AuthModel implements AuthModelInterface {
	public Email(Authentication authentication){
		super(authentication);
	}
	public void doFormAuth() {
		if(!Pattern.compile("\\A[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\z").matcher(this.paramValue).matches()) {
			this.msg = this.className + " is wrong!!";
		}else if(this.paramValue.length() < 4){
			this.msg = this.className + " is too short!!!";
		}
	}
	public void doDbAuth() {
		if(this.overlap)
			this.msg = "E-mail already exists!!!";
		else
			this.msg = this.className + " does not exist!!!";
	}
}
