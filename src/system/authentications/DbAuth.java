package system.authentications;

import java.util.HashMap;
import java.util.Map;

import system.authentications.Authentication;

public class DbAuth {
	private Map<String,String> errorMap;
	public DbAuth(Authentication authentication){
		this.errorMap = new HashMap<String,String>();
	}
	public void addErrorCode(int errorCode, String errorType){
		if(errorCode<0)
			this.errorMap.put(Authentication.dbErrorCodeXMLMap.get(String.valueOf(errorCode)),errorType);
		
	}
	public Map<String, String> getErrorMap() {
		return errorMap;
	}
	public void setErrorMap(Map<String, String> errorMap) {
		this.errorMap = errorMap;
	}
	public boolean isError(){
		boolean flag = false;
		if(this.errorMap.size() > 0)
			flag = true;
		return flag;
	}
	public String toString(){
		String str = "";
		str += "errorMap: "+this.errorMap+System.lineSeparator();
		return str;
	}
}
