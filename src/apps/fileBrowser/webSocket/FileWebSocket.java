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
	public FileWebSocket(){
		this.fbm = new FBManager();
	}
	
	@OnOpen
	public void onOpen(Session websocketSession, EndpointConfig config){
		this.websocketSession = websocketSession;
		this.config = config;
		this.session = (HttpSession) config.getUserProperties().get("httpSession");
		this.servletContext = this.session.getServletContext();
	}
	@OnMessage
    public void processUpload(ByteBuffer msg, boolean last, Session session) {
        while(msg.hasRemaining()) {
        	this.fbm.fileUploading(msg);
        }
    }
	@OnMessage
	public String onMessage(String message){
		JSONObject json = null;
		JSONObject be = new JSONObject();
		if(!message.equals("?end")){
			json = new JSONObject(message);
			this.fbm.setServletContext(this.servletContext);
			this.fbm.setSession(this.session);
			this.fbm.setJson(json);
			this.fbm.findBrowser();
			this.fbm.fileUploadStart();
		}
		else {
			this.fbm.uploadDone();
			if(this.fbm.getJson().length() !=0 ) {
				json = new JSONObject();
				json.put("app", "taskArray.fileBrowser["+this.fbm.getId()+"].fbm");
				json.put("data", this.fbm.getJson());
				be.put("receiving", json);
			}
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
