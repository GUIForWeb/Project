package apps.fileBrowser.models;

import system.models.Route;

public class Browser {
	private int id;
	private boolean isWeb;
	private Route route;
	private Route[] SharedRoutes;
	private boolean isPrivate;
	public Browser(){
		this.id = 0;
		this.isWeb = false;
		this.isPrivate = true;
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
	public Route[] getSharedRoutes() {
		return SharedRoutes;
	}
	public void setSharedRoutes(Route[] SharedRoutes) {
		this.SharedRoutes = SharedRoutes;
	}
	public boolean isPrivate() {
		return isPrivate;
	}
	public void setPrivate(boolean isPrivate) {
		this.isPrivate = isPrivate;
	}
	public String toString(){
		String str = "";
		str += "ID         :"+this.id + System.getProperty("line.separator");
		str += this.route + System.getProperty("line.separator");
		str += "=========Shared Routes========" + System.getProperty("line.separator");
		if(this.SharedRoutes != null && this.SharedRoutes.length != 0) 
			for(int pi=0; pi<this.SharedRoutes.length; pi++)
				str += this.SharedRoutes[pi] + System.getProperty("line.separator");
		str += "Is Web     :"+this.isWeb;
		return str;
	}
}
