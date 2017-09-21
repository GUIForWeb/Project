package system.modules;

import java.util.ArrayList;
import java.util.List;

public class EssentialJSLib {
	private String contextPath;
	private List<String> list;
	public EssentialJSLib(String contextPath){
		this.list = new ArrayList<String>();
		this.contextPath = contextPath;
		this.libList();
	}
	private void libList(){
		this.list.add(this.contextPath+"/system/scripts/webSocket/GUIWebSocket.js");
		this.list.add(this.contextPath+"/system/scripts/api/complement/Sort.js");
		this.list.add(this.contextPath+"/system/scripts/api/complement/Bottom.js");
		this.list.add(this.contextPath+"/system/scripts/api/complement/Filter.js");
		this.list.add(this.contextPath+"/system/scripts/api/settlor/Set.js");
		this.list.add(this.contextPath+"/system/scripts/api/settlor/Has.js");
		this.list.add(this.contextPath+"/system/scripts/api/API.js");
	}
	public List<String> getList() {
		return list;
	}
	public void setList(List<String> list) {
		this.list = list;
	}
	public String getContextPath() {
		return contextPath;
	}
	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}
}
