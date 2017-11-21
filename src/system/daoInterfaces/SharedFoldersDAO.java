package system.daoInterfaces;

import system.models.SharedFolder;
import system.models.User;

public interface SharedFoldersDAO {
	public void load(); 
	public void setUser(User user);
	public void setFolder(String folder);
	public SharedFolder getShareFolder();
	public void newSharedFolder();
}
