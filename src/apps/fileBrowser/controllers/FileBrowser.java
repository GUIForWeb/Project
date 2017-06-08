package apps.fileBrowser.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.RequestScoped;
import javax.faces.annotation.RequestMap;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import apps.Application;
import apps.fileBrowser.modulees.Browser;
import apps.fileBrowser.modulees.FileItem;

@Named
@RequestScoped
public class FileBrowser extends Application {
	/*
	@Inject
	FacesContext facesContext;
	//@RequestMap
	//private Map<String,Object> requestMap;
	*/
	private int id;
	private int num;
	private String update;
	private String root;
	private String filePath;
	private String status;
	private String param;
	private String content;
	private String clipboard;
	private List<FileItem> fileItemList;
	private List<Browser> browserList;
	
	public FileBrowser() {
		this.fileItemList = new ArrayList<FileItem>();
		this.browserList = new ArrayList<Browser>();
		this.param = "";
		this.filePath = "";
		this.content = "";
		this.clipboard = "";
		this.update = "";
		this.root = this.context.getRealPath(".").replace(this.contextPath.substring(1), "");
		this.root += "driver/home/" + this.user.getEmail();
		this.getSession();
	}

	public void start() {
		this.redirect();
		this.filePath = this.root;
		this.fileItemList = new ArrayList<FileItem>();
		this.listFoldersAndFiles();
		this.externalContext.getRequestMap().put("fileItemList", this.fileItemList);
		Browser tmpBrowser = new Browser();
		tmpBrowser.setId(this.id);
		tmpBrowser.setFilePath(this.filePath);
		this.browserList.add(tmpBrowser);
		//this.requestMap.put("fbNum", this.id);
		//this.requestMap.put("formPath", this.formPath);
		this.externalContext.getRequestMap().put("fbNum", this.id);
		//this.externalContext.getRequestMap().put("formPath", this.formPath);
		this.session.setAttribute("fbNum", (this.id + 1));
		this.setSession();
	}

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

	private Browser browser(String id) {
		Browser tmpBrowser = new Browser();
		for (Browser b : this.browserList) {
			if (b.getId() == Integer.valueOf(id)) {
				tmpBrowser = b;
				break;
			}
		}
		return tmpBrowser;
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
			/*
			 * if (file.isFile()) { files.add(file); } else if
			 * (file.isDirectory()) { listf(file.getAbsolutePath(), files); }
			 */
		}
	}

	public List<FileItem> getFileItemList() {
		return fileItemList;
	}

	public void setFileItemList(List<FileItem> fileItemList) {
		this.fileItemList = fileItemList;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUpdate() {
		return update;
	}

	public void setUpdate(String update) {
		this.update = update;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}
}
