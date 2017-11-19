package system.authentications;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;

import system.authentications.Authentication;
import system.authentications.DbAuth;
import system.authentications.Parameter;
import system.authentications.RuleResult;
import system.authentications.RuleResultMap;
import system.xmls.XMLLoader;

public class Authentication {
	public static Map<String,String> authNameXMLMap;
	public static Map<String,String> authStandardMap;
	public static Map<String,List<String>> exceptionXMLMap;
	public static Map<String,String> dbErrorCodeXMLMap;
	private String daos = "system.daos.mysqls.";
	final private String parameter = "system.authentications.parameters.";
	private boolean authSuccess;
	private boolean redayToAuth;
	private boolean exceptionFilter;
	private String errorType;
	private String authPackage;
	private String className;
	private String daoName;
	private String paramName;
	private Integer[] authSeqArray;
	private Parameter pMap;
	private ServletContext context; 
	private List<String> formAuthList;
	private List<String> authErrorList;
	private List<String> emptyExceptionList;
	private ExternalContext externalContext;
	private Map<String,String> dbAuthErrorMap;
	private Map<String,String> msg;
	private Map<String,String> exceptedMap;
	private Map<String,String> procedureMap;
	
	public static int EMPTY = 0;
	public static int EXCEPTION_TO_ACCEPT = 1;
	public static int EXCEPTION_TO_DENY = 2;
	public static int AUTHRULE = 3;
	public static int DB_AUTH = 4;

	public Authentication() {
		this.externalContext = FacesContext.getCurrentInstance().getExternalContext();
		//this.session = (HttpSession) externalContext.getSession(false);
		this.pMap = (Parameter) externalContext.getRequestMap().get("p");
		this.context = (ServletContext) externalContext.getContext();
		this.formAuthList = new ArrayList<String>();
		this.redayToAuth = false;
		this.emptyExceptionList = new ArrayList<String>();
		this.msg = new HashMap<String,String>();
		this.procedureMap = new HashMap<String,String>(); 
	}
	
	public void start() {
		if(null != this.pMap && this.pMap.size() > 0) {
			this.loadXML();
			this.nameToClass();
			this.redayToAuth = true;
		}
		if(this.redayToAuth) {
			this.startAuth();
			this.displayMsg();
		}
	}
	public void displayMsg() {
		this.externalContext.getRequestMap().put("msg", this.msg);
	}
	public void display(String key, String msg) {
		this.msg.put(key, msg);
		this.displayMsg();
	}
	
