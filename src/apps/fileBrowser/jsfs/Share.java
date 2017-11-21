package apps.fileBrowser.jsfs;

import java.util.Map;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import org.json.JSONObject;

import apps.fileBrowser.modules.ShareManager;
import apps.jsfs.ApplicationJSF;
import system.models.SharedUser;
@Named
@ApplicationScoped
public class Share extends ApplicationJSF {
	private int toId;
	private String[] permissions;
	private String folder;
	private ShareManager sm;
	private Map<Integer, SharedUser> sharedUserMap;
	public Share() {
		this.sm = new ShareManager();
	}
	public void init() {
		this.redirect();
		JSONObject json = (JSONObject) this.session.getAttribute("clipboard");
		this.folder = json.getString("path") + System.getProperty("file.separator") + json.getJSONArray("data").getJSONObject(0).getString("name");
		this.sm.setUser(this.user);
		this.sm.setFolder(this.folder);
		this.sm.loadSharedUsers();
	}
	public void start() {
		this.sm.setUser(this.user);
		this.sm.setToId(this.toId);
		this.sm.setPermissions(this.permissions);
		this.sm.start();
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
	public String[] getPermissions() {
		return permissions;
	}
	public void setPermissions(String[] permissions) {
		this.permissions = permissions;
	}
	public Map<Integer, SharedUser> getSharedUserMap() {
		return sharedUserMap;
	}
	public void setSharedUserMap(Map<Integer, SharedUser> sharedUserMap) {
		this.sharedUserMap = sharedUserMap;
	}
}
