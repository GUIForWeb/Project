package system.modules;

import java.io.File;

import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import system.daoInterfaces.DataIconsDAO;
import system.daoInterfaces.IconsInOSDAO;
import system.daos.DataIconsDAOMySQL;
import system.daos.DataItemsDAO;
import system.daos.IconsInOSDAOMySQL;
import system.models.OS;
import system.models.User;

public class DesktopManager {
	private String desktopPath;
	private User user;
	private String root;
	private DataIconsDAO dataIconsDAO;
	private DataItemsDAO dataItemsDAO;
	private OS os;
	private JSONObject json;
	private JSONArray jsonArray;
	private boolean isUpdated;
	private IconsInOSDAO iconsInOSDAO;
	private HttpSession session;
	
	public DesktopManager() {
		this.isUpdated = false;
	}
	public void init() {
		this.desktopPath = "";
		this.desktopPath += this.root + "/Desktop";
		File file = new File(this.desktopPath);
		if (!file.exists())
			file.mkdir();
		this.iconsInOSDAO = new IconsInOSDAOMySQL(this.os);
		this.dataIconsDAO = new DataIconsDAOMySQL(this.os);
		this.dataIconsDAO.load();
		this.dataItemsDAO = new DataItemsDAO(this.desktopPath);
		this.dataItemsDAO.load();
		JSONArray iconJSONArray = this.dataIconsDAO.getJSONArray();
		JSONArray dataJSONArray = this.dataItemsDAO.getJSONArray();
		this.assembleData(iconJSONArray,dataJSONArray,0,0);
		System.out.println(iconJSONArray);
	}
	public void paste() {
		JSONObject clipboard = (JSONObject) this.session.getAttribute("clipboard");
		if (clipboard != null) {
			String status = clipboard.getString("status");
			String path = clipboard.getString("path");
			JSONArray data = clipboard.getJSONArray("data");
			System.out.println(clipboard);
			//from other folder
			//desktop to desktop
			
			if(status.equals("cut")) {
			
			}
			this.session.removeAttribute("clipboard");
		}
	}
	public void setClipboard(String status) {
		this.json.put("path", this.desktopPath);
		this.json.put("status", status);
		this.session.setAttribute("clipboard", this.json);
	}
	
	private void assembleData(JSONArray iconArray, JSONArray dataArray, int iNum, int dNum ){
		boolean flag = false;
		int iLen = iconArray.length();
		int dLen = dataArray.length();
		JSONObject icon = null;
		JSONObject data = null;
		if (!iconArray.isNull(iNum) && !dataArray.isNull(dNum)) {
			icon = (JSONObject) iconArray.get(iNum);
			data = (JSONObject) dataArray.get(dNum);
			if (!icon.toString().equals("{}") && !data.toString().equals("{}")) {
						if (icon.getString("type").equals(data.getString("type")))
							if (icon.getString("name").equals(data.getString("name"))) {
								icon.put("size", data.getInt("size"));
								icon.put("dateModified", data.getString("dateModified"));
								flag = true;
							}
			}
		}
		if (iNum < iLen) {
			if (flag) {
				this.assembleData(iconArray, dataArray, ++iNum, 0);
			} else if (iNum < iLen && dNum < dLen) {
				this.assembleData(iconArray, dataArray, iNum, ++dNum);
			} else if (!flag && dNum == dLen) {
				this.assembleData(iconArray, dataArray, ++iNum, 0);
			}
		}
	}
	
