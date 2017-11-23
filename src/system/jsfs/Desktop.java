package system.jsfs;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import org.json.JSONArray;

import system.daoInterfaces.BgPathsDAO;
import system.daoInterfaces.GUISettingsDAO;
import system.daoInterfaces.GUISettingsInOSDAO;
import system.daoInterfaces.IconsDAO;
import system.daoInterfaces.IconsInOSDAO;
import system.daoInterfaces.OSsDAO;
import system.daos.sqlites.BgPathsDAOSQLite;
import system.daos.sqlites.GUISettingsDAOSQLite;
import system.daos.sqlites.GUISettingsInOSDAOSQLite;
import system.daos.sqlites.IconsDAOSQLite;
import system.daos.sqlites.IconsInOSDAOSQLite;
import system.daos.sqlites.OSsDAOSQLite;
import system.helpers.ImgToBase64;
import system.jsfs.SystemJSF;
import system.models.BgPath;
import system.models.GUISetting;
import system.models.GUISettingsInOS;
import system.models.OS;
import system.modules.DesktopManager;
import system.modules.EssentialJSLib;

@Named
@RequestScoped
public class Desktop extends SystemJSF {
	private String bgImg;
	private EssentialJSLib essentialJSLib;
	private OS os;
	private String fileSeparator;
	public Desktop() {
		this.viewArray[IN] = "background";
		this.viewArray[OUT] = "login";
		this.bgImg = "";
		this.essentialJSLib = new EssentialJSLib(this.contextPath);
	}

	public void init() {
		this.redirect(OUT);
		if (null != this.user) {
			OSsDAO osDAO = new OSsDAOSQLite(this.user);
			osDAO.load();
			this.os = osDAO.getOS();
			this.session.setAttribute("os", this.os);
			
			GUISettingsInOSDAO gioDAO = new GUISettingsInOSDAOSQLite(this.os);
			gioDAO.load();
			GUISettingsInOS gio = gioDAO.getGUISettingsInOS();
			GUISettingsDAO guiSettingDAO = new GUISettingsDAOSQLite(gio);
			guiSettingDAO.load();
			GUISetting guiSetting = guiSettingDAO.getGUISetting();
			if(this.isMobile)
				guiSetting.forMobileMode();
			BgPathsDAO bgPathDAO = new BgPathsDAOSQLite(gio);
			bgPathDAO.load();
			BgPath bgPath = bgPathDAO.getBgPath();

			IconsInOSDAO iconsInOSDAO = new IconsInOSDAOSQLite(this.os);
			iconsInOSDAO.load();
			IconsDAO iconDAO = new IconsDAOSQLite(iconsInOSDAO.getIconsInOSList());
			iconDAO.load();
			
			if (null != bgPath.getBgPath() && !bgPath.getBgPath().equals("NULL")) {
				this.bgImg = bgPath.getBgPath();
				this.bgImg = ImgToBase64.getBase64(this.bgImg);
			}
			if (null == this.session.getAttribute("winAndBarJSONArray")) {
				this.session.setAttribute("winCount", 0);
				this.session.setAttribute("winAndBarJSONArray", new JSONArray());
			}
			if (null == this.session.getAttribute("webapps")) {
				this.session.setAttribute("userFolder", this.userFolder);
			}
			this.externalContext.getApplicationMap().put("guiSetting", guiSetting);
			this.externalContext.getApplicationMap().put("iconJSONArray", iconDAO.getIconJSONArray());
			this.externalContext.getApplicationMap().put("bgImg", this.bgImg);
			this.externalContext.getApplicationMap().put("port", this.port);
			this.externalContext.getApplicationMap().put("contextURL", this.contextURL);
			this.externalContext.getApplicationMap().put("serverName", this.serverName);
			this.externalContext.getApplicationMap().put("libs", this.essentialJSLib);
			if(System.getProperty("os.name").contains("Windows"))
				this.fileSeparator = "\\\\";
			else
				this.fileSeparator = System.getProperty("file.separator");
			this.externalContext.getApplicationMap().put("fileSeparator", this.fileSeparator);
		}
		if(null != this.os){
			DesktopManager desktopManager = new DesktopManager();
			desktopManager.setUser(this.user);
			desktopManager.setUserFolder(this.userFolder);
			desktopManager.setOS(this.os);
			desktopManager.init();
			this.session.setAttribute("desktopManager", desktopManager);
			this.externalContext.getApplicationMap().put("dataIconJSONArray", desktopManager.getDataIconsDAO().getJSONArray());
		}
	}
}
