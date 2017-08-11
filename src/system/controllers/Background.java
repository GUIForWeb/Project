package system.controllers;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import system.controllers.Controller;
import system.daoInterfaces.BgPathDAO;
import system.daoInterfaces.GUISettingDAO;
import system.daoInterfaces.GUIsInOSDAO;
import system.daoInterfaces.IconDAO;
import system.daoInterfaces.IconsInOSDAO;
import system.daoInterfaces.OSSettingDAO;
import system.daos.BgPathDAOMySQL;
import system.daos.GUISettingDAOMySQL;
import system.daos.GUIsInOSDAOMySQL;
import system.daos.IconDAOMySQL;
import system.daos.IconsInOSDAOMySQL;
import system.daos.OSSettingDAOMySQL;
import system.helpers.ImgToBase64;
import system.models.BgPath;
import system.models.GUISetting;
import system.models.GUIsInOS;
import system.models.OSSetting;
import system.models.User;
import system.models.Window;

@Named
@RequestScoped
public class Background extends Controller {
	private String bgImg;
	public Background(){
		this.viewArray[IN] = "background";
		this.viewArray[OUT] = "login";
		this.user = new User();
		this.user.setId(1);
		this.user.setEmail("admin");
		this.user.setRole("admin");
		this.session.setAttribute("User",this.user);
		this.bgImg = "";
	}
	public void init(){
		this.redirect(OUT);
		if(null != this.user) {
			OSSettingDAO osSettingDAO = new OSSettingDAOMySQL(this.user);
			osSettingDAO.load();
			OSSetting osSetting = osSettingDAO.getOsSetting();
			
			this.session.setAttribute("osSetting", osSetting);
			
			GUIsInOSDAO guisInOSDAO = new  GUIsInOSDAOMySQL(osSetting);
			guisInOSDAO.load();
			GUIsInOS guisInOS = guisInOSDAO.getGUIsInOS();
			
			GUISettingDAO guiSettingDAO = new GUISettingDAOMySQL(guisInOS);
			guiSettingDAO.load();
			GUISetting guiSetting = guiSettingDAO.getGUISetting();
			
			BgPathDAO bgPathDAO = new BgPathDAOMySQL(guisInOS);
			bgPathDAO.load();
			BgPath bgPath = bgPathDAO.getBgPath();
			
			IconsInOSDAO iconsInOSDAO = new IconsInOSDAOMySQL(osSetting);
			iconsInOSDAO.load();
			IconDAO iconDAO = new IconDAOMySQL(iconsInOSDAO.getIconsInOSList());
			iconDAO.load();
			
			if(null != bgPath.getBgPath()) {
				this.bgImg = this.context.getRealPath(".").replace(this.contextPath.substring(1), "");
				this.bgImg += bgPath.getBgPath();
				this.bgImg = ImgToBase64.getBase64(this.bgImg);
			}
			
			this.externalContext.getRequestMap().put("guiSetting",guiSetting);
			this.externalContext.getRequestMap().put("contextPath",this.contextPath);
			this.externalContext.getRequestMap().put("iconList",iconDAO.getIconList());
			this.externalContext.getRequestMap().put("bgImg",this.bgImg);
		}
	}
}