	public void newFolder() {
		this.jsonArray = new JSONArray();
		this.jsonArray.put(this.json);
		this.insertDataIcon();
	}
	public void insertDataIcon() {
		this.dataIconsDAO.insert(this.jsonArray);
		this.dataIconsDAO.load();
		JSONArray newIconArray = this.dataComparison(new JSONArray(), this.dataIconsDAO.getJSONArray(), this.jsonArray,	0, 0);
		this.jsonArray = newIconArray;
		this.isUpdated = true;
		this.json = new JSONObject();
		this.json.put("status", "appendDataIcon");
		this.json.put("data", this.jsonArray);
	}
	public void renameOnDesktop() {
		String srcStr = this.desktopPath + "/" + this.json.getString("src");
		String destStr = this.desktopPath + "/" + this.json.getString("dest");
		File src = new File(srcStr);
		File dest = new File(destStr);
		if (!src.equals(dest) ) {
			src.renameTo(dest);
		}
		else {
			this.json.put("dest", this.json.getString("src"));
		}
		this.rename();
	}
	public void rename() {
		this.dataIconsDAO.rename(this.json);
		this.json.remove("src");
		JSONObject json = new JSONObject();
		json.put("status","rename");
		json.put("data",this.json);
		this.json = json;
		this.isUpdated = true;
	}
	public void dataIconXYs(){
		this.jsonArray = this.json.getJSONArray("data");
		if(this.jsonArray.length() > 0)
			this.dataIconsDAO.updateXYs(this.jsonArray);
	}
	public void iconXY() {
		this.iconsInOSDAO.updateXY(this.json);
	}
	public void dataIconXY() {
		this.dataIconsDAO.updateXY(this.json);
	}
	public void delDataIcon() {
		if(this.jsonArray.length() != 0) {
			String ids = this.dataIconsDAO.delete(this.jsonArray);
			this.dataIconsDAO.load();
			this.isUpdated = true;
			this.json = new JSONObject();
			this.json.put("status", "delDataIcon");
			this.json.put("data", ids.substring(0,ids.length()-1));
		}
	}

	private JSONArray dataComparison(JSONArray newIconArray, JSONArray iconArray, JSONArray dataArray, int iNum, int dNum) {
		boolean flag = false;
		int iLen = iconArray.length();
		int dLen = dataArray.length();
		JSONObject icon = null;
		JSONObject data = null;
		if (!iconArray.isNull(iNum) && !dataArray.isNull(dNum)) {
			icon = (JSONObject) iconArray.get(iNum);
			data = (JSONObject) dataArray.get(dNum);
			if (!icon.toString().equals("{}") && !data.toString().equals("{}")) {
						if (icon.getString("type").equals(data.getString("type")))
							if (icon.getString("name").equals(data.getString("name"))) {
								newIconArray.put(iconArray.getJSONObject(iNum));
								flag = true;
							}
			}
		}
		if (iNum < iLen) {
			if (flag) {
				this.dataComparison(newIconArray, iconArray, dataArray, ++iNum, 0);
			} else if (iNum < iLen && dNum < dLen) {
				this.dataComparison(newIconArray, iconArray, dataArray, iNum, ++dNum);
			} else if (!flag && dNum == dLen) {
				this.dataComparison(newIconArray, iconArray, dataArray, ++iNum, 0);
			}
		}
		return newIconArray;
	}
	
	public String getDesktopPath() {
		return desktopPath;
	}

	public void setDesktopPath(String desktopPath) {
		this.desktopPath = desktopPath;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public OS getOS() {
		return os;
	}

	public void setOS(OS os) {
		this.os = os;
	}

	public DataIconsDAO getDataIconsDAO() {
		return dataIconsDAO;
	}

	public void setDataIconsDAO(DataIconsDAO dataIconsDAO) {
		this.dataIconsDAO = dataIconsDAO;
	}

	public String getRoot() {
		return root;
	}

	public void setRoot(String root) {
		this.root = root;
	}

	public JSONObject getJSON() {
		return json;
	}

	public void setJSON(JSONObject json) {
		this.json = json;
	}

	public JSONArray getJSONArray() {
		return jsonArray;
	}

	public void setJSONArray(JSONArray jsonArray) {
		this.jsonArray = jsonArray;
	}

	public boolean isUpdated() {
		return isUpdated;
	}

	public void setUpdated(boolean isUpdated) {
		this.isUpdated = isUpdated;
	}
	
	public HttpSession getSession() {
		return session;
	}
	
	public void setSession(HttpSession session) {
		this.session = session;
	}
}
