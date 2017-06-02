/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: A authentication class to manage authetication messages
****************************************************************************************************/
package system.authentication;

import java.util.HashMap;

import system.authentication.RuleResult;

public class RuleResultMap extends HashMap<String,String>{
	private static final long serialVersionUID = 1L;
	private boolean error;
	
	public RuleResultMap(){
		this.error = false;
	}
	
	public boolean hasError() {
		return error;
	}
	public void setError(boolean error) {
		this.error = error;
	}
	
	public void add(RuleResult ruleResult){
		this.put(ruleResult.getParamName(), ruleResult.getMsg());
	}
}
