package system.webSockets;

import java.nio.ByteBuffer;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;

import org.json.JSONObject;

import system.modules.DesktopManager;
import system.webSocketInterfaces.WebSocketInterface;

public class DesktopWebSocket implements WebSocketInterface {
	@SuppressWarnings("unused")
	private ServletContext servletContext;
	@SuppressWarnings("unused")
	private Session websocketSession;
	private HttpSession session;
	@SuppressWarnings("unused")
	private EndpointConfig config;
	private DesktopManager dm;
	public DesktopWebSocket(){
	}
	public void init(){
		this.dm = (DesktopManager) this.session.getAttribute("desktopManager");
	}
	@Override
	public JSONObject onMessage(String message) {
		JSONObject json = new JSONObject(message);
		String status = json.getString("status");
		json.remove("status");
		this.dm.setJSON(json);
		switch(status){
			case "iconXY":
				this.dm.iconXY();
				break;
			case "dataIconXY":
				this.dm.dataIconXY();
				break;
			case "dataIconXYs":
				this.dm.dataIconXYs();
				break;
		}
		
		json = new JSONObject();
		return json;
	}
	@Override
	public void onError(Throwable exception) {
		
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
	/*
	private int winNum;
	private String status;
	private String param;
	private String forms;
	private List<Window> windowList;
	private List<Window> windowInBarList;
	private List<Bar> barList;
	public GUIManager(){
		this.getSession();
	}
	public String listen(){
		String str = "";
		switch(this.status){
			case "wMode":
				this.wMode();
				break;
			case "newWindow":
				this.newWindow();
				break;
			case "newBar":
				this.newBar();
				break;
			case "hide":
				this.hide();
				break;
			case "screenOn":
				this.screenOn();
				break;
			case "x":
				this.x();
				break;
			case "resize":
				this.resize();
				break;
			case "changeWinVal":
				this.changeWinVal();
				break;
			case "iconXY":
				this.iconXY();
				break;
			case "content":
				this.content();
				break;
			case "form":
				this.form();
				break;
		}
		return str;
	}
	public void wMode(){
		this.session.setAttribute("wMode", true);
	}
	public void form(){
		this.forms = this.param;
		this.session.setAttribute("forms", this.forms);
	}
	public void content(){
		Window tmpWin = this.window();
		for(int wi=0; wi<this.windowList.size(); wi++){
			if(this.windowList.get(wi).getNumId() == tmpWin.getNumId()){
				this.windowList.remove(wi);
				this.windowList.add(wi,tmpWin);
				break;
			}
		}
	}
	public void iconXY(){
		IconInOS tmpIconInOS = iconInOS();
		OSSetting osSetting = (OSSetting) this.session.getAttribute("osSetting");
		tmpIconInOS.setOSId(osSetting.getId());
		IconsInOSDAO iconsInOSDAO = new IconsInOSDAOMySQL();
		iconsInOSDAO.updateXY(tmpIconInOS);
	}
	private IconInOS iconInOS(){
		String[] paramArray = this.param.split("&");
		for(int pi=0; pi<paramArray.length; pi++){
			paramArray[pi] = paramArray[pi].split("=")[1];
		}
		return new IconInOS(paramArray);
	}
	private void changeWinVal() { 
		Window tmpWin = this.window();
		int bNum = this.windowList.size();
		for(int wi=0; wi<this.windowList.size(); wi++){
			if(this.windowList.get(wi).getNumId() == tmpWin.getNumId()){
				bNum = wi;
			}
			else if(bNum < wi){
				this.windowList.get(wi).setZIndex((this.windowList.get(wi).getZIndex()-1));
			}
		}
		for(int wi=0; wi<this.windowList.size(); wi++){
			if(this.windowList.get(wi).getNumId() == tmpWin.getNumId()){
				this.windowList.remove(wi);
				this.windowList.add(tmpWin);
				break;
			}
		}
	}
	private void resize() {
		Window tmpWin = this.window();
		for(int wi=0; wi<this.windowList.size(); wi++){
			if(this.windowList.get(wi).getNumId() == tmpWin.getNumId()){
				this.windowList.remove(wi);
				this.windowList.add(wi,tmpWin);
				break;
			}
		}
	}
	private void x(){
		Bar tmpBar = this.bar();
		this.barList.remove(tmpBar.getNumId());
		int bNum = this.windowList.size();
		for(int wi=0; wi<this.windowList.size(); wi++){
			if(this.windowList.get(wi).getNumId() == tmpBar.getWNumId()){
				bNum = wi;
			}
			else if(bNum < wi){
				this.windowList.get(wi).setZIndex((this.windowList.get(wi).getZIndex()-1));
			}
			if(this.windowList.get(wi).getBNumId() > tmpBar.getNumId()){
				this.windowList.get(wi).setBNumId(this.windowList.get(wi).getBNumId()-1);	
			}
		}
		for(int wi=0; wi<this.windowList.size(); wi++){
			if(this.windowList.get(wi).getNumId() == tmpBar.getWNumId()){
				this.windowList.remove(wi);
				break;
			}
		}
		for(int bi=0; bi<this.barList.size(); bi++){
			if(this.barList.get(bi).getNumId()>tmpBar.getNumId()){
				this.barList.get(bi).setNumId(this.barList.get(bi).getNumId()-1);
			}
		}
	}
	private void screenOn(){
		Bar tmpBar = this.bar();
		this.barList.remove(tmpBar.getNumId());
		this.barList.add(tmpBar.getNumId(),tmpBar);
		for(int bi=0; bi<this.windowInBarList.size(); bi++){
			if(this.windowInBarList.get(bi).getBNumId() == tmpBar.getNumId()){
				Window tmpWindow  = this.windowInBarList.get(bi);
				tmpWindow.setZIndex(this.windowList.size());
				this.windowList.add(tmpWindow);
				this.windowInBarList.remove(bi);
				break;
			}
		}
		this.setSession();
	}
	private void hide(){
		Bar tmpBar = this.bar();
		this.barList.remove(tmpBar.getNumId());
		this.barList.add(tmpBar.getNumId(),tmpBar);
		int bNum = this.windowList.size();
		for(int wi=0; wi<this.windowList.size(); wi++){
			if(this.windowList.get(wi).getNumId() == tmpBar.getWNumId()){
				this.windowInBarList.add(this.windowList.get(wi));
				bNum = wi;
			}
			else if(bNum < wi){
				this.windowList.get(wi).setZIndex((this.windowList.get(wi).getZIndex()-1));
			}
		}
		for(int wi=0; wi<this.windowList.size(); wi++){
			if(this.windowList.get(wi).getNumId() == tmpBar.getWNumId()){
				this.windowList.remove(wi);
				break;
			}
		}
		this.setSession();
	}
	private void newWindow(){
		Window tmpWin = this.window();
		this.winNum++;
		if(this.winNum == 100)
			this.winNum = 1;
		this.windowList.add(tmpWin);
		this.setSession();
	}
	private void newBar(){
		Bar tmpBar = this.bar();
		this.barList.add(tmpBar);
		this.setSession();
	}
	private Window window(){
		String[] paramArray = this.param.split("&");
		String[] valArray = new String[15];
		String value = "";
		for (int pi=0; pi<paramArray.length; pi++){
			value = paramArray[pi];
			valArray[pi] = value.replace(value.split("=")[0]+"=","");
		}
		return new Window(valArray);
	}
	private Bar bar(){
		String[] paramArray = this.param.split("&");
		for(int pi=0; pi<paramArray.length; pi++){
			paramArray[pi] = paramArray[pi].split("=")[1];
		}
		return new Bar(paramArray);
	}
	
	private void getSession(){
		if(null != this.session.getAttribute("winNum"))
			this.winNum = (int) this.session.getAttribute("winNum");
		else
			this.winNum = 0;
		
		if(null != this.session.getAttribute("windowList"))
			this.windowList = (List<Window>) this.session.getAttribute("windowList");
		else
			this.windowList = new ArrayList<Window>();
		
		if(null != this.session.getAttribute("windowInBarList"))
			this.windowInBarList = (List<Window>) this.session.getAttribute("windowInBarList");
		else
			this.windowInBarList = new ArrayList<Window>();
		
		if(null != this.session.getAttribute("barList"))
			this.barList = (List<Bar>) this.session.getAttribute("barList");
		else
			this.barList = new ArrayList<Bar>();
	}
	
	private void setSession(){
		this.session.setAttribute("winNum", this.winNum);
		this.session.setAttribute("windowInBarList", this.windowInBarList);
		this.session.setAttribute("barList", this.barList);
		this.session.setAttribute("windowList", this.windowList);
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getParam() {
		return param;
	}
	public void setParam(String param) {
		this.param = param;
	}
	public String getForms() {
		return forms;
	}
	public void setForms(String forms) {
		this.forms = forms;
	}
	public int getWinNum() {
		return winNum;
	}
	public void setWinNum(int winNum) {
		this.winNum = winNum;
	}
	*/

	@Override
	public void processUpload(ByteBuffer msg, boolean last, Session session) {
		// TODO Auto-generated method stub
		
	}
}
