package apps.fileBrowser.controller;


import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONObject;

import apps.fileBrowser.module.FBManager;
import system.library.ServletAwareConfig;
import system.websocketInterface.WebSocketInterface;

public class FBWebSocket implements WebSocketInterface{
	private Session websocketSession;
	private HttpSession session;
	private EndpointConfig config;
	private FBManager fbm;
	public FBWebSocket(){
		this.fbm = new FBManager();
	}
	
	@Override
	public String onMessage(String message){
		JSONObject json = new JSONObject(message);
		String status = json.getString("status");
		json.remove("status");
		this.fbm.setSession(this.session);
		this.fbm.setJson(json);
		switch (status) {
			case "open":
				this.fbm.open(json);
				break;
		}
		message = this.fbm.getJson().toString();
		System.out.println(message);
		return message;
	}

	@Override
	public void onError(Throwable exception){
	}
	

	@Override
	public void setSession(HttpSession session) {
		this.session = session;
	}

	@Override
	public void setWebsocketSession(Session websocketSession) {
		this.websocketSession = websocketSession;
	}

	@Override
	public void setConfig(EndpointConfig config) {
		this.config = config;
	}
}


