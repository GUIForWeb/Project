package apps.fileBrowser.models;

import system.models.Route;

public class Browser {
	private int id;
	private boolean isWeb;
	private Route route;
	private Route[] routes;
	private boolean isLocal;
	public Browser(){
		this.id = 0;
		this.isWeb = false;
		this.isLocal = true;
	}
	public Route getRoute() {
		return route;
	}
	public void setRoute(Route route) {
		this.route = route;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isWeb() {
		return isWeb;
	}
	public void setWeb(boolean isWeb) {
		this.isWeb = isWeb;
	}
	public Route[] getRoutes() {
		return routes;
	}
	public void setRoutes(Route[] routes) {
		this.routes = routes;
	}
	public boolean isLocal() {
		return isLocal;
	}
	public void setLocal(boolean isLocal) {
		this.isLocal = isLocal;
	}
	public String toString(){
		String str = "";
		str += "ID         :"+this.id + System.getProperty("line.separator");
		if(this.routes != null && this.routes.length != 0) 
			for(int pi=0; pi<this.routes.length; pi++)
				str += this.routes[pi] + System.getProperty("line.separator");
		str += "Is Web     :"+this.isWeb;
		return str;
	}
}
