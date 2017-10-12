package apps.themes.webSockets;


import java.io.IOException;
import java.nio.ByteBuffer;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnMessage;
import javax.websocket.Session;

import org.json.JSONObject;

import apps.fileBrowser.modules.FBManager;
import apps.themes.modules.ThemeManager;
import system.modules.DesktopManager;
import system.webSocketInterfaces.WebSocketInterface;

public class ThemeWebSocket implements WebSocketInterface{
	private Session websocketSession;
	private HttpSession session;
	@SuppressWarnings("unused")
	private EndpointConfig config;
	private FBManager fbm;
	private ThemeManager tm;
	private ServletContext servletContext;
	private JSONObject data;

	public ThemeWebSocket(){
		this.fbm = new FBManager();
		this.tm = new ThemeManager();
	}
	@OnMessage
    public void processUpload(ByteBuffer msg, boolean last, Session session) {
	}
	public void init() {
		this.fbm.setServletContext(this.servletContext);
		this.fbm.setSession(this.session);
		this.tm.setSession(this.session);
	}
	@Override
	public JSONObject onMessage(String message){
		JSONObject json = new JSONObject(message);
		this.data = json.getJSONObject("data");
		String status = json.getString("status");
		System.out.println(json);
		System.out.println(status);
		json.remove("status");
		this.fbm.setJSON(this.data);
		this.fbm.loadRoot();
		this.fbm.findBrowser();
		this.themeSwitchCase(status);
		json = new JSONObject();
		json.put("app", "taskArray.bgTheme.socket");
		json.put("data", this.tm.getJson());
		return json;
	}
	private void themeSwitchCase(String status){
		switch (status) {
			case "imgFileData":
			String srcPath = this.fbm.getPath()+"/"+this.data.getString("name");
			this.tm.setBgImg(srcPath);
			break;
		}
	}
	@Override
	public void onError(Throwable exception){
		exception.printStackTrace();
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
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}
}


