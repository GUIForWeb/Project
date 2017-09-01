package apps.fileBrowser.module;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import apps.Application;
import apps.fileBrowser.dao.DataItemDAO;
import apps.fileBrowser.model.Browser;
import apps.fileBrowser.model.DataItem;

public class FBManager{
	private int id;
	private String root;
	private String path = "";
	private JSONObject json;
	private List<Browser> browserList;
	private DataItemDAO dataItemDAO;
	private JSONArray dataItemArray;
	private HttpSession session;
	private Browser browser;
	private ServletContext servletContext;

	public FBManager(){
		this.dataItemDAO = new DataItemDAO();
	}
	public void x() {
		for (int bi = 0; bi < this.browserList.size(); bi++) {
			if (this.browserList.get(bi).getId() == this.id) {
				this.browserList.remove(bi);
				break;
			}
		}
		this.session.setAttribute("browserList", this.browserList);
	}
	private File checkDest(File dest, int num){
		if(dest.exists()){
			dest = new File(dest.getPath() + "_" + num);
			this.checkDest(dest, num+1);
		}
		return dest;
	}
	public void paste() {
		JSONObject clipboard = (JSONObject) this.session.getAttribute("clipboard");
		String status = clipboard.getString("status");
		String path = clipboard.getString("path");
		int prevId =  clipboard.getInt("id");
		JSONArray data = clipboard.getJSONArray("data");
		String name = "";
		String type = "";
		if (clipboard != null) {
			for (int di = 0; di < data.length(); di++) {
				JSONObject tmpJSON = data.getJSONObject(di);
				name = tmpJSON.getString("name");
				type = tmpJSON.getString("type");
				File src = new File(path+"/"+name);
				File dest = new File(this.path+"/"+name);
				if (type.equals("directory")) {
					this.checkDest(dest, 0);
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
				}
				else {
					this.checkDest(dest,0);
					if (status.equals("copy")) {
						try {
							FileUtils.copyFileToDirectory(src, dest);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} else if (status.equals("cut")) {
						try {
							FileUtils.moveFileToDirectory(src, dest, true);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
			this.session.removeAttribute("clipboard");
			this.multiplexReload(prevId,path);
		}
	}private void multiReload(){
		JSONArray id = new JSONArray();
		JSONObject data = new JSONObject();
		this.dataItemDAO.setFilePath(this.path);
		this.dataItemArray = this.dataItemDAO.getDataItemArray();
		for (Browser b : this.browserList) {
			if (b.getPath().equals(this.path)) {
				id.put(b.getId());
			}
		}
		this.json = new JSONObject();
		this.json.put("status", "multiReload");
		data.put("id", id);
		data.put("data", this.dataItemArray);
		this.json.put("data", data);
	}
	private void multiplexReload(int prevId,String path) {
		JSONObject json;
		JSONArray data = new JSONArray();
		JSONArray id = new JSONArray();
		this.json = new JSONObject();
		this.json.put("status", "multiplexReload");
		
		this.dataItemDAO.setFilePath(this.path);
		this.dataItemArray = this.dataItemDAO.getDataItemArray();
		for (Browser b : this.browserList) {
			if (b.getPath().equals(this.path)) {
				id.put(b.getId());
			}
		}
		json = new JSONObject();
		json.put("id", id);
		json.put("data", this.dataItemArray);
		data.put(json);
		
		id = new JSONArray();
		this.dataItemDAO.setFilePath(path);
		this.dataItemArray = this.dataItemDAO.getDataItemArray();
		for (Browser b : this.browserList) {
			if (b.getPath().equals(path)) {
				id.put(b.getId());
			}
		}
		json = new JSONObject();
		json.put("id", id);
		json.put("data", this.dataItemArray);
		data.put(json);
		this.json.put("data", data);
	}
	public void setClipboard(String status) {
		this.json.put("path", this.path);
		this.json.put("status", status);
		this.session.setAttribute("clipboard", this.json);
	}
	public void download() {
		JSONObject tmpJSON;
		JSONArray data = this.json.getJSONArray("data");
		String name;
		String path;
		File file;
		JSONArray jsonArray = new JSONArray();
		for(int di=0; di<data.length(); di++){
			tmpJSON = data.getJSONObject(di);
			name = tmpJSON.getString("name");
			path = this.path + "/" + name;
			file = new File(path);
			FileInputStream input = null;
			byte[] fileData = new byte[(int) file.length()];
			String encodedString = "";
			try {
				input = new FileInputStream(file);
				input.read(fileData);
				input.close();
				byte[] encoded = Base64.encodeBase64(fileData);
				encodedString = new String(encoded);
			} catch (IOException ex) {
				ex.printStackTrace();
			}
			
			JSONObject json = new JSONObject();
			json.put("name", name);
			json.put("data", encodedString);
			jsonArray.put(json);
		}
		this.json = new JSONObject();
		this.json.put("status", "download");
		this.json.put("data", jsonArray);
	}
	public void del() {
		JSONObject tmpJSON;
		JSONArray data = this.json.getJSONArray("data");
		boolean success = false;
		String path;
		String type;
		for (int di = 0; di < data.length(); di++) {
			tmpJSON = data.getJSONObject(di);
			path = this.path + "/" + tmpJSON.getString("name");
			type = tmpJSON.getString("type");
			File dest = new File(path);
			if (type.equals("directory")) {
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
			this.multiReload();
	}
	public void rename() {
		String srcStr = this.browser.getPath() + "/" + this.json.getString("src");
		String destStr = this.browser.getPath() + "/" + this.json.getString("dest");
		File src = new File(srcStr);
		File dest = new File(destStr);
		if (!src.equals(dest) && src.renameTo(dest)){
			this.multiReload();
		}
	}
	public void newFB(){
		this.setNewId();
		Browser tmpBrowser = new Browser();
		tmpBrowser.setId(this.id);
		tmpBrowser.setPath(this.root);
		this.browserList.add(tmpBrowser);
		this.dataItemDAO.setFilePath(this.root);
		this.dataItemArray = this.dataItemDAO.getDataItemArray();
		this.session.setAttribute("browserList", this.browserList);
		this.session.setAttribute("root", this.root);
	}
	public void newFolder() {
		String name = "New Folder";
		File newFolder = new File(this.path + "/" + name);
		if (!newFolder.exists()) {
			newFolder.mkdirs();
		} else {
			this.mkDir(this.browser, name, 0);
		}
		this.dataItemDAO.setFilePath(this.path);
		this.dataItemArray = this.dataItemDAO.getDataItemArray();
		this.multiReload();
	}
	private void mkDir(Browser browser, String name, int num) {
		File newFolder = new File(browser.getPath() + "/" + name + " " + num);
		if (!newFolder.exists()) {
			newFolder.mkdirs();
		} else {
			this.mkDir(browser, name, num + 1);
		}
	}
	public void open(){
		String name = this.json.getString("name");
		String type = this.json.getString("type");
		if (type.equals("directory") || type.equals("")) {
			this.root = (String) this.session.getAttribute("root");
			this.browserList = (List<Browser>) this.session.getAttribute("browserList");
			//Browser tmpBrowser = this.browser();
			this.path = this.browser.getPath() + "/" + name;
			File b = new File("", this.path);
			try {
				if (!b.getCanonicalPath().contains(this.root))
					this.path = this.root;
				else
					this.path = b.getCanonicalPath();
			} catch (IOException e) {
				e.printStackTrace();
			}
			this.browser.setPath(this.path);
			this.reload();
			this.session.setAttribute("browserList", this.browserList);
			
		} else {
			//file process
		}
	}
	private void reload(){
		this.dataItemDAO.setFilePath(this.path);
		this.dataItemArray = this.dataItemDAO.getDataItemArray();
		this.json = new JSONObject();
		this.json.put("status", "reload");
		this.json.put("data", this.dataItemArray);
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
	public JSONObject getJson() {
		return json;
	}
	public void setJson(JSONObject json) {
		this.json = json;
	}
	private void getSession() {
		if (null == this.session.getAttribute("browserList")) {
			this.browserList = new ArrayList<Browser>();
		} else {
			this.browserList = (List<Browser>) this.session.getAttribute("browserList");
		}
		/*
		if (null != this.session.getAttribute("clipboard")) {
			this.clipboard = (String) this.session.getAttribute("clipboard");
		}
		*/
	}
	private void setNewId(){
		this.getSession();
		if(this.browserList.size() != 0)
			this.id = this.browserList.get(this.browserList.size()-1).getId()+1;
		else
			this.id = 0;
	}
	public void setSession(HttpSession session) {
		this.session = session;
	}
	public JSONArray getDataItemArray() {
		return dataItemArray;
	}
	public void setDataItemArray(JSONArray dataItemArray) {
		this.dataItemArray = dataItemArray;
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
}

/*
private void getSession() {
	if (null == this.session.getAttribute("browserList")) {
		this.browserList = new ArrayList<Browser>();
		this.id = 0;
	} else {
		this.browserList = (List<Browser>) this.session.getAttribute("browserList");
		this.id = (int) this.session.getAttribute("fbNum");
	}
	if (null != this.session.getAttribute("clipboard")) {
		this.clipboard = (String) this.session.getAttribute("clipboard");
	}
	if (null != this.session.getAttribute("wMode") && (boolean) this.session.getAttribute("wMode")) {
		this.externalContext.getRequestMap().put("wMode", true);
		this.session.setAttribute("wMode", false);
	}
}

private void setSession() {

	this.session.setAttribute("browserList", this.browserList);
}

public String listen() {
	switch (this.status) {
	case "update":
		this.update();
		break;
	case "choose":
		this.choose();
		break;
	case "cut":
	case "copy":
		this.setClipboard();
		break;
	case "drop":
	case "paste":
		this.paste();
		break;
	case "del":
		this.del();
		break;
	case "newFolder":
		this.newFolder();
		break;
	case "rename":
		this.rename();
		break;
	case "x":
		this.x();
		break;
	case "option":
		this.option();
		break;
	case "download":
		this.download();
		break;
	}
	return "";
}

public void download() {
	if (!this.param.equals("")) {
		String[] info = this.param.split("&");
		if (info.length > 0) {
			Browser tmpBrowser = this.browser(info[0]);
			String path = tmpBrowser.getFilePath() + "/" + info[2];
			File file = new File(path);
			FacesContext fc = FacesContext.getCurrentInstance();
			ExternalContext ec = fc.getExternalContext();
			ec.responseReset();
			ec.setResponseContentType("text/plain");
			ec.setResponseContentLength((int) file.length());
			String attachmentName = "attachment; filename=\"" + info[2] + "\"";
			ec.setResponseHeader("Content-Disposition", attachmentName);
			FileInputStream input = null;
			OutputStream output = null;
			try {
				input = new FileInputStream(file);
				output = ec.getResponseOutputStream();
				IOUtils.copy(input, output);
				fc.responseComplete();
				input.close();
				output.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}
}

public void option() {
	if (!this.param.equals("")) {
		String[] info = this.param.split("&");
		if (info.length > 0) {
			Browser tmpBrowser = this.browser(info[0]);
			String path = tmpBrowser.getFilePath() + "/" + info[1];
			this.session.setAttribute("fbOption", path.split("webapps")[1]);
		}
	}
}



public void fileUpload() {
	Browser tmpBrowser = this.browser(this.param);
	FacesContext context = FacesContext.getCurrentInstance();
	HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();
	List<Part> fileList;
	try {
		fileList = (List<Part>) request.getParts();
		for (Part file : fileList) {
			if (null != file.getContentType()) {
				InputStream uploadedFile = file.getInputStream();
				FileUtils.copyToFile(uploadedFile,
						new File(tmpBrowser.getFilePath() + "//" + file.getSubmittedFileName()));
			}
		}
	} catch (IOException | ServletException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	this.changeView(tmpBrowser);
}

private void rename() {
	String[] info = this.param.split("&");
	Browser tmpBrowser = this.browser(info[0]);
	info[2] = tmpBrowser.getFilePath() + "/" + info[2];
	info[5] = tmpBrowser.getFilePath() + "/" + info[5];
	File src = new File(info[2]);
	File dest = new File(info[5]);
	if (!src.equals(dest) && src.renameTo(dest))
		this.changeView(tmpBrowser);
}

private void newFolder() {
	String[] info = this.param.split("&");
	Browser tmpBrowser = this.browser(info[0]);
	String name = "New Folder";
	File newFolder = new File(tmpBrowser.getFilePath() + "/" + name);
	if (!newFolder.exists()) {
		if (newFolder.mkdirs())
			this.changeView(tmpBrowser);
	} else {
		this.mkDir(tmpBrowser, name, 0);
	}
}

private void mkDir(Browser browser, String name, int num) {
	File newFolder = new File(browser.getFilePath() + "/" + name + " " + num);
	if (!newFolder.exists()) {
		if (newFolder.mkdirs())
			this.changeView(browser);
	} else {
		this.mkDir(browser, name, num + 1);
	}
}

private void del() {
	String[] info = this.param.split("&");
	Browser tmpBrowser = this.browser(info[0]);
	boolean success = false;
	for (int ii = 0; ii < info.length; ii += 3) {
		info[ii + 2] = tmpBrowser.getFilePath() + "/" + info[ii + 2];
		File dest = new File(info[ii + 2]);
		if (info[ii + 1].equals("directory")) {
			try {
				FileUtils.deleteDirectory(dest);
				success = true;public ExternalContext getExternalContext() {
		return externalContext;
	}

	public void setExternalContext(ExternalContext externalContext) {
		this.externalContext = externalContext;
	}
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
		this.changeView(tmpBrowser);
}

private void paste() {
	String[] info = this.param.split("&");
	Browser destBrowser = this.browser(info[0]);
	if (!this.clipboard.equals("")) {
		String[] fileInfo = this.clipboard.split("&");
		boolean success = false;
		for (int fi = 0; fi < fileInfo.length; fi += 5) {
			File src = new File(fileInfo[fi + 2] + "/" + fileInfo[fi + 3]);
			File dest = new File(destBrowser.getFilePath());
			File check = new File(destBrowser.getFilePath() + "/" + fileInfo[fi + 3]);
			File newDest;
			if (fileInfo[fi + 1].equals("directory")) {
				if (fileInfo[fi + 4].equals("copy")) {
					try {
						FileUtils.copyDirectoryToDirectory(src, dest);
						success = true;
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				} else if (fileInfo[fi + 4].equals("cut")) {
					try {
						FileUtils.moveDirectoryToDirectory(src, dest, true);
						success = true;
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			} else {
				if (fileInfo[fi + 4].equals("copy")) {
					try {
						if (!check.exists()) {
							FileUtils.copyFileToDirectory(src, dest);
						} else {
							newDest = new File(destBrowser.getFilePath() + "/" + fileInfo[fi + 3] + "_copy");
							FileUtils.copyFile(src, newDest);
						}
						success = true;
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				} else if (fileInfo[fi + 4].equals("cut")) {
					try {
						if (!check.exists()) {
							FileUtils.moveFileToDirectory(src, dest, true);
						} else {
							newDest = new File(destBrowser.getFilePath() + "/" + fileInfo[fi + 3] + "_cut");
							FileUtils.moveFileToDirectory(src, newDest, true);
						}
						success = true;
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		}
		if (success) {
			this.changeView(destBrowser);
			if (this.status.equals("drop")) {
				this.update = fileInfo[0];
			}
		}
		this.session.setAttribute("clipboard", "");
	}
}

private void setClipboard() {
	String[] info = this.param.split("&");
	this.clipboard = "";

	for (int ii = 0; ii < info.length; ii += 3) {
		if (!info[ii + 1].equals("..")) {
			Browser tmpBrowser = this.browser(info[ii]);
			if (!tmpBrowser.getFilePath().equals("")) {
				this.clipboard += info[ii] + "&" + info[ii + 1] + "&" + tmpBrowser.getFilePath() + "&"
						+ info[ii + 2] + "&" + this.status + "&";
				this.session.setAttribute("clipboard", this.clipboard);
			}
		}
	}
}

private void x() {
	this.getSession();
	for (int bi = 0; bi < this.browserList.size(); bi++) {
		if (this.browserList.get(bi).getId() == Integer.valueOf(this.param)) {
			this.browserList.remove(bi);
			break;
		}
	}
	this.id = Integer.valueOf(this.param);
	if(this.browserList.size() != 0)
		this.content = "removeFb";
	else 
		this.content = "removeForm";
	this.setSession();
}

private void update() {
	Browser tmpBrowser = this.browser(this.param);
	this.changeView(tmpBrowser);
}

private void choose() {
	String[] info = this.param.split("&");
	if (info[1].equals("directory") || info[1].equals("")) {
		this.browserList = (List<Browser>) this.session.getAttribute("browserList");
		Browser tmpBrowser = this.browser(info[0]);
		this.filePath = tmpBrowser.getFilePath() + "/" + info[2];
		File b = new File("", this.filePath);
		try {
			if (!b.getCanonicalPath().contains(this.root))
				this.filePath = this.root;
			else
				this.filePath = b.getCanonicalPath();
		} catch (IOException e) {
			e.printStackTrace();
		}
		tmpBrowser.setFilePath(this.filePath);
		this.changeView(tmpBrowser);
		this.session.setAttribute("fbContent", this.content);
		this.session.setAttribute("browserList", this.browserList);
	} else {
		this.browserList = (List<Browser>) this.session.getAttribute("browserList");
		Browser tmpBrowser = new Browser();
		for (Browser b : this.browserList) {
			if (b.getId() == Integer.valueOf(info[0])) {
				tmpBrowser = b;
				break;
			}
		}
		this.changeView(tmpBrowser);
	}
}

private void changeView(Browser browser) {
	this.filePath = browser.getFilePath();
	this.listFoldersAndFiles();
	this.num = browser.getId();
	this.content = this.fileItemList.toString();
}

public void listFoldersAndFiles() {
	File directory = new File(this.filePath);
	File[] fList = directory.listFiles();
	FileItem tmpFI;
	
	for (File file : fList) {
		tmpFI = new FileItem(this.filePath, file);
		tmpFI.setName(tmpFI.getName().replace(this.filePath + "/", ""));
		this.fileItemList.add(tmpFI);
	}
}
*/