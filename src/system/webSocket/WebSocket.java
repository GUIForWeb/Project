package system.webSocket;


import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

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

import system.library.ServletAwareConfig;
import system.webSocketInterface.WebSocketInterface;

@ServerEndpoint(value = "/ws", configurator=ServletAwareConfig.class)
public class WebSocket{
	private ServletContext servletContext;
	private Session websocketSession;
	private HttpSession session;
	private EndpointConfig config;
	private WebSocketInterface wsi;
	private Class<?> tmpClass;
	private Object tmpObj;
	public WebSocket(){
	}
	
	@OnOpen
	public void onOpen(Session websocketSession, EndpointConfig config){
		this.websocketSession = websocketSession;
		this.config = config;
		this.session = (HttpSession) config.getUserProperties().get("httpSession");
		this.servletContext = this.session.getServletContext();
	}
	
	@OnMessage
	public String onMessage(String message){
		JSONObject json = new JSONObject(message);
		JSONObject be = new JSONObject(); 
		Method tmpMethod = null;
		try {
			json = json.getJSONObject("sending");
			this.tmpClass = Class.forName(json.getString("app"));
			this.wsi = (WebSocketInterface) this.tmpClass.getConstructor().newInstance();
			this.wsi.setConfig(this.config);
			this.wsi.setSession(this.session);
			this.wsi.setWebsocketSession(this.websocketSession);
			this.wsi.setServletContext(this.servletContext);
			json = this.wsi.onMessage(json.getJSONObject("data").toString());
			
		} catch (ClassNotFoundException | JSONException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(json.length() !=0 )
			be.put("receiving", json);
		return be.toString();
	}

	@OnError
	public void onError(Throwable exception){
		this.wsi.onError(exception);
	}
	
	@OnClose
	public void onClose(){
	}
}
