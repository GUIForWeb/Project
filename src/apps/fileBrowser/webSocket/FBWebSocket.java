package apps.fileBrowser.webSocket;


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
import system.webSocketInterface.WebSocketInterface;

public class FBWebSocket implements WebSocketInterface{
	private Session websocketSession;
	private HttpSession session;
	private EndpointConfig config;
	private FBManager fbm;
	public FBWebSocket(){
		this.fbm = new FBManager();
	}
	
	@Override
	public JSONObject onMessage(String message){
		JSONObject json = new JSONObject(message);
		String status = json.getString("status");
		json = json.getJSONObject("data");
		this.fbm.setSession(this.session);
		this.fbm.setJson(json);
		this.fbm.findBrowser();
		switch (status) {
			case "open":
				this.fbm.open();
				break;
			case "newFolder":
				this.fbm.newFolder();
				break;
			case "rename":
				this.fbm.rename();
				break;
			case "del":
				this.fbm.del();
				break;
		}
		int id = this.fbm.getId();
		json = new JSONObject();
		json.put("app", "taskArray.fileBrowser["+id+"].fbm");
		json.put("data", this.fbm.getJson());
		System.out.println(json);
		return json;
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


