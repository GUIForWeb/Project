package system.modules;


import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;

import org.json.JSONArray;
import org.json.JSONObject;

public class WinAndBarRepository {
	private boolean isUpdated;
	private int winCount;
	private ServletContext servletContext;
	private Session websocketSession;
	private HttpSession session;
	private EndpointConfig config;
	private JSONArray winAndBarJSONArray;
	public WinAndBarRepository(){
	}

	
	public void resizeend(JSONObject json){
		int zIndex = json.getInt("zIndex");
		int len = this.winAndBarJSONArray.length();
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		
		for(int li=0; li<len; li++){
			tmpWinAndBar = this.winAndBarJSONArray.getJSONObject(li);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			if(tmpWin.getBoolean("isOnScreen")){
				tmpZIdx = tmpWin.getInt("zIndex");
				if(tmpZIdx < zIndex){
					continue;
				}else if(tmpZIdx > zIndex){
					tmpZIdx--;
					tmpWin.put("zIndex", tmpZIdx);
				}
				else if (tmpZIdx == zIndex){
					tmpWin.put("zIndex", this.winCount-1);
					tmpWin.put("oHeight", json.getInt("oHeight"));
					tmpWin.put("oWidth", json.getInt("oWidth"));
					tmpWin.put("oLeft", json.getInt("oLeft"));
					tmpWin.put("oTop", json.getInt("oTop"));
				}
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarJSONArray.put(li,tmpWinAndBar);
				this.isUpdated = true;
			}
		}
	}
	public void updateContent(JSONObject json) {
		int winCnt = this.winAndBarJSONArray.length();
		int numId = json.getInt("numId");
		int tmpId = 0;
		JSONObject tmpObj = null;
		JSONObject tmpWinAndBar = null;
		for(int wi=0; wi<winCnt; wi++){
			tmpWinAndBar = this.winAndBarJSONArray.getJSONObject(wi);
			tmpObj = tmpWinAndBar.getJSONObject("bar");
			tmpId = tmpObj.getInt("numId");
			if(numId == tmpId){
				tmpObj = tmpWinAndBar.getJSONObject("win");
				tmpObj.put("content", json.getString("content"));
				tmpWinAndBar.put("win",tmpObj);
				this.winAndBarJSONArray.put(wi,tmpWinAndBar);
				break;
			}
		}
		this.isUpdated = true;
	}
	public void fullScreen(JSONObject json) {
		int zIndex = json.getInt("zIndex");
		int len = this.winAndBarJSONArray.length();
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		for(int li=0; li<len; li++){
			tmpWinAndBar = this.winAndBarJSONArray.getJSONObject(li);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			if(tmpWin.getBoolean("isOnScreen")){
				tmpZIdx = tmpWin.getInt("zIndex");
				if(tmpZIdx < zIndex){
					continue;
				}else if(tmpZIdx > zIndex){
					tmpZIdx--;
					tmpWin.put("zIndex", tmpZIdx);
				}
				else if (tmpZIdx == zIndex){
					boolean isFullScreen = json.getBoolean("isFullScreen");
					tmpWin.put("zIndex", this.winCount-1);
					tmpWin.put("oTop", json.getInt("oTop"));
					tmpWin.put("oLeft", json.getInt("oLeft"));
					tmpWin.put("oWidth", json.getInt("oWidth"));
					tmpWin.put("oHeight", json.getInt("oHeight"));
					tmpWin.put("isFullScreen", json.getBoolean("isFullScreen"));
					if(isFullScreen) {
						tmpWin.put("prevOTop", json.getInt("prevOTop"));
						tmpWin.put("prevOLeft", json.getInt("prevOLeft"));
						tmpWin.put("prevOWidth", json.getInt("prevOWidth"));
						tmpWin.put("prevOHeight", json.getInt("prevOHeight"));
					}
				}
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarJSONArray.put(li,tmpWinAndBar);
				this.isUpdated = true;
			}
		}
	}
	public void changePosition(JSONObject json) {
		int zIndex = json.getInt("zIndex");
		int len = this.winAndBarJSONArray.length();
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		for(int li=0; li<len; li++){
			tmpWinAndBar = this.winAndBarJSONArray.getJSONObject(li);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			if(tmpWin.getBoolean("isOnScreen")){
				tmpZIdx = tmpWin.getInt("zIndex");
				if(tmpZIdx < zIndex){
					continue;
				}else if(tmpZIdx > zIndex){
					tmpZIdx--;
					tmpWin.put("zIndex", tmpZIdx);
				}
				else if (tmpZIdx == zIndex){
					tmpWin.put("zIndex", this.winCount-1);
					tmpWin.put("oTop", json.getInt("oTop"));
					tmpWin.put("oLeft", json.getInt("oLeft"));
				}
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarJSONArray.put(li,tmpWinAndBar);
				this.isUpdated = true;
			}
		}
	}
	public void onError(Throwable exception){
		try {
			this.websocketSession.getBasicRemote().sendText(exception.getMessage());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void moveWinToTop(JSONObject json) {
		int zIndex = json.getInt("zIndex");
		int len = this.winAndBarJSONArray.length();
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		
		for(int li=0; li<len; li++){
			tmpWinAndBar = this.winAndBarJSONArray.getJSONObject(li);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			if(tmpWin.getBoolean("isOnScreen")){
				tmpZIdx = tmpWin.getInt("zIndex");
				if(tmpZIdx < zIndex){
					continue;
				}else if(tmpZIdx > zIndex){
					tmpZIdx--;
					tmpWin.put("zIndex", tmpZIdx);
				}
				else if (tmpZIdx == zIndex){
					tmpWin.put("zIndex", this.winCount-1);
				}
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarJSONArray.put(li,tmpWinAndBar);
				this.isUpdated = true;
			}
		}
	}
	
	public void newWinAndBar(JSONObject json) {
		this.winCount++;
		this.winAndBarJSONArray.put(json);
		this.isUpdated = true;
	}
	
	public boolean isError(){
		boolean error = false;
		boolean tmpError[] = new boolean[this.winCount];
		int len = this.winAndBarJSONArray.length();
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		for(int li=0; li<len; li++){
			tmpWinAndBar = this.winAndBarJSONArray.getJSONObject(li);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			if(tmpWin.getBoolean("isOnScreen")){
				int tmpZidx = tmpWin.getInt("zIndex");
				if(!tmpError[tmpZidx]){
					tmpError[tmpWin.getInt("zIndex")] = true;
				}
				else {
					error = true;
					break;
				}
			}
		}
		if(error){
			for(int li=0; li<len; li++){
				tmpWinAndBar = this.winAndBarJSONArray.getJSONObject(li);
				tmpWin = tmpWinAndBar.getJSONObject("win");
				tmpWin.optBoolean("oncreen",true);
				tmpWin.put("zIndex",li);
			}
		}
		return error;
	}
	
	public void disappear(JSONObject json) {
		int zIndex = json.getInt("zIndex");
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		for(int wi=0; wi<this.winAndBarJSONArray.length(); wi++){
			tmpWinAndBar = this.winAndBarJSONArray.getJSONObject(wi);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			tmpZIdx = tmpWin.getInt("zIndex");
			if(tmpZIdx < zIndex){
				continue;
			}else if(tmpZIdx > zIndex){
				tmpZIdx--;
				tmpWin.put("zIndex", tmpZIdx);
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarJSONArray.put(wi,tmpWinAndBar);
			}
			else if (tmpZIdx == zIndex){
				tmpWin.put("isOnScreen", false);
				tmpWin.put("zIndex", -1);
				this.winCount--;
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarJSONArray.put(wi,tmpWinAndBar);
			}
		}
		this.isUpdated = true;
	}
	
	public void appear(JSONObject json) {
		int winCnt = this.winAndBarJSONArray.length();
		int numId = json.getInt("numId");
		int tmpId = 0;
		JSONObject tmpObj = null;
		JSONObject tmpWinAndBar = null;
		for(int wi=0; wi<winCnt; wi++){
			tmpWinAndBar = this.winAndBarJSONArray.getJSONObject(wi);
			tmpObj = tmpWinAndBar.getJSONObject("bar");
			tmpId = tmpObj.getInt("numId");
			if(numId == tmpId){
				this.winCount++;
				tmpObj = tmpWinAndBar.getJSONObject("win");
				tmpObj.put("isOnScreen", true);
				tmpObj.put("zIndex", this.winCount-1);
				tmpWinAndBar.put("win",tmpObj);
				this.winAndBarJSONArray.put(wi,tmpWinAndBar);
				break;
			}
		}
		this.isUpdated = true;
	}
	
	public void xWinAndBar(JSONObject json) {
		int zIndex = json.getInt("zIndex");
		int position = json.getInt("position");
		int tmpZIdx = 0;
		int tmpPst = 0;
		JSONObject tmpWin = null;
		JSONObject tmpBar = null;
		JSONObject tmpWinAndBar = null;
		JSONArray tmpArray = new JSONArray();
		for(int wi=0; wi<this.winAndBarJSONArray.length(); wi++){
			tmpWinAndBar = this.winAndBarJSONArray.getJSONObject(wi);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			tmpBar = tmpWinAndBar.getJSONObject("bar");
			tmpZIdx = tmpWin.getInt("zIndex");
			tmpPst = tmpBar.getInt("position");
			if(tmpPst > position){
				tmpPst--;
				tmpBar.put("position", tmpPst);
				tmpWinAndBar.put("bar",tmpBar);
				if(tmpZIdx > zIndex){
					tmpZIdx--;
					tmpWin.put("zIndex", tmpZIdx);
					tmpWinAndBar.put("win",tmpWin);
				}
				tmpArray.put(tmpPst,tmpWinAndBar);
			}
			else if(tmpPst < position){
				if(tmpZIdx > zIndex){
					tmpZIdx--;
					tmpWin.put("zIndex", tmpZIdx);
					tmpWinAndBar.put("win",tmpWin);
				}
				tmpArray.put(tmpPst,tmpWinAndBar);
			}
		}
		this.winCount--;
		this.winAndBarJSONArray = tmpArray;
		this.isUpdated = true;
	}
	
	public void setSession(){
		this.session.setAttribute("winCount",this.winCount);
		this.session.setAttribute("winAndBarJSONArray",this.winAndBarJSONArray);
	}
	
	public void getSession(){
		this.winAndBarJSONArray = new JSONArray();
		if(null != this.session.getAttribute("winAndBarJSONArray")){
			this.winAndBarJSONArray = (JSONArray) this.session.getAttribute("winAndBarJSONArray");
		}
		
		if(null != this.session.getAttribute("winCount")){
			this.winCount = (int) this.session.getAttribute("winCount");
		}
		else 
			this.winCount = 0;
	}
	
	public int getWinCount() {
		return winCount;
	}
	public void setWinCount(int winCount) {
		this.winCount = winCount;
	}
	public void setSession(HttpSession session) {
		this.session = session;
	}
	public Session getWebsocketSession() {
		return websocketSession;
	}
	public void setWebsocketSession(Session websocketSession) {
		this.websocketSession = websocketSession;
	}
	public EndpointConfig getConfig() {
		return config;
	}
	public void setConfig(EndpointConfig config) {
		this.config = config;
	}
	public ServletContext getServletContext() {
		return servletContext;
	}
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}
	public boolean isUpdated() {
		return isUpdated;
	}
	public void setUpdated(boolean isUpdated) {
		this.isUpdated = isUpdated;
	}
}
