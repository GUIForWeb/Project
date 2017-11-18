package system.authentications;

import java.util.List;
import java.util.Map;

import system.authentications.Authentication;
import system.authentications.Parameter;
import system.authentications.RuleResult;

public class AuthModel{
	final protected String lineSeparator = "%0D%0A";
	protected String errorType;
	protected int dbAuthNum;
	protected String paramName;
	protected String className;
	protected String paramValue;
	protected String msg;
	protected List<String> authErrorList;
	protected Parameter pMap;
	protected Map<String,String> authStandardMap;
	protected List<String> emptyExceptionList;
	protected RuleResult ruleResult;
	
	public AuthModel() {
	}
	
	public AuthModel(Authentication authentication) {
		this.msg = "";
		this.pMap = (Parameter) authentication.getPMap();
		this.className = authentication.getClassName();
		this.paramName = authentication.getParamName();
		this.paramValue = this.pMap.get(this.paramName);
		this.errorType = authentication.getErrorType();
		if(this.errorType == null) this.errorType = "";
		this.authErrorList = authentication.getAuthErrorList();
		this.authStandardMap = Authentication.authStandardMap;
		this.emptyExceptionList = authentication.getEmptyExceptionList();
		this.ruleResult = new RuleResult();
	}
	
	public void doFormAuth() {
	}

	public void doDbAuth() {
	}
	public String getParamName() {
		return paramName;
	}
	public void setParamName(String paramName) {
		this.paramName = paramName;
	}
	public RuleResult getRuleResult() {
		this.ruleResult.setParamName(this.paramName);
		this.ruleResult.setMsg(this.msg);
		return ruleResult;
	}
	public void setRuleResult(RuleResult ruleResult) {
		this.ruleResult = ruleResult;
	}
	public String nameToClass(String tmpName) {
		String tmpChar;
		tmpChar = Character.toString(tmpName.charAt(0));
		tmpChar = tmpChar.toUpperCase();
		tmpName = tmpChar + tmpName.substring(1);
		return tmpName;
	}
}
