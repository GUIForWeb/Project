package system.controllers;


import java.io.IOException;
import java.net.Socket;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.enterprise.context.RequestScoped;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.EncodeException;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONArray;
import org.json.JSONObject;

import system.authentication.Authentication;
import system.exception.GUIException;
import system.models.User;
import system.library.ServletAwareConfig;

@ServerEndpoint(value = "/gr", configurator=ServletAwareConfig.class)
public class GUIRepository{
	private boolean isUpdated;
	private int winCount;
	private EndpointConfig config;
	private HttpSession session;
	private ServletContext servletContext;
	private JSONObject winAndBarJSON;
	private JSONArray winAndBarArray;
	private Session websocketSession;
	public GUIRepository(){
	}
	
	@OnOpen
	public void onOpen(Session websocketSession, EndpointConfig config){
		System.out.println("Open Connection ...");
		this.websocketSession = websocketSession;
		this.config = config;
		this.session = (HttpSession) config.getUserProperties().get("httpSession");
        this.servletContext = this.session.getServletContext();
        
	}
	
	@OnMessage
	public String onMessage(String message){
		this.isUpdated = false;
		this.getSession();
		JSONObject json = new JSONObject(message);
		String status = json.getString("status");
		json.remove("status");
		switch(status){
		case "disappear":
			this.disappear(json);
			break;
		case "appear":
			this.appear(json);
			break;
		case "moveWinToTop":
			this.moveWinToTop(json);
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
		return message;
	}

	@OnError
	public void onError(Throwable exception){
		try {
			this.websocketSession.getBasicRemote().sendText(exception.getMessage());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@OnClose
	public void onClose(){
		System.out.println("Close Connection ...");
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
			if(tmpWin.getBoolean("onScreen")){
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
			if(tmpWin.getBoolean("onScreen")){
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
				tmpWin.put("onScreen", false);
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
				tmpObj.put("onScreen", true);
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
	/*
	private int winCount;
	private String status;
	private String param;
	//private WinAndBarNode startNode;
	//private JSONObject winJSON;
	//private JSONObject barJSON;
	private JSONObject winAndBarJSON;
	private JSONArray winAndBarArray;
	
	public GUIRepository(){
		this.getSession();
	}
	
	public void listen(){
		//this.winJSON = jsonObj.getJSONObject("win");
		//this.barJSON = jsonObj.getJSONObject("bar");
		
		switch(this.status){
		
			case "disappear":
				this.disappear();
				break;
			case "appear":
				this.appear();
				break;
			case "moveWinToTop":
				this.moveWinToTop();
				break;
			case "newWinAndBar":
				this.newWinAndBar();
				break;
			case "xWinAndBar":
				this.xWinAndBar();
				break;
				
		}
		System.out.println(winCount);
	}
	
	private void xWinAndBar() {
		String data[] = this.param.split("&");
		int zIndex = Integer.parseInt(data[0]);
		int position = Integer.parseInt(data[1]);
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
		this.setSession();
	}
	private void disappear() {
		int winCnt = this.winAndBarArray.length();
		int zIndex = Integer.valueOf(this.param);
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		for(int wi=0; wi<winCnt; wi++){
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
				tmpWin.put("onScreen", false);
				tmpWin.put("zIndex", -1);
				this.winCount--;
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarArray.put(wi,tmpWinAndBar);
			}
		}
		this.setSession();
	}
	private void appear() {
		int winCnt = this.winAndBarArray.length();
		int numId = Integer.valueOf(this.param);
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
				tmpObj.put("onScreen", true);
				tmpObj.put("zIndex", this.winCount-1);
				tmpWinAndBar.put("win",tmpObj);
				this.winAndBarArray.put(wi,tmpWinAndBar);
				break;
			}
		}
		this.setSession();
	}
	private void moveWinToTop() {
		boolean isEdited = false;
		int zIndex = Integer.parseInt(this.param);
		int winCnt = this.winAndBarArray.length();
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		
		for(int wi=0; wi<winCnt; wi++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(wi);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			if(tmpWin.getBoolean("onScreen")){
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
				this.winAndBarArray.put(wi,tmpWinAndBar);
				isEdited = true;
			}
		}
		if(isEdited){
			this.setSession();
		}
	}
	private void newWinAndBar() {
		JSONObject winAndBarJSON = new JSONObject(this.param);
		this.winCount++;
		this.winAndBarArray.put(winAndBarJSON);
		this.setSession();
	}
	*/
	/*
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getParam() {
		return param;
	}
	public void setParam(String param) {
		this.param = param;
	}
	*/
	public int getWinCount() {
		return winCount;
	}
	public void setWinCount(int winCount) {
		this.winCount = winCount;
	}
	
}
