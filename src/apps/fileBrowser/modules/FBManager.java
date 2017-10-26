package apps.fileBrowser.modules;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import apps.fileBrowser.libraries.FBFileOutputStream;
import apps.fileBrowser.models.Browser;
import system.daos.ios.DataItemsDAO;
import system.models.DataItem;

public class FBManager {
	private int id;
	private String root;
	private String path = "";
	private String desktopPath = "";
	private JSONObject json;
	private List<Browser> browserList;
	private DataItemsDAO dataItemDAO;
	private JSONArray jsonArray;
	private HttpSession session;
	private Browser browser;
	private ServletContext servletContext;
	private FBFileOutputStream fileOutputStream;
	private Session websocketSession;
	private HttpServletResponse response;
	private int per;
	private JSONArray desktopJSONArray;
	private JSONObject desktopJSON;

	public FBManager() {
		this.dataItemDAO = new DataItemsDAO();
	}

	private void setSession() {
		this.session.setAttribute("browserList", this.browserList);
	}

	public void findBrowser() {
		this.getSession();
		this.id = this.json.getInt("id");
		this.browser = new Browser();
		for (Browser b : this.browserList) {
			if (b.getId() == this.id) {
				this.browser = b;
				break;
			}
		}
		this.path = this.browser.getPath();
	}

	public void isNotInWindow() {
		this.browser.setWeb(true);
	}

	private void multiReloadForUpload() {
		this.multiReload();
		this.json.put("status", "multiReloadForUpload");
	}

	private void reload() {
		this.dataItemDAO.setFilePath(this.path);
		this.dataItemDAO.load();
		this.jsonArray = this.dataItemDAO.getJSONArray();
		this.json = new JSONObject();
		this.json.put("status", "reload");
		String path = this.path.replace(this.root, "");
		this.json.put("path", path);
		this.json.put("data", this.jsonArray);
	}

	private void multiReload() {
		if (this.browser.isWeb()) {
			this.reload();
		} else {
			JSONArray ids = new JSONArray();
			JSONObject data = new JSONObject();
			this.dataItemDAO.setFilePath(this.path);
			this.dataItemDAO.load();
			this.jsonArray = this.dataItemDAO.getJSONArray();
			for (Browser b : this.browserList) {
				if (b.getPath().equals(this.path) && !b.isWeb()) {
					ids.put(b.getId());
				}
			}
			this.json = new JSONObject();
			this.json.put("status", "multiReload");
			data.put("id", ids);
			data.put("data", this.jsonArray);
			String path = this.path.replace(this.root, "");
			this.json.put("path", path);
			this.json.put("data", data);
		}
	}

