package apps.fileBrowser.webSocket;


import java.io.IOException;
import java.nio.ByteBuffer;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnMessage;
import javax.websocket.Session;

import org.json.JSONObject;

import apps.fileBrowser.module.FBManager;
import system.modules.DesktopManager;
import system.webSocketInterfaces.WebSocketInterface;

public class FBWebSocket implements WebSocketInterface{
	@SuppressWarnings("unused")
	private Session websocketSession;
	private HttpSession session;
	@SuppressWarnings("unused")
	private EndpointConfig config;
	private FBManager fbm;
	private ServletContext servletContext;
	

	public FBWebSocket(){
		this.fbm = new FBManager();
	}
	@OnMessage
    public void processUpload(ByteBuffer msg, boolean last, Session session) {
		JSONObject be = new JSONObject();
		JSONObject json = new JSONObject();
		JSONObject data0 = new JSONObject();
		JSONObject data1 = new JSONObject();
		be.put("receiving", json);
		json.put("app", "taskArray.fileBrowser["+this.fbm.getId()+"].fbm");
		json.put("id", this.fbm.getId());
		json.put("data", data0);
		data0.put("status", "%");
		while(msg.hasRemaining()) {
			if(this.fbm.uploading(msg)){
				data0.put("byteCount", this.fbm.getFileOutputStream().getByteCount());
	        	try {
					session.getBasicRemote().sendText(be.toString());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
        }
	}
	@Override
	public JSONObject onMessage(String message){
		JSONObject json = new JSONObject(message);
		String status = json.getString("status");
		json.remove("status");
		this.fbm.setServletContext(this.servletContext);
		this.fbm.setSession(this.session);
		this.fbm.setJson(json);
		this.fbm.loadRoot();
		this.fbm.findBrowser();
		this.fbm.setDesktopManager(new DesktopManager());
		switch (status) {
			case "open":
				this.fbm.open();
				break;
			case "uploadDone":
				this.fbm.uploadDone();
				break;
			case "uploadStart":
				this.fbm.uploadStart();
				break;
			case "isNotInWindow":
				this.fbm.isNotInWindow();
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
			case "copy":
			case "cut":
				this.fbm.setClipboard(status);
				break;
			case "paste":
				this.fbm.paste();
				break;
			case "x":
				this.fbm.x();
				break;
		}
		int id = this.fbm.getId();
		json = new JSONObject();
		if(null != this.fbm.getJson()) {
			json.put("app", "taskArray.fileBrowser["+id+"].fbm");
			json.put("data", this.fbm.getJson());
		}
		return json;
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


