package apps.userManager.controller;
import java.io.File;
import java.io.IOException;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import apps.Application;
import system.dao.UserDAOMySQL;
import system.daoInterface.UserDAO;
import system.model.User;

@Named
@RequestScoped
public class UserManager extends Application{
	private int id;
	private UserDAO userDao;
	private User userArray[];
	public UserManager() {
		this.userDao = new UserDAOMySQL();
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
		this.userDao.delete(this.id);
		this.userArray = this.userDao.selectAll();
		return null;
	}
	public String activate() {
		this.userDao.activate(this.id);
		this.userArray = this.userDao.selectAll();
		User tmpUser = this.userDao.selectUser(this.id);
		String userFolder = this.context.getRealPath(".").replace(this.contextPath.substring(1), "");
		userFolder += "driver/home/"+tmpUser.getEmail();
		File userPath = new File(userFolder);
		if(!userPath.exists()) {
			userPath.mkdirs();
			this.userDao.newUser(this.id);
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