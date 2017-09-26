package system.webSockets;

import java.nio.ByteBuffer;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;

import org.json.JSONObject;

import system.exceptions.GUIException;
import system.modules.GUIRepository;
import system.webSocketInterfaces.WebSocketInterface;

public class GUIWebSocket implements WebSocketInterface  {
	private ServletContext servletContext;
	private Session websocketSession;
	private HttpSession session;
	private EndpointConfig config;
	private GUIRepository gr = new GUIRepository();
	public GUIWebSocket() {
		this.gr = new GUIRepository();
	}
	public void init(){
		this.gr.setConfig(this.config);
		this.gr.setSession(this.session);
		this.gr.setWebsocketSession(this.websocketSession);
		this.gr.setServletContext(this.servletContext);
		this.gr.setUpdated(false);
		this.gr.getSession();
	}
	public JSONObject onMessage(String message){
		JSONObject json = new JSONObject(message);
		//json = json.getJSONObject("data");
		String status = json.getString("status");
		json.remove("status");
		switch(status){
		case "moveWinToTop":
			this.gr.moveWinToTop(json);
			break;
		case "updateContent":
			this.gr.updateContent(json);
			break;
		case "disappear":
			this.gr.disappear(json);
			break;
		case "appear":
			this.gr.appear(json);
			break;
		case "fullScreen":
			this.gr.fullScreen(json);
			break;
		case "position":
			this.gr.changePosition(json);
			break;
		case "newWinAndBar":
			this.gr.newWinAndBar(json);
			break;
		case "xWinAndBar":
			this.gr.xWinAndBar(json);
			break;
		case "resizeend":
			this.gr.resizeend(json);
			break;
		}
		if(this.gr.isUpdated()){
			if(this.gr.isError()){
				GUIException e = new GUIException();
				this.onError(e);
			}
		}
		this.gr.setSession();
		return new JSONObject();
	}
	@Override
	public void onError(Throwable exception) {
		// TODO Auto-generated method stub
		
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
	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}
	@Override
	public void processUpload(ByteBuffer msg, boolean last, Session session) {
		// TODO Auto-generated method stub
		
	}
}
