package apps.userManager.jsfs;
import java.io.File;
import java.io.IOException;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import org.apache.commons.io.FileUtils;

import apps.jsfs.ApplicationJSF;
import system.daoInterfaces.BgPathsDAO;
import system.daoInterfaces.DataIconsDAO;
import system.daoInterfaces.GUISettingsDAO;
import system.daoInterfaces.GUISettingsInOSDAO;
import system.daoInterfaces.IconsInOSDAO;
import system.daoInterfaces.OSsDAO;
import system.daoInterfaces.SharedFoldersDAO;
import system.daoInterfaces.SharedUsersDAO;
import system.daoInterfaces.UsersDAO;
import system.daos.sqlites.BgPathsDAOSQLite;
import system.daos.sqlites.DataIconsDAOSQLite;
import system.daos.sqlites.GUISettingsDAOSQLite;
import system.daos.sqlites.GUISettingsInOSDAOSQLite;
import system.daos.sqlites.IconsInOSDAOSQLite;
import system.daos.sqlites.OSsDAOSQLite;
import system.daos.sqlites.SharedFoldersDAOSQLite;
import system.daos.sqlites.SharedUsersDAOSQLite;
import system.daos.sqlites.UsersDAOSQLite;
import system.models.GUISettingsInOS;
import system.models.OS;
import system.models.User;
import system.paths.Path;

@Named
@RequestScoped
public class UserManager extends ApplicationJSF{
	private int id;
	private UsersDAO userDAO;
	private OSsDAO ossDAO;
	private GUISettingsInOSDAO guiSettingsInOSDAO;  
	private GUISettingsDAO guiSettingsDAO;
	private BgPathsDAO bgPathDAO;
	private DataIconsDAO dataIconsDAO;
	private IconsInOSDAO iconsInOSDAO;
	private SharedFoldersDAO sharedFoldersDAO;
	private SharedUsersDAO sharedUsersDAO;
	private User userArray[];
	public UserManager() {
		this.userDAO = new UsersDAOSQLite();
		this.userArray = this.userDAO.selectAll();
		this.ossDAO = new OSsDAOSQLite();
		this.guiSettingsInOSDAO = new GUISettingsInOSDAOSQLite();  
		this.guiSettingsDAO = new GUISettingsDAOSQLite();
		this.bgPathDAO = new BgPathsDAOSQLite();
		this.dataIconsDAO = new DataIconsDAOSQLite();
		this.iconsInOSDAO = new IconsInOSDAOSQLite();
		this.sharedFoldersDAO = new SharedFoldersDAOSQLite();
		this.sharedUsersDAO = new SharedUsersDAOSQLite();
	}
	public User[] getUserArray() {
		return userArray; 
	}
	public void start() {
		this.redirect();
		if(!this.user.getEmail().equals("admin"))
			try {
				this.externalContext.redirect(this.contextPath+"/view/logout.jsf");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	public void setUserArray(User[] userArray) {
		this.userArray = userArray;
	}
	public String delete() {
		try {
			User tmpUser = this.userDAO.selectUser(this.id);
			String userFolder = Path.storageDir + tmpUser.getEmail();
			FileUtils.deleteDirectory(new File(userFolder));
			this.ossDAO.setUser(tmpUser);
			this.ossDAO.load();
			OS tmpOS = this.ossDAO.getOS();
			this.guiSettingsInOSDAO.setOs(tmpOS);
			this.guiSettingsInOSDAO.load();
			GUISettingsInOS tmpGIO = this.guiSettingsInOSDAO.getGUISettingsInOS();
			this.guiSettingsDAO.deleteAll(tmpGIO.getGUISettingId());
			this.bgPathDAO.deleteAll(tmpGIO.getGUISettingId());
			this.dataIconsDAO.deleteAll(tmpOS.getId());
			this.iconsInOSDAO.deleteAll(tmpOS.getId());
			this.ossDAO.deleteAll(this.id);
			this.sharedFoldersDAO.deleteAll(this.id);
			this.sharedUsersDAO.deleteAll(this.id);
			this.guiSettingsInOSDAO.deleteAll(tmpOS.getId());
			this.userDAO.delete(this.id);
			this.userArray = this.userDAO.selectAll();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	public String activate() {
		this.userDAO.activate(this.id);
		this.userArray = this.userDAO.selectAll();
		User tmpUser = this.userDAO.selectUser(this.id);
		String userFolder = Path.storageDir+tmpUser.getEmail();
		File userPath = new File(userFolder);
		if(!userPath.exists()) {
			userPath.mkdirs();
			this.userDAO.newUser(this.id,userPath.lastModified());
		}
		return null;
	}
	public String deactivate() {
		this.userDAO.deactivate(this.id);
		this.userArray = this.userDAO.selectAll();
		return null;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
}
