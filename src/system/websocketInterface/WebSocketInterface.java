package system.websocketInterface;

import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;

public interface WebSocketInterface{
	public String onMessage(String message);
	public void onError(Throwable exception);
	public void setSession(HttpSession session); 
	public void setWebsocketSession(Session websocketSession);
	public void setConfig(EndpointConfig config);
}