	private void startAuth() {
		this.authSuccess = false;
		this.initAuthErrorMap();
		for(int ai=0; ai<this.authSeqArray.length; ai++) {
			if(ai==0 && this.formAuthList.size() > 0)
				this.authSuccess = true;
			if(this.authSeqArray[ai] != Authentication.DB_AUTH) 
				this.doAuth(this.authSeqArray[ai]);
			else
				this.doDBAuth();
			if(this.authSuccess == false) 
				break;
		}
	}
	private void doDBAuth() {
		if(this.authCondition()) {
			boolean dbAuthSuccess = false;
			Class<?> tmpClass = null;
			Object tmpObj;
			Method tmpMethod = null;
			ArrayList<String> daoList = new ArrayList<String>();
			DbAuth dbAuth = new DbAuth(this);
			daoList.addAll(this.procedureMap.keySet());
			this.authErrorList = new ArrayList<String>();
			this.authPackage = this.parameter;
			RuleResultMap ruleResultMap = new RuleResultMap();  
			for(int mi=0; mi<daoList.size(); mi++) {
				this.daoName = daoList.get(mi);
				try {
					tmpClass = Class.forName(this.daos+this.daoName);
					tmpObj = tmpClass.getConstructor().newInstance();
					tmpMethod = tmpClass.getMethod("setPMap", Parameter.class);
					tmpMethod.invoke(tmpObj,this.pMap);
					tmpMethod = tmpClass.getMethod("setAuthentication", Authentication.class);
					tmpMethod.invoke(tmpObj,this);
					tmpMethod = tmpClass.getMethod(this.procedureMap.get(this.daoName));
					dbAuth = (DbAuth)tmpMethod.invoke(tmpObj);
					this.authErrorList.addAll(dbAuth.getErrorMap().keySet());
				} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | IllegalArgumentException
						| InvocationTargetException | NoSuchMethodException | SecurityException e) {
					e.printStackTrace();
					this.authErrorList.add("dbError");
					this.authPackage = "system.authentication.";
				}
			}
			if(this.authErrorList.size() == 0) {
				dbAuthSuccess = true;
			}
			else {
				if(dbAuth.isError())
					this.dbAuthErrorMap = dbAuth.getErrorMap();
				for(int li=0; li<this.authErrorList.size(); li++) {
					this.paramName = this.authErrorList.get(li);
					this.className = Authentication.authStandardMap.get(this.paramName);
					if(null != this.dbAuthErrorMap)
						this.errorType = this.dbAuthErrorMap.get(this.paramName);
					ruleResultMap.add(this.doDbAuth());
				}
				this.msg = ruleResultMap;
			}
			this.authSuccess = dbAuthSuccess;
		}
	}
	
	private void doAuth(Integer command) {
		if(command.equals(Authentication.EMPTY)) {
			this.checkEmpty();
		}
		else if(command.equals(Authentication.EXCEPTION_TO_ACCEPT))	{
			this.exceptionFilter = false;
			this.checkExceptedValue();
		}
		else if(command.equals(Authentication.EXCEPTION_TO_DENY)) {
			this.exceptionFilter = true;
			this.checkExceptedValue();
		}
		else if(command.equals(Authentication.AUTHRULE)) {
			this.checkAuthRule();
		}
	}
	
	private RuleResult doFormAuth() {
		return this.getAuthResult("Form");
	}
	
	private RuleResult doDbAuth() {
		return this.getAuthResult("Db");
	}
	
	private RuleResult getAuthResult(String authType) {
		Class<?> tmpClass;
		Object tmpObj;
		Method tmpMethod = null;
		RuleResult tmpRuleResult = new RuleResult();
		//this.className = Authentication.authStandardMap.get(name);
		try {
			if(null != this.className) {
				tmpClass = Class.forName(this.authPackage+this.className);
				tmpObj = tmpClass.getConstructor(Authentication.class).newInstance(this);
				tmpMethod = tmpClass.getMethod("do"+authType+"Auth");
				tmpMethod.invoke(tmpObj);
				tmpMethod = tmpClass.getMethod("getRuleResult");
				tmpRuleResult = (RuleResult) tmpMethod.invoke(tmpObj);
			}
		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException e) {
			e.printStackTrace();
		}
		return tmpRuleResult;
	}
	
	private void checkAuthRule() {
		if(this.authCondition()) {
			RuleResult tmpRuleResult;
			RuleResultMap ruleResultMap = new RuleResultMap();  
			boolean authRuleSuccess = false;
			this.authErrorList = new ArrayList<String>();
			this.authPackage = this.parameter;
			for(int li=0; li<this.formAuthList.size(); li++) {
				this.paramName = this.formAuthList.get(li);
				this.className = Authentication.authStandardMap.get(this.paramName);
				if(this.exceptedMap != null && !this.exceptedMap.containsKey(this.paramName)) {
					tmpRuleResult = this.doFormAuth();
					if(tmpRuleResult.isError()){
						this.authErrorList.add(this.paramName);
						ruleResultMap.add(tmpRuleResult);
						ruleResultMap.setError(true);
					}
				}
			}
			if(ruleResultMap.hasError()) {
				this.msg = ruleResultMap;
			}
			else authRuleSuccess = true;
			this.authSuccess = authRuleSuccess;
		}
	}
	
	private void checkExceptedValue(){
		if(this.authCondition()) {
			this.exceptedMap = new HashMap<String, String>();
			boolean exception = false;
			String tmpName = "";
			String tmpAuthName;
			String tmpVal;
			ArrayList<String> tmpExceptionList;
			this.authErrorList = new ArrayList<String>();
			for(int li=0; li<this.formAuthList.size(); li++) {
				exception = false;
				tmpName = this.formAuthList.get(li);
				tmpAuthName = Authentication.authNameXMLMap.get(tmpName);
				if(Authentication.exceptionXMLMap.containsKey(tmpAuthName)) {
					tmpExceptionList = (ArrayList<String>) Authentication.exceptionXMLMap.get(tmpAuthName);
					tmpVal = this.pMap.get(tmpName);
					if(tmpExceptionList.contains(tmpVal)) {
						this.authErrorList.add(tmpAuthName);
						this.exceptedMap.put(tmpName, tmpVal);
						exception = true;
					}
				}
				if(this.exceptionFilter && exception) {
					/*
					ExceptedValue exceptedValue = new ExceptedValue(this);
					this.authResultArray.add(exceptedValue.getAuthResultArray());
					*/
					this.msg.put(tmpName, this.nameToStandard(tmpName) + " is not accepted!!!");
					
				}
				else {
					this.authSuccess = true;
				}
			}
		}
	}
	private void checkEmpty() {
		boolean formFillSuccess = false;
		if(this.authCondition()) {
			this.authErrorList = new ArrayList<String>();
			String tmpName = "";
			String tmpVal;
			for(int li=0; li<this.formAuthList.size(); li++) {
				tmpName = this.formAuthList.get(li);
				tmpVal = this.pMap.get(tmpName);
				if(tmpVal.trim().equals("") && !this.emptyExceptionList.contains(tmpName)) {
					this.msg.put(tmpName, this.nameToStandard(tmpName) + " is empty!!!");
					if(this.formAuthList.contains(tmpName)) {
						if(!this.authErrorList.contains(tmpName))
							this.authErrorList.add(tmpName);
					}
				}
			}
			if(this.authErrorList.size() == 0) {
				formFillSuccess = true;
			}
		}
		
		this.authSuccess = formFillSuccess;
	}
	
	private boolean authCondition() {
		boolean flag = false;
		if(this.authSuccess == true) {
			flag = true;
			this.authSuccess = false;
		}
		return flag;
	}
	
	private void initAuthErrorMap() {
		this.authErrorList = new ArrayList<String>();
		this.authErrorList.add("init Auth error");
	}
	
	public void nameToClass() {
		String tmpName;
		String tmpStr;
		this.formAuthList.addAll(this.pMap.keySet());
		
		for(int fi=0; fi<this.formAuthList.size(); fi++) {
			tmpName = this.formAuthList.get(fi);
			if(!Authentication.authNameXMLMap.containsKey(tmpName)) {
				Authentication.authNameXMLMap.put(tmpName, tmpName);
				Authentication.authStandardMap.put(tmpName, this.nameToStandard(tmpName));
			}
			tmpStr = this.pMap.get(tmpName);
			if(tmpStr.contains(System.lineSeparator())) {
				tmpStr = tmpStr.trim();
				tmpStr.replaceAll(System.lineSeparator(), "%0D%0A");
			}
		}
	}
	
	private String nameToStandard(String tmpName) {
		String tmpChar;
		tmpChar = Character.toString(tmpName.charAt(0));
		tmpChar = tmpChar.toUpperCase();
		tmpName = tmpChar + tmpName.substring(1);
		return tmpName;
	}
	
	private void loadXML() {
		String authPath;
		if(null == Authentication.authNameXMLMap) {
			authPath = this.context.getRealPath("/WEB-INF/authentication.xml");
			XMLLoader authClassXML = new XMLLoader(authPath, "auth", XMLLoader.REGULAR);
			this.setAuthClassXMLMap(authClassXML.getRegularMap());
		}
		if(null == Authentication.exceptionXMLMap) {
			authPath = this.context.getRealPath("/WEB-INF/authentication.xml");
			XMLLoader excpXML = new XMLLoader(authPath, "exception", XMLLoader.REGULAR);
			this.setExceptionXMLMap(excpXML.getRegularMap());
		}
		if(null == Authentication.dbErrorCodeXMLMap) {
			authPath = this.context.getRealPath("/WEB-INF/authentication.xml");
			XMLLoader dbErrorCodeXML = new XMLLoader(authPath, "database-error-code", XMLLoader.REGULAR);
			this.setDbErrorCodeXMLMap(dbErrorCodeXML.getRegularMap());
		}
	}
	
	private void setExceptionXMLMap(List<Map<String,String>> xmlInfo) {
		Authentication.exceptionXMLMap = new HashMap<String,List<String>>();
		Map<String,String> tmpXMLMap = new HashMap<String,String>();
		List<String> tmpList;
		for(int xi=0; xi<xmlInfo.size(); xi++){
			tmpXMLMap = xmlInfo.get(xi);
			if(!Authentication.exceptionXMLMap.containsKey(tmpXMLMap.get("name"))){
				tmpList = new ArrayList<String>();
				tmpList.add(tmpXMLMap.get("excp"));
				Authentication.exceptionXMLMap.put(tmpXMLMap.get("name"),tmpList);
			}
			else{
				tmpList = Authentication.exceptionXMLMap.get(tmpXMLMap.get("name"));
				tmpList.add(tmpXMLMap.get("excp"));
			}
		}
	}
	
	private void setDbErrorCodeXMLMap(List<Map<String,String>> xmlInfo) {
		Authentication.dbErrorCodeXMLMap = new HashMap<String,String>();
		Map<String,String> tmpXMLMap = new HashMap<String,String>();
		for(int xi=0; xi<xmlInfo.size(); xi++){
			tmpXMLMap = xmlInfo.get(xi);
			Authentication.dbErrorCodeXMLMap.put(tmpXMLMap.get("number"),tmpXMLMap.get("error-code"));
		}
	}
	
	private void setAuthClassXMLMap(List<Map<String,String>> xmlInfo)	{
		Authentication.authNameXMLMap = new HashMap<String,String>();
		Authentication.authStandardMap = new HashMap<String,String>();
		Map<String,String> tmpXMLMap = new HashMap<String,String>();
		for(int xi=0; xi<xmlInfo.size(); xi++){
			tmpXMLMap = xmlInfo.get(xi);
			Authentication.authNameXMLMap.put(tmpXMLMap.get("name"),tmpXMLMap.get("category"));
			Authentication.authStandardMap.put(tmpXMLMap.get("name"),this.nameToStandard(tmpXMLMap.get("category")));
		}
	}
	
	public Map<String,String> getPMap() {
		return pMap;
	}

	public void setPMap(Parameter pMap) {
		this.pMap = pMap;
	}
	
	public Integer[] getAuthSeqArray() {
		return authSeqArray;
	}

	public void setAuthSeqArray(Integer[] authSeqArray) {
		this.authSeqArray = authSeqArray;
	}
	
	public List<String> getEmptyExceptionList() {
		return emptyExceptionList;
	}

	public void setEmptyExceptionList(List<String> emptyExceptionList) {
		this.emptyExceptionList = emptyExceptionList;
	}
	
	public List<String> getAuthErrorList() {
		return authErrorList;
	}

	public Map<String, String> getMsg() {
		return msg;
	}

	public void setMsg(Map<String, String> msg) {
		this.msg = msg;
	}
	
	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getParamName() {
		return paramName;
	}

	public void setParamName(String paramName) {
		this.paramName = paramName;
	}
	
	public Map<String, String> getProcedureMap() {
		return procedureMap;
	}

	public void setProcedureMap(Map<String, String> procedureMap) {
		this.procedureMap = procedureMap;
	}
	
	public String getErrorType() {
		return errorType;
	}

	public void setErrorType(String errorType) {
		this.errorType = errorType;
	}
	
	public String toString(){
		String str = "";
		str += "P Map: " + this.pMap + System.getProperty("line.separator");
		return str;
	}
	public String getDaos() {
		return daos;
	}
	public void setDaos(String daos) {
		this.daos = daos;
	}
}
