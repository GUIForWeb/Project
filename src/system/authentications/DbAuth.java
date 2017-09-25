/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: A authentication class to help database authentications
****************************************************************************************************/
package system.authentications;

import java.util.HashMap;
import java.util.Map;

import system.authentications.Authentication;

public class DbAuth {
	private Map<String,Boolean> errorMap;
	public DbAuth(Authentication authentication){
		this.errorMap = new HashMap<String,Boolean>();
	}
	public void addErrorCode(int errorCode, boolean overlapCheck){
		if(errorCode<0)
			this.errorMap.put(Authentication.dbErrorCodeXMLMap.get(String.valueOf(errorCode)),overlapCheck);
		
	}
	public Map<String, Boolean> getErrorMap() {
		return errorMap;
	}
	public void setErrorMap(Map<String, Boolean> errorMap) {
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
