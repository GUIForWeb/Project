package apps.fileBrowser.module;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import apps.Application;
import apps.fileBrowser.dao.DataItemDAO;
import apps.fileBrowser.model.Browser;
import apps.fileBrowser.model.DataItem;

public class FBManager{
	private int id;
	private String root;
	private String filePath = "";
	private String clipboard;
	private JSONObject json;
	private List<Browser> browserList;
	private DataItemDAO dataItemDAO;
	private JSONArray dataItemArray;
	private HttpSession session;
	
	
	public FBManager(){
		this.dataItemDAO = new DataItemDAO();
	}
	public void newFB(){
		this.getSession();
		Browser tmpBrowser = new Browser();
		tmpBrowser.setId(this.id);
		tmpBrowser.setFilePath(this.root);
		this.browserList.add(tmpBrowser);
		this.dataItemDAO.setFilePath(this.root);
		this.dataItemArray = this.dataItemDAO.getDataItemArray();
		this.setSession();
	}
	public void open(JSONObject json){
		this.id = json.getInt("id");
		String name = json.getString("name");
		String type = json.getString("type");
		if (type.equals("directory") || type.equals("")) {
			this.root = (String) this.session.getAttribute("root");
			this.browserList = (List<Browser>) this.session.getAttribute("browserList");
			Browser tmpBrowser = this.browser();
			this.filePath = tmpBrowser.getFilePath() + "/" + name;
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
			this.dataItemDAO.setFilePath(this.filePath);
			this.dataItemArray = this.dataItemDAO.getDataItemArray();
			this.json = new JSONObject();
			this.json.put("id", this.id);
			this.json.put("status", "open");
			this.json.put("data", this.dataItemArray);
			this.session.setAttribute("browserList", this.browserList);
		} else {
			//file process
		}
	}
	private Browser browser() {
		Browser tmpBrowser = new Browser();
		for (Browser b : this.browserList) {
			if (b.getId() == this.id) {
				tmpBrowser = b;
				break;
			}
		}
		return tmpBrowser;
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
			this.id = 0;
		} else {
			this.browserList = (List<Browser>) this.session.getAttribute("browserList");
			this.id = this.browserList.get(this.browserList.size()-1).getId()+1;
		}
		if (null != this.session.getAttribute("clipboard")) {
			this.clipboard = (String) this.session.getAttribute("clipboard");
		}
	}
	private void setSession() {
		this.session.setAttribute("browserList", this.browserList);
		this.session.setAttribute("root", this.root);
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
