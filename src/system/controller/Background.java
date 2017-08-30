package system.controller;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import system.controller.Controller;
import system.dao.BgPathDAOMySQL;
import system.dao.GUISettingDAOMySQL;
import system.dao.GUIsInOSDAOMySQL;
import system.dao.IconDAOMySQL;
import system.dao.IconsInOSDAOMySQL;
import system.dao.OSSettingDAOMySQL;
import system.daoInterface.BgPathDAO;
import system.daoInterface.GUISettingDAO;
import system.daoInterface.GUIsInOSDAO;
import system.daoInterface.IconDAO;
import system.daoInterface.IconsInOSDAO;
import system.daoInterface.OSSettingDAO;
import system.helper.ImgToBase64;
import system.model.BgPath;
import system.model.GUISetting;
import system.model.GUIsInOS;
import system.model.OSSetting;
import system.model.User;
import system.model.Window;

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
