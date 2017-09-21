package system.jsf;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import org.json.JSONArray;

import system.dao.BgPathsDAOMySQL;
import system.dao.DataIconsDAOMySQL;
import system.dao.GUISettingsDAOMySQL;
import system.dao.GUISettingsInOSDAOMySQL;
import system.dao.IconsDAOMySQL;
import system.dao.IconsInOSDAOMySQL;
import system.dao.OSsDAOMySQL;
import system.daoInterface.BgPathsDAO;
import system.daoInterface.DataIconsDAO;
import system.daoInterface.GUISettingsDAO;
import system.daoInterface.GUISettingsInOSDAO;
import system.daoInterface.IconsDAO;
import system.daoInterface.IconsInOSDAO;
import system.daoInterface.OSsDAO;
import system.helper.ImgToBase64;
import system.jsf.SystemJSF;
import system.model.BgPath;
import system.model.GUISetting;
import system.model.GUIsInOS;
import system.model.OS;
import system.model.User;
import system.modules.DesktopManager;
import system.modules.EssentialJSLib;

@Named
@RequestScoped
public class Background extends SystemJSF {
	private String bgImg;
	private EssentialJSLib essentialJSLib;
	public Background(){
		this.viewArray[IN] = "background";
		this.viewArray[OUT] = "login";
		this.user = new User();
		this.user.setId(1);
		this.user.setEmail("admin");
		this.user.setRole("admin");
		this.session.setAttribute("User",this.user);
		this.bgImg = "";
		this.essentialJSLib = new EssentialJSLib(this.contextPath);
	}
	
	public void init(){
		this.redirect(OUT);
		if(null != this.user) {
			OSsDAO osDAO = new OSsDAOMySQL(this.user);
			osDAO.load();
			OS os = osDAO.getOS();
			
			this.session.setAttribute("os", os);
			
			GUISettingsInOSDAO guisInOSDAO = new  GUISettingsInOSDAOMySQL(os);
			guisInOSDAO.load();
			GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
			
			GUISettingsDAO guiSettingDAO = new GUISettingsDAOMySQL(guisInOS);
			guiSettingDAO.load();
			GUISetting guiSetting = guiSettingDAO.getGUISetting();
			
			BgPathsDAO bgPathDAO = new BgPathsDAOMySQL(guisInOS);
			bgPathDAO.load();
			BgPath bgPath = bgPathDAO.getBgPath();
			
			IconsInOSDAO iconsInOSDAO = new IconsInOSDAOMySQL(os);
			iconsInOSDAO.load();
			IconsDAO iconDAO = new IconsDAOMySQL(iconsInOSDAO.getIconsInOSList());
			iconDAO.load();
			
			DataIconsDAO dataIconsDAO = new DataIconsDAOMySQL(os);
			dataIconsDAO.load();
			
			DesktopManager desktopManager = new DesktopManager();
			desktopManager.setUser(this.user);
			desktopManager.setExternalContext(this.externalContext);
			desktopManager.setOS(os);
			desktopManager.setDataIconsDAO(dataIconsDAO);
			desktopManager.init();
			
			if(null != bgPath.getBgPath()) {
				this.bgImg = this.context.getRealPath(".").replace(this.contextPath.substring(1), "");
				this.bgImg += bgPath.getBgPath();
				this.bgImg = ImgToBase64.getBase64(this.bgImg);
			}
			if(null == this.session.getAttribute("winAndBarJSONArray")){
				this.session.setAttribute("winCount",0);
				this.session.setAttribute("winAndBarJSONArray",new JSONArray());
			}
			
			this.externalContext.getRequestMap().put("guiSetting",guiSetting);
			this.externalContext.getRequestMap().put("iconJSONArray",iconDAO.getIconJSONArray());
			this.externalContext.getRequestMap().put("dataIconJSONArray",dataIconsDAO.getJSONArray());
			this.externalContext.getRequestMap().put("bgImg",this.bgImg);
			this.externalContext.getRequestMap().put("port",this.port);
			this.externalContext.getApplicationMap().put("contextURL",this.contextUrl);
			this.externalContext.getApplicationMap().put("contextPath",this.contextPath);
			this.externalContext.getApplicationMap().put("serverName",this.serverName);
			this.externalContext.getApplicationMap().put("libs",this.essentialJSLib);
		}
	}
}
