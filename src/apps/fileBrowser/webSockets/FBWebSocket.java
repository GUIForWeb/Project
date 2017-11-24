package apps.fileBrowser.webSockets;


import java.io.IOException;
import java.nio.ByteBuffer;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnMessage;
import javax.websocket.Session;

import org.json.JSONObject;

import apps.fileBrowser.modules.FBManager;
import system.modules.DesktopManager;
import system.webSocketInterfaces.WebSocketInterface;

public class FBWebSocket implements WebSocketInterface{
	private Session websocketSession;
	private HttpSession session;
	@SuppressWarnings("unused")
	private EndpointConfig config;
	private FBManager fbm;
	private DesktopManager dm;
	private ServletContext servletContext;
	public FBWebSocket(){
		this.fbm = new FBManager();
		this.dm = new DesktopManager();
	}
	@OnMessage
    public void processUpload(ByteBuffer msg, boolean last, Session session) {
		JSONObject be = new JSONObject();
		JSONObject json = new JSONObject();
		JSONObject data0 = new JSONObject();
		be.put("receiving", json);
		json.put("app", "taskArray.fileBrowser["+this.fbm.getId()+"].fbws");
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
	public void init() {
		this.fbm.setServletContext(this.servletContext);
		this.fbm.setSession(this.session);
	}
	@Override
	public JSONObject onMessage(String message){
		JSONObject json = new JSONObject(message);
		String status = json.getString("status");
		json.remove("status");
		this.fbm.setJSON(json);
		this.fbm.findBrowser();
		this.fbm.init();
		this.fbmSwitchCase(status);
		this.dmSwitchCase(status);
		int id = this.fbm.getId();
		json = new JSONObject();
		if(null != this.fbm.getJson()) {
			json.put("app", "taskArray.fileBrowser["+id+"].fbws");
			json.put("data", this.fbm.getJson());
		}
		return json;
	}
	private void dmSwitchCase(String status){
		if(this.fbm.getRoute() != null && (this.fbm.getUserFolder() + System.getProperty("file.separator") + "Desktop").equals(this.fbm.getRoute().getPath())){
			if(status.equals("newFolder") || status.equals("rename") || status.equals("del") ||	status.equals("paste") || status.equals("uploadStart") || status.equals("pasteToDesktop")){
				this.dm = (DesktopManager) this.session.getAttribute("desktopManager");
				this.dm.setJSONArray(this.fbm.getDesktopJSONArray());
				this.dm.setJSON(this.fbm.getDesktopJSON());
			}
			switch (status) {
				case "del":
					this.dm.delDataIcon();
					break;
				case "uploadStart":
					this.dm.insertDataIcon();
					break;
				case "pasteToDesktop":
					this.dm.insertDataIcon();
					break;
				case "paste":
					this.dm.insertDataIcon();
					break;
				case "rename":
					this.dm.rename();
					break;
				case "newFolder":
					this.dm.newFolder();
					break;
			}
			if(this.dm.isUpdated()){
				this.dm.setUpdated(false);
				JSONObject be = new JSONObject();
				JSONObject json = new JSONObject();
				if(null != this.dm.getJSON()){
					be.put("receiving", json);
					json.put("app", "gui.desktop.socket.receiver");
					json.put("data", this.dm.getJSON());
					try {
						this.websocketSession.getBasicRemote().sendText(be.toString());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		}
	}
	private void fbmSwitchCase(String status){
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
			case "share":
			case "copy":
			case "cut":
				this.fbm.setClipboard(status);
				break;
			case "paste":
				this.fbm.paste();
				break;
			case "pasteToDesktop":
				this.fbm.pasteToDesktop();
				break;
			case "x":
				this.fbm.x();
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


