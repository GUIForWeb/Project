package system.authentication;

public class RuleResult {
	private String paramName;
	private String msg;
	boolean error;
	public RuleResult() {
		this.msg = "";
		this.error = false;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String authMsg) {
		if(!authMsg.equals(""))
			this.error = true;
		this.msg = authMsg;
	}
	public boolean isError() {
		return error;
	}
	public void setError(boolean error) {
		this.error = error;
	}
	public String getParamName() {
		return paramName;
	}
	public void setParamName(String paramName) {
		this.paramName = paramName;
	}
	
	public String toString(){
		String str = "";
		str += "ParamName : "+ this.paramName + System.getProperty("line.separator");
		str += "Message   : "+ this.msg + System.getProperty("line.separator");
		str += "Error     : "+ this.error;
		return str;
	}
}
