package apps.sharedFileBrowser.modules;

import javax.servlet.http.HttpSession;

import system.daoInterfaces.SharedFoldersDAO;
import system.daoInterfaces.SharedUsersDAO;
import system.daos.sqlites.SharedFoldersDAOSQLite;
import system.daos.sqlites.SharedUsersDAOSQLite;
import system.models.User;

public class SFBManager {
	private HttpSession session;
	private User user;
	private SharedFoldersDAO sfDAO;
	private SharedUsersDAO suDAO;
	public SFBManager() {
		
	}
	public void loadSharedFolders() {
		this.sfDAO = new SharedFoldersDAOSQLite();
		this.suDAO = new SharedUsersDAOSQLite();
		this.suDAO.setUser(this.user);
		this.suDAO.loadFoldersForUser();
		System.out.println(this.suDAO.getSharedUserMap());
		//load shared folder data and unite with shared user's permission
		/*
		this.userFolder = (String) this.session.getAttribute("userFolder");
		this.desktopPath += this.userFolder + this.fileSeparator + "Desktop";
		*/
	}
	public HttpSession getSession() {
		return session;
	}
	public void setSession(HttpSession session) {
		this.session = session;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
}
