package system.modules;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import system.daoInterfaces.DataIconsDAO;
import system.daoInterfaces.IconsInOSDAO;
import system.daos.DataIconsDAOMySQL;
import system.daos.DataItemsDAO;
import system.daos.IconsInOSDAOMySQL;
import system.models.DataItem;
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
	private HttpServletResponse response;
	
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
	}
	public void download() {
		JSONObject data = this.json.getJSONObject("data");
		File tmpFile;
		String name;
		String type;
		name = data.getString("name");
		type = data.getString("type");
		tmpFile = new File(this.desktopPath + "/" + name);
		byte[] outputByte = new byte[4096];
		this.response.setCharacterEncoding("ISO-8859-1");
		this.response.setContentType(type);
		this.response.setHeader("Content-Disposition", "attachment;filename=\"" + name + "\"");
		try {
			ServletOutputStream out = this.response.getOutputStream();
			FileInputStream fis = new FileInputStream(tmpFile);
			int size = (int) tmpFile.length();
			if (size > 4096)
				size = 4096;
			while (fis.read(outputByte, 0, size) != -1) {
				out.write(outputByte, 0, size);
			}
			fis.close();
			out.flush();
			out.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void del() {
		JSONObject tmpJSON;
		JSONArray data = this.json.getJSONArray("data");
		boolean success = false;
		String path;
		String type;
		File dest = null;
		this.jsonArray = new JSONArray();
		for (int di = 0; di < data.length(); di++) {
			tmpJSON = data.getJSONObject(di);
			path = this.desktopPath + "/" + tmpJSON.getString("name");
			type = tmpJSON.getString("type");
			dest = new File(path);
			if(dest.exists())
				this.makeDesktopArray(dest);
			if (type.contains("directory")) {
				try {
					FileUtils.deleteDirectory(dest);
					success = true;
				} catch (IOException e) {
					e.printStackTrace();
					break;
				}
			} else {
				if (dest.delete()) {
					success = true;
				} else {
					break;
				}
			}
		}
		if (success)
			this.delDataIcon();
	}
	public void paste() {
		JSONObject clipboard = (JSONObject) this.session.getAttribute("clipboard");
		if (clipboard != null) {
			this.jsonArray = new JSONArray();
			String status = clipboard.getString("status");
			String path = clipboard.getString("path");
			JSONArray data = clipboard.getJSONArray("data");
			if(!(path.equals(this.desktopPath) && status.equals("cut"))) {
				this.checkExistence(status, data, path, this.desktopPath);
				this.insertDataIcon();
			}
			this.session.removeAttribute("clipboard");
			this.isUpdated = true;
		}
	}
	private void checkExistence(String status, JSONArray data, String srcPath, String destPath) {
		if (data.length() != 0) {
			JSONObject tmpJSON = data.getJSONObject(0);
			String name = tmpJSON.getString("name");
			String type = tmpJSON.getString("type");
			data.remove(0);
			this.checkExistence(status, data, srcPath, destPath);
			File src = new File(srcPath + "/" + name);
			File dest = new File(destPath + "/" + name);
			if (dest.exists()) {
				if (type.equals("inode/directory")) {
					destPath = destPath + "/" + name;
					srcPath = srcPath + "/" + name;
					this.dataItemsDAO.setFilePath(destPath);
					this.dataItemsDAO.load();
					JSONArray tmpData = this.dataItemsDAO.getJSONArray();
					this.checkExistence(status, tmpData, srcPath, destPath);
				} else {
					String ext = name.substring(name.lastIndexOf(".") + 1, name.length());
					name = name.substring(0, name.lastIndexOf("."));
					dest = this.checkDest(destPath, name, 0, ext);
					if (status.equals("copy")) {
						try {
							FileUtils.copyFile(src, dest);
							
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} else if (status.equals("cut")) {
						try {
							FileUtils.moveFile(src, dest);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
					this.makeDesktopArray(dest);
				}
			} else {
				if (type.equals("directory")) {
					dest = new File(destPath);
					if (status.equals("copy")) {
						try {
							FileUtils.copyDirectoryToDirectory(src, dest);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} else if (status.equals("cut")) {
						try {
							FileUtils.moveDirectoryToDirectory(src, dest, true);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				} else {
					if (status.equals("copy")) {
						try {
							FileUtils.copyFile(src, dest);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} else if (status.equals("cut")) {
						try {
							FileUtils.moveFile(src, dest);
							
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						this.makeDesktopArray(dest);
					}
				}
			}
		}
	}
	private void makeDesktopArray(File file){
		String path = file.getPath();
		int lIdx = path.lastIndexOf("/");
		path = path.substring(0,lIdx);
		if(path.equals(this.desktopPath)) {
			DataItem tmpDI = new DataItem();
			try {
				tmpDI.setType(Files.probeContentType(file.toPath()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			tmpDI.setName(file.getName());
			SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
			tmpDI.setLastModified(file.lastModified());
			tmpDI.setDateModified(sdf.format(file.lastModified()));
			tmpDI.setSize(file.length());
			this.jsonArray.put(tmpDI.getJSON());
		}
	}
	private File checkDest(String destPath, String name, int num, String ext) {
		File dest = new File(destPath + "/" + name + "_" + num + "." + ext);
		if (dest.exists()) {
			dest = this.checkDest(destPath, name, num + 1, ext);
		}
		return dest;
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
		if(this.jsonArray.length() != 0) {
			this.dataIconsDAO.insert(this.jsonArray);
			this.dataIconsDAO.load();
			JSONArray newIconArray = this.dataComparison(new JSONArray(), this.dataIconsDAO.getJSONArray(), this.jsonArray,	0, 0);
			this.dataItemsDAO.load();
			JSONArray dataJSONArray = this.dataItemsDAO.getJSONArray();
			this.assembleData(newIconArray,dataJSONArray,0,0);
			this.jsonArray = newIconArray;
			this.isUpdated = true;
			this.json = new JSONObject();
			this.json.put("status", "appendDataIcon");
			this.json.put("data", this.jsonArray);
		}
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
	public HttpServletResponse getResponse() {
		return response;
	}
	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}
}
