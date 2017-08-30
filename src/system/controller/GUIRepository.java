package system.controller;


import java.io.IOException;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONArray;
import org.json.JSONObject;

import system.exception.GUIException;
import system.library.ServletAwareConfig;
import system.webSocketInterface.WebSocketInterface;

public class GUIRepository implements WebSocketInterface {
	private boolean isUpdated;
	private int winCount;
	private Session websocketSession;
	private HttpSession session;
	private EndpointConfig config;
	private JSONObject winAndBarJSON;
	private JSONArray winAndBarArray;
	public GUIRepository(){
	}

	public JSONObject onMessage(String message){
		this.isUpdated = false;
		this.getSession();
		JSONObject json = new JSONObject(message);
		//json = json.getJSONObject("data");
		String status = json.getString("status");
		json.remove("status");
		switch(status){
		case "moveWinToTop":
			this.moveWinToTop(json);
			break;
		case "updateContent":
			this.updateContent(json);
			break;
		case "disappear":
			this.disappear(json);
			break;
		case "appear":
			this.appear(json);
			break;
		case "fullScreen":
			this.fullScreen(json);
			break;
		case "position":
			this.changePosition(json);
			break;
		case "newWinAndBar":
			this.newWinAndBar(json);
			break;
		case "xWinAndBar":
			this.xWinAndBar(json);
			break;
		}
		if(this.isUpdated){
			if(this.isError()){
				GUIException e = new GUIException();
				this.onError(e);
			}
		}
		this.setSession();
		return new JSONObject();
	}
	private void updateContent(JSONObject json) {
		int winCnt = this.winAndBarArray.length();
		int numId = json.getInt("numId");
		int tmpId = 0;
		JSONObject tmpObj = null;
		JSONObject tmpWinAndBar = null;
		for(int wi=0; wi<winCnt; wi++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(wi);
			tmpObj = tmpWinAndBar.getJSONObject("bar");
			tmpId = tmpObj.getInt("numId");
			if(numId == tmpId){
				tmpObj = tmpWinAndBar.getJSONObject("win");
				tmpObj.put("content", json.getString("content"));
				tmpWinAndBar.put("win",tmpObj);
				this.winAndBarArray.put(wi,tmpWinAndBar);
				break;
			}
		}
		this.isUpdated = true;
	}
	public void fullScreen(JSONObject json) {
		int zIndex = json.getInt("zIndex");
		int len = this.winAndBarArray.length();
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		for(int li=0; li<len; li++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(li);
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
				this.winAndBarArray.put(li,tmpWinAndBar);
				this.isUpdated = true;
			}
		}
	}
	public void changePosition(JSONObject json) {
		int zIndex = json.getInt("zIndex");
		int len = this.winAndBarArray.length();
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		for(int li=0; li<len; li++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(li);
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
					System.out.println(this.winCount);
					tmpWin.put("zIndex", this.winCount-1);
					tmpWin.put("oTop", json.getInt("oTop"));
					tmpWin.put("oLeft", json.getInt("oLeft"));
				}
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarArray.put(li,tmpWinAndBar);
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
	
	private void moveWinToTop(JSONObject json) {
		int zIndex = json.getInt("zIndex");
		int len = this.winAndBarArray.length();
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		
		for(int li=0; li<len; li++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(li);
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
				this.winAndBarArray.put(li,tmpWinAndBar);
				this.isUpdated = true;
			}
		}
	}
	
	private void newWinAndBar(JSONObject json) {
		this.winCount++;
		this.winAndBarArray.put(json);
		this.isUpdated = true;
	}
	
	private boolean isError(){
		boolean error = false;
		boolean tmpError[] = new boolean[this.winCount];
		int len = this.winAndBarArray.length();
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		for(int li=0; li<len; li++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(li);
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
				tmpWinAndBar = this.winAndBarArray.getJSONObject(li);
				tmpWin = tmpWinAndBar.getJSONObject("win");
				tmpWin.optBoolean("oncreen",true);
				tmpWin.put("zIndex",li);
			}
		}
		return error;
	}
	
	private void disappear(JSONObject json) {
		int zIndex = json.getInt("zIndex");
		System.out.println(zIndex);
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		for(int wi=0; wi<this.winAndBarArray.length(); wi++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(wi);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			tmpZIdx = tmpWin.getInt("zIndex");
			if(tmpZIdx < zIndex){
				continue;
			}else if(tmpZIdx > zIndex){
				tmpZIdx--;
				tmpWin.put("zIndex", tmpZIdx);
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarArray.put(wi,tmpWinAndBar);
			}
			else if (tmpZIdx == zIndex){
				tmpWin.put("isOnScreen", false);
				tmpWin.put("zIndex", -1);
				this.winCount--;
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarArray.put(wi,tmpWinAndBar);
			}
		}
		this.isUpdated = true;
	}
	
	private void appear(JSONObject json) {
		int winCnt = this.winAndBarArray.length();
		int numId = json.getInt("numId");
		int tmpId = 0;
		JSONObject tmpObj = null;
		JSONObject tmpWinAndBar = null;
		for(int wi=0; wi<winCnt; wi++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(wi);
			tmpObj = tmpWinAndBar.getJSONObject("bar");
			tmpId = tmpObj.getInt("numId");
			if(numId == tmpId){
				this.winCount++;
				tmpObj = tmpWinAndBar.getJSONObject("win");
				tmpObj.put("isOnScreen", true);
				tmpObj.put("zIndex", this.winCount-1);
				tmpWinAndBar.put("win",tmpObj);
				this.winAndBarArray.put(wi,tmpWinAndBar);
				break;
			}
		}
		this.isUpdated = true;
	}
	
	private void xWinAndBar(JSONObject json) {
		int zIndex = json.getInt("zIndex");
		int position = json.getInt("position");
		int tmpZIdx = 0;
		int tmpPst = 0;
		JSONObject tmpWin = null;
		JSONObject tmpBar = null;
		JSONObject tmpWinAndBar = null;
		JSONArray tmpArray = new JSONArray();
		for(int wi=0; wi<this.winAndBarArray.length(); wi++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(wi);
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
		this.winAndBarArray = tmpArray;
		this.isUpdated = true;
	}
	
	private void setSession(){
		this.winAndBarJSON.put("winAndBar",this.winAndBarArray);
		this.session.setAttribute("winCount",this.winCount);
		this.session.setAttribute("winAndBarJSON",this.winAndBarJSON);
	}
	
	private void getSession(){
		this.winAndBarArray = new JSONArray();
		if(null != this.session.getAttribute("winAndBarJSON")){
			this.winAndBarJSON = (JSONObject) this.session.getAttribute("winAndBarJSON");
			this.winAndBarArray = this.winAndBarJSON.getJSONArray("winAndBar");
		}
		else {
			this.winAndBarJSON = new JSONObject();
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
}
