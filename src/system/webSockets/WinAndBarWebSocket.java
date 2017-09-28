package system.webSockets;

import java.nio.ByteBuffer;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;

import org.json.JSONObject;

import system.exceptions.WinAndBarException;
import system.modules.WinAndBarRepository;
import system.webSocketInterfaces.WebSocketInterface;

public class WinAndBarWebSocket implements WebSocketInterface  {
	private ServletContext servletContext;
	private Session websocketSession;
	private HttpSession session;
	private EndpointConfig config;
	private WinAndBarRepository repo = new WinAndBarRepository();
	public WinAndBarWebSocket() {
		this.repo = new WinAndBarRepository();
	}
	public void init(){
		this.repo.setConfig(this.config);
		this.repo.setSession(this.session);
		this.repo.setWebsocketSession(this.websocketSession);
		this.repo.setServletContext(this.servletContext);
		this.repo.setUpdated(false);
		this.repo.getSession();
	}
	public JSONObject onMessage(String message){
		JSONObject json = new JSONObject(message);
		//json = json.getJSONObject("data");
		String status = json.getString("status");
		json.remove("status");
		switch(status){
		case "moveWinToTop":
			this.repo.moveWinToTop(json);
			break;
		case "updateContent":
			this.repo.updateContent(json);
			break;
		case "disappear":
			this.repo.disappear(json);
			break;
		case "appear":
			this.repo.appear(json);
			break;
		case "fullScreen":
			this.repo.fullScreen(json);
			break;
		case "position":
			this.repo.changePosition(json);
			break;
		case "newWinAndBar":
			this.repo.newWinAndBar(json);
			break;
		case "xWinAndBar":
			this.repo.xWinAndBar(json);
			break;
		case "resizeend":
			this.repo.resizeend(json);
			break;
		}
		if(this.repo.isUpdated()){
			if(this.repo.isError()){
				WinAndBarException exception = new WinAndBarException();
				this.onError(exception);
			}
		}
		this.repo.setSession();
		return new JSONObject();
	}
	@Override
	public void onError(Throwable exception) {
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
	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}
	@Override
	public void processUpload(ByteBuffer msg, boolean last, Session session) {
		// TODO Auto-generated method stub
		
	}
}
