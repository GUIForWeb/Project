package system.webSocketInterfaces;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;

import org.json.JSONObject;

public interface WebSocketInterface{
	public JSONObject onMessage(String message);
	public void onError(Throwable exception);
	public void setSession(HttpSession session); 
	public void setWebsocketSession(Session websocketSession);
	public void setConfig(EndpointConfig config);
	public void setServletContext(ServletContext servletContext);
}
