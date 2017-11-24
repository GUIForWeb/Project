package apps.fileBrowser.jsfs;

import java.util.HashMap;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import org.json.JSONObject;

import apps.fileBrowser.modules.ShareManager;
import apps.jsfs.ApplicationJSF;
import system.models.SharedUser;

@Named
@RequestScoped
public class Share extends ApplicationJSF {
	private int toId;
	private int suId;
	private String[] permissions;
	private String folder;
	private ShareManager sm;
	private SharedUser[] sharedUsers;
	public Share() {
		super();
		this.sm = new ShareManager();
		JSONObject json = (JSONObject) this.session.getAttribute("clipboard");
		this.folder = json.getString("path") + System.getProperty("file.separator") + json.getJSONArray("data").getJSONObject(0).getString("name");
		this.sm.setUser(this.user);
		this.sm.setFolder(this.folder);
		this.sm.loadSharedUsers();
		this.sharedUsers = this.sm.getSharedUsers();
	}
	public void init() {
		this.redirect();
	}
	public void start() {
		this.sm.setUser(this.user);
		this.sm.setToId(this.toId);
		this.sm.setPermissions(this.permissions);
		this.sm.start();
		this.sharedUsers = this.sm.getSharedUsers();
		this.permissions = null;
	}
	public void stop() {
		this.sm.setSuId(this.suId);
		this.sm.stop();
		this.sharedUsers = this.sm.getSharedUsers(); 
	}
	public String getFolder() {
		return folder;
	}
	public void setFolder(String folder) {
		this.folder = folder;
	}
	public int getToId() {
		return toId;
	}
	public void setToId(int toId) {
		this.toId = toId;
	}
	public SharedUser[] getSharedUsers() {
		return sharedUsers;
	}
	public void setSharedUsers(SharedUser[] sharedUsers) {
		this.sharedUsers = sharedUsers;
	}
	public int getSuId() {
		return suId;
	}
	public void setSuId(int suId) {
		this.suId = suId;
	}
	public String[] getPermissions() {
		return permissions;
	}
	public void setPermissions(String[] permissions) {
		this.permissions = permissions;
	}
}
