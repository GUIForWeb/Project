package system.modules;

import java.io.File;

import javax.faces.context.ExternalContext;
import javax.servlet.ServletContext;

import system.daoInterfaces.DataIconsDAO;
import system.daos.DataIconsDAOMySQL;
import system.models.OS;
import system.models.User;

public class DesktopManager {
	private String desktopPath;
	private User user;
	private String root;
	private DataIconsDAO dataIconsDAO;
	private OS os;

	public DesktopManager() {
	}
	
	public void init() {
		this.desktopPath += this.root + "/Desktop";
		File file = new File(this.desktopPath);
		if (!file.exists())
			file.mkdir();
		this.dataIconsDAO = new DataIconsDAOMySQL(this.os);
		this.dataIconsDAO.load();
	}
	public void load() {
		
	}
	public void refresh(){
		System.out.println("refresh");
	}
	
	/*
	private void update(){
		File file = new File(this.desktopPath);
		if (!file.exists())
			file.mkdir();
		long lastModified;
		lastModified = file.lastModified();
		if (lastModified != this.os.getLastModifiedDesktop()) {
			OSsDAO ossDAO = new OSsDAOMySQL();
			ossDAO.setOS(this.os);
			ossDAO.setUser(this.user);
			DataItemsDAO desktopDataDAO = new DataItemsDAO();
			desktopDataDAO.setFilePath(this.desktopPath);
			desktopDataDAO.load();
			this.dataComparison(this.dataIconsDAO.getJSONArray(), desktopDataDAO.getJSONArray(), 0, 0);
			this.dataIconsDAO.update(desktopDataDAO.getJSONArray());
			ossDAO.updateLastModified(lastModified);
		}
	}
	private void dataComparison(JSONArray iconArray, JSONArray dataArray, int iNum, int dNum) {
		boolean flag = false;
		int iLen = iconArray.length();
		int dLen = dataArray.length();
		JSONObject icon = null;
		JSONObject data = null;
		if (!iconArray.isNull(iNum) && !dataArray.isNull(dNum)) {
			icon = (JSONObject) iconArray.get(iNum);
			data = (JSONObject) dataArray.get(dNum);
			if (!icon.toString().equals("{}") && !data.toString().equals("{}")) {
				if (icon.getString("dateModified").equals(data.getString("dateModified"))) {
					if (icon.getLong("size") == icon.getLong("size"))
						if (icon.getString("type").equals(data.getString("type")))
							if (icon.getString("name").equals(data.getString("name"))) {
								iconArray.remove(iNum);
								dataArray.remove(dNum);
								flag = true;
							}
				}
			}
		}
		if (iNum < iLen) {
			if (flag) {
				this.dataComparison(iconArray, dataArray, iNum, 0);
			} else if (iNum < iLen && dNum < dLen) {
				this.dataComparison(iconArray, dataArray, iNum, ++dNum);
			} else if (!flag && dNum == dLen) {
				this.dataComparison(iconArray, dataArray, ++iNum, 0);
			}
		}
	}
	*/
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
}
