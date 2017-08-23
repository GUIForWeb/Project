package apps.fileBrowser.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.context.ApplicationScoped;
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
import org.json.JSONArray;
import org.json.JSONObject;

import apps.Application;
import apps.fileBrowser.dao.DataItemDAO;
import apps.fileBrowser.model.Browser;
import apps.fileBrowser.model.DataItem;
import apps.fileBrowser.module.FBManager;

@Named
@RequestScoped
public class FileBrowser extends Application{
	private String root;
	private FBManager fbm;

	public FileBrowser() {
		this.fbm = new FBManager();
		this.root = this.context.getRealPath(".").replace(this.contextPath.substring(1), "");
		this.root += "driver/home/" + this.user.getEmail();
		this.fbm.setRoot(this.root);
		this.fbm.setSession(this.session);
	}
	public void start() {
		this.fbm.newFB();
	}
	public JSONArray getDataItemArray() {
		return this.fbm.getDataItemArray();
	}
	public void setDataItemArray(JSONArray dataItemArray) {
		this.fbm.setDataItemArray(dataItemArray);
	}
	public int getId() {
		return this.fbm.getId();
	}
	public void setId(int id) {
		this.fbm.setId(id);
	}
}
