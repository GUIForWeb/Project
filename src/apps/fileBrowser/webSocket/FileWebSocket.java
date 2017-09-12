package apps.fileBrowser.webSocket;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.ByteBuffer;

import javax.enterprise.context.RequestScoped;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.tomcat.util.descriptor.web.ContextHandler;
import org.json.JSONException;
import org.json.JSONObject;

import apps.fileBrowser.module.FBManager;
import system.library.ServletAwareConfig;
import system.webSocketInterface.WebSocketInterface;


@ServerEndpoint(value = "/fs", configurator=ServletAwareConfig.class)
public class FileWebSocket{
	private ServletContext servletContext;
	private Session websocketSession;
	private HttpSession session;
	private EndpointConfig config;
	private FBManager fbm;
	private int per;
	public FileWebSocket(){
		this.fbm = new FBManager();
	}
	
	@OnOpen
	public void onOpen(Session websocketSession, EndpointConfig config){
		this.websocketSession = websocketSession;
		this.config = config;
		this.session = (HttpSession) config.getUserProperties().get("httpSession");
		this.servletContext = this.session.getServletContext();
		this.fbm.setServletContext(this.servletContext);
		this.fbm.setSession(this.session);
		this.fbm.setWebsocketSession(this.websocketSession);
	}
	@OnMessage
    public void processUpload(ByteBuffer msg, boolean last, Session session) {
		JSONObject be = new JSONObject();
		JSONObject json = new JSONObject();
		JSONObject data0 = new JSONObject();
		JSONObject data1 = new JSONObject();
		be.put("receiving", json);
		json.put("app", "taskArray.fileBrowser["+this.fbm.getId()+"].fbm");
		json.put("data", data0);
		data0.put("status", "%");
		data0.put("data",data1);
		while(msg.hasRemaining()) {
			this.fbm.fileUploading(msg);
			if(this.fbm.getFos().getByteCount() % this.per == 0){
				data1.put("byteCount", this.fbm.getFos().getByteCount());
	        	try {
					session.getBasicRemote().sendText(be.toString());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
        }
    }
	
	@OnMessage
	public String onMessage(String message){
		JSONObject be = new JSONObject();
		JSONObject json = new JSONObject(message);
		if(json.getString("status").equals("end")) {
			this.fbm.uploadDone();
			if(this.fbm.getJson().length() !=0 ) {
				json = new JSONObject();
				json.put("app", "taskArray.fileBrowser["+this.fbm.getId()+"].fbm");
				json.put("data", this.fbm.getJson());
				be.put("receiving", json);
			}
		}else if(json.getString("status").equals("fileUpload")) {
			this.fbm.setJson(json);
			this.fbm.findBrowser();
			this.fbm.fileUploadStart();
			int size = json.getInt("size");
			String sizeStr = String.valueOf(size);
			int sizeLen = String.valueOf(size).length();
			this.per = (Integer.valueOf(String.valueOf(sizeStr.charAt(0))) + 1);
			this.per = (int) (this.per * Math.pow(10,sizeLen));
			this.per= ((this.per/100000000)+1) * 3;
			this.per = size / this.per;
		}
		return be.toString();
	}

	@OnError
	public void onError(Throwable exception){
	}
	
	@OnClose
	public void onClose(){
	}
}
