package apps.userManager.jsfs;
import java.io.File;
import java.io.IOException;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import org.apache.commons.io.FileUtils;

import apps.jsfs.ApplicationJSF;
import system.daoInterfaces.UsersDAO;
import system.daos.sqlites.UsersDAOSQLite;
import system.models.User;
import system.paths.Path;

@Named
@RequestScoped
public class UserManager extends ApplicationJSF{
	private int id;
	private UsersDAO userDao;
	private User userArray[];
	public UserManager() {
		this.userDao = new UsersDAOSQLite();
		this.userArray = this.userDao.selectAll();
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
			User tmpUser = this.userDao.selectUser(this.id);
			String userFolder = Path.storageDir + tmpUser.getEmail();
			FileUtils.deleteDirectory(new File(userFolder));
			this.userDao.delete(this.id);
			this.userArray = this.userDao.selectAll();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	public String activate() {
		this.userDao.activate(this.id);
		this.userArray = this.userDao.selectAll();
		User tmpUser = this.userDao.selectUser(this.id);
		String userFolder = this.context.getRealPath(".").replace(this.contextPath.substring(1), "");
		userFolder += "driver"+System.getProperty("file.separator")+"home"+System.getProperty("file.separator")+tmpUser.getEmail();
		File userPath = new File(userFolder);
		if(!userPath.exists()) {
			userPath.mkdirs();
			this.userDao.newUser(this.id,userPath.lastModified());
		}
		return null;
	}
	public String deactivate() {
		this.userDao.deactivate(this.id);
		this.userArray = this.userDao.selectAll();
		return null;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
}