	public void download() {
		JSONObject data = this.json.getJSONObject("data");
		File tmpFile;
		String name;
		String type;
		name = data.getString("name");
		type = data.getString("type");
		tmpFile = new File(this.path + "/" + name);
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

	public void uploadDone() {
		try {
			if (null != this.fileOutputStream) {
				this.fileOutputStream.flush();
				this.fileOutputStream.close();
			}
			this.multiReloadForUpload();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public boolean uploading(ByteBuffer msg) {
		try {
			this.fileOutputStream.write(msg.get());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return (this.fileOutputStream.getByteCount() % this.per == 0);
	}

	public void uploadStart() {
		int size = json.getInt("size");
		String sizeStr = String.valueOf(size);
		int sizeLen = String.valueOf(size).length();
		this.per = (Integer.valueOf(String.valueOf(sizeStr.charAt(0))) + 1);
		this.per = (int) (this.per * Math.pow(10, sizeLen));
		this.per = ((this.per / 100000000) + 1) * 3;
		this.per = size / this.per;
		String name = this.json.getString("name");
		File file = new File(this.path + "/" + name);
		String ext = name.substring(name.lastIndexOf(".") + 1, name.length());
		name = name.substring(0, name.lastIndexOf("."));
		this.desktopJSONArray = new JSONArray();
		if (file.exists())
			file = this.checkDest(this.path, name, 0, ext);
			this.makeDesktopArray(file);
		try {
			this.fileOutputStream = new FBFileOutputStream(file);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	public void x() {
		for (int bi = 0; bi < this.browserList.size(); bi++) {
			if (this.browserList.get(bi).getId() == this.id) {
				this.browserList.remove(bi);
				break;
			}
		}
		this.json = null;
		this.setSession();
	}

	private File checkDest(String destPath, String name, int num, String ext) {
		File dest = new File(destPath + "/" + name + "_" + num + "." + ext);
		if (dest.exists()) {
			dest = this.checkDest(destPath, name, num + 1, ext);
		}
		return dest;
	}
	
	public void paste() {
		JSONObject clipboard = (JSONObject) this.session.getAttribute("clipboard");
		if (clipboard != null) {
			int prevId = 0;
			this.desktopJSONArray = new JSONArray();
			String status = clipboard.getString("status");
			String path = clipboard.getString("path");
			JSONArray data = clipboard.getJSONArray("data");
			if(!(path.equals(this.path) && status.equals("cut")))
				this.checkExistenceAndProcess(status, data, path, this.path);
			if(clipboard.has("id")){
				prevId = clipboard.getInt("id");
				this.multiplexReload(prevId, path);
			}
			else
				this.multiReload();
			if(status.equals("cut") && path.equals(this.desktopPath) && this.path.equals(this.desktopPath)) {
				this.path = "";
			}
			this.session.removeAttribute("clipboard");
		}
	}
	
	public void pasteToDesktop() {
		JSONObject clipboard = (JSONObject) this.session.getAttribute("clipboard");
		if (clipboard != null) {
			this.desktopJSONArray = new JSONArray();
			String status = clipboard.getString("status");
			String path = clipboard.getString("path");
			JSONArray data = clipboard.getJSONArray("data");
			this.path = this.desktopPath;
			this.checkExistenceAndProcess(status, data, path, this.desktopPath);
			this.session.removeAttribute("clipboard");
		}
	}
	
	private void multiplexReload(int prevId, String path) {
		if (this.browser.isWeb()) {
			this.reload();
		} else {
			JSONObject json;
			JSONArray data = new JSONArray();
			JSONArray ids = new JSONArray();
			this.json = new JSONObject();
			this.json.put("status", "multiplexReload");

			this.dataItemDAO.setFilePath(this.path);
			this.dataItemDAO.load();
			this.jsonArray = this.dataItemDAO.getJSONArray();
			for (Browser b : this.browserList) {
				if (b.getPath().equals(this.path) && !b.isWeb()) {
					ids.put(b.getId());
				}
			}
			json = new JSONObject();
			json.put("id", ids);
			json.put("data", this.jsonArray);
			data.put(json);

			ids = new JSONArray();
			this.dataItemDAO.setFilePath(path);
			this.dataItemDAO.load();
			this.jsonArray = this.dataItemDAO.getJSONArray();
			for (Browser b : this.browserList) {
				if (b.getPath().equals(path)) {
					ids.put(b.getId());
				}
			}
			json = new JSONObject();
			json.put("id", id);
			json.put("data", this.jsonArray);
			path = this.path.replace(this.root, "");
			json.put("path", path);
			data.put(json);
			this.json.put("data", data);
		}
	}
	private void checkExistenceAndProcess(String status, JSONArray data, String srcPath, String destPath) {
		if (data.length() != 0) {
			JSONObject tmpJSON = data.getJSONObject(0);
			String name = tmpJSON.getString("name");
			String type = tmpJSON.getString("type");
			data.remove(0);
			this.checkExistenceAndProcess(status, data, srcPath, destPath);
			File src = new File(srcPath + "/" + name);
			File dest = new File(destPath + "/" + name);
			if (dest.exists()) {
				if (type.equals("inode/directory")) {
					destPath = destPath + "/" + name;
					srcPath = srcPath + "/" + name;
					this.dataItemDAO.setFilePath(destPath);
					this.dataItemDAO.load();
					JSONArray tmpData = this.dataItemDAO.getJSONArray();
					this.checkExistenceAndProcess(status, tmpData, srcPath, destPath);
				} else {
					String ext = name.substring(name.lastIndexOf(".") + 1, name.length());
					name = name.substring(0, name.lastIndexOf("."));
					dest = this.checkDest(destPath, name, 0, ext);
					if (status.equals("copy")) {
						try {
							FileUtils.copyFile(src, dest);
							this.makeDesktopArray(src, dest);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} else if (status.equals("cut")) {
						try {
							FileUtils.moveFile(src, dest);
							this.makeDesktopArray(src, dest);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			} else {
				if (type.equals("inode/directory")) {
					dest = new File(destPath);
					if (status.equals("copy")) {
						try {
							FileUtils.copyDirectoryToDirectory(src, dest);
							this.makeDesktopArray(src, dest);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} else if (status.equals("cut")) {
						try {
							FileUtils.moveDirectoryToDirectory(src, dest, true);
							this.makeDesktopArray(src, dest);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				} else {
					if (status.equals("copy")) {
						try {
							FileUtils.copyFile(src, dest);
							this.makeDesktopArray(src, dest);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} else if (status.equals("cut")) {
						try {
							FileUtils.moveFile(src, dest);
							this.makeDesktopArray(src, dest);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
		}
	}
	private void makeDesktopArray(File src, File dest){
		if(src.isDirectory()) {
			this.makeDesktopArray(src);
		}
		else {
			String path = dest.getPath();
			int lIdx = path.lastIndexOf("/");
			path = path.substring(0,lIdx);
			if(path.equals(this.desktopPath))
				this.makeDesktopArray(dest);
		}
	}
	private void makeDesktopArray(File file){
		if(this.path.equals(this.desktopPath)){
			DataItem tmpDI = new DataItem();
			try {
				tmpDI.setType(Files.probeContentType(file.toPath()));
			} catch (IOException e) {
				e.printStackTrace();
			}
			tmpDI.setName(file.getName());
			SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
			tmpDI.setLastModified(file.lastModified());
			tmpDI.setDateModified(sdf.format(file.lastModified()));
			tmpDI.setSize(file.length());
			this.desktopJSONArray.put(tmpDI.getJSON());
		}
	}
	public void setClipboard(String status) {
		this.json.put("path", this.path);
		this.json.put("status", status);
		this.session.setAttribute("clipboard", this.json);
	}

	public void del() {
		JSONObject tmpJSON;
		JSONArray data = this.json.getJSONArray("data");
		boolean success = false;
		String path;
		String type;
		File dest = null;
		this.desktopJSONArray = new JSONArray();
		for (int di = 0; di < data.length(); di++) {
			tmpJSON = data.getJSONObject(di);
			path = this.path + "/" + tmpJSON.getString("name");
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
		if (success){
			this.multiReload();
		}else if(this.path.equals(this.desktopPath)){
			this.multiReload();
		}
	}

	public void rename() {
		String srcStr = this.browser.getPath() + "/" + this.json.getString("src");
		String destStr = this.browser.getPath() + "/" + this.json.getString("dest");
		File src = new File(srcStr);
		File dest = new File(destStr);
		if (!src.equals(dest) ) {
			src.renameTo(dest);
		}
		this.multiReload();
		if(this.path.equals(this.desktopPath)){
			this.desktopJSON = new JSONObject();
			this.desktopJSON.put("src",src.getName());
			this.desktopJSON.put("dest",dest.getName());
		}
	}
	public void newFolder() {
		String name = "New Folder";
		File newFolder = new File(this.path + "/" + name);
		if (!newFolder.exists()) {
			newFolder.mkdirs();
		} else {
			newFolder = this.mkDir(this.browser, name, 0);
		}
		this.dataItemDAO.setFilePath(this.path);
		this.dataItemDAO.load();
		this.jsonArray = this.dataItemDAO.getJSONArray();
		this.multiReload();
		if(this.path.equals(this.desktopPath)){
			this.desktopJSON = new JSONObject();
			this.desktopJSON.put("name", newFolder.getName());
			try {
				this.desktopJSON.put("type", Files.probeContentType(newFolder.toPath()));
			} catch (JSONException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	private File mkDir(Browser browser, String name, int num) {
		File newFolder = new File(browser.getPath() + "/" + name + " " + num);
		if (!newFolder.exists()) {
			newFolder.mkdirs();
		} else {
			newFolder = this.mkDir(browser, name, num + 1);
		}
		return newFolder;
	}

	public void loadRoot() {
		this.root = (String) this.session.getAttribute("root");
		this.desktopPath += this.root + "/Desktop";
	}

	@SuppressWarnings("unchecked")
	public void open() {
		String name = this.json.getString("name");
		String type = this.json.getString("type");
		if (type.equals("inode/directory") || type.equals("")) {
			this.browserList = (List<Browser>) this.session.getAttribute("browserList");
			// Browser tmpBrowser = this.browser();
			this.path = this.browser.getPath() + "/" + name;
			File b = new File("", this.path);
			try {
				if (!b.getCanonicalPath().contains(this.root))
					this.path = this.root;
				else
					this.path = b.getCanonicalPath();
			} catch (IOException e) {
				this.path = this.root;
				e.printStackTrace();
			}
			this.browser.setPath(this.path);
			this.reload();
			this.setSession();

		} else {
			// file process
		}
	}

	/*
	 * public void getJSONArray(){ this.dataItemDAO.setFilePath(this.path);
	 * this.dataItemDAO.load(); this.jsonArray =
	 * this.dataItemDAO.getJSONArray(); }
	 */
	public void newFBFrom(String path) {
		this.setNewId();
		Browser tmpBrowser = new Browser();
		tmpBrowser.setId(this.id);
		tmpBrowser.setPath(this.root);
		this.browserList.add(tmpBrowser);
		this.path = this.root + path;
		File b = new File("", this.path);
		try {
			if (!b.getCanonicalPath().contains(this.root))
				this.path = this.root;
			else
				this.path = b.getCanonicalPath();
			b = new File("", this.path);
		} catch (IOException e) {
			this.path = this.root;
			e.printStackTrace();
		}
		if (!b.exists())
			this.path = this.root;
		tmpBrowser.setPath(this.path);
		this.dataItemDAO.setFilePath(this.path);
		this.dataItemDAO.load();
		this.jsonArray = this.dataItemDAO.getJSONArray();
		this.setSession();
		this.session.setAttribute("root", this.root);
	}

	public void newFB() {
		this.setNewId();
		Browser tmpBrowser = new Browser();
		tmpBrowser.setId(this.id);
		tmpBrowser.setPath(this.root);
		this.browserList.add(tmpBrowser);
		this.dataItemDAO.setFilePath(this.root);
		this.dataItemDAO.load();
		this.jsonArray = this.dataItemDAO.getJSONArray();
		this.setSession();
		this.session.setAttribute("root", this.root);
	}

	public JSONObject getJson() {
		return json;
	}

	public void setJSON(JSONObject json) {
		this.json = json;
	}

	@SuppressWarnings("unchecked")
	private void getSession() {
		if (null == this.session.getAttribute("browserList")) {
			this.browserList = new ArrayList<Browser>();
		} else {
			this.browserList = (List<Browser>) this.session.getAttribute("browserList");
		}
	}

	private void setNewId() {
		this.getSession();
		if (this.browserList.size() != 0)
			this.id = this.browserList.get(this.browserList.size() - 1).getId() + 1;
		else
			this.id = 0;
	}

	public void setSession(HttpSession session) {
		this.session = session;
	}

	public JSONArray getJSONArray() {
		return jsonArray;
	}

	public void setDataItemArray(JSONArray dataItemArray) {
		this.jsonArray = dataItemArray;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRoot() {
		return root;
	}

	public void setRoot(String root) {
		this.root = root;
	}

	public ServletContext getServletContext() {
		return servletContext;
	}

	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}

	public FBFileOutputStream getFileOutputStream() {
		return fileOutputStream;
	}

	public void setFileOutputStream(FBFileOutputStream fileOutputStream) {
		this.fileOutputStream = fileOutputStream;
	}

	public Session getWebsocketSession() {
		return websocketSession;
	}

	public void setWebsocketSession(Session websocketSession) {
		this.websocketSession = websocketSession;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	public JSONArray getDesktopJSONArray() {
		return desktopJSONArray;
	}

	public void setDesktopJSONArray(JSONArray desktopJSONArray) {
		this.desktopJSONArray = desktopJSONArray;
	}
	
	public String getDesktopPath() {
		return desktopPath;
	}

	public void setDesktopPath(String desktopPath) {
		this.desktopPath = desktopPath;
	}

	public JSONObject getDesktopJSON() {
		return desktopJSON;
	}

	public void setDesktopJSON(JSONObject desktopJSON) {
		this.desktopJSON = desktopJSON;
	}
}