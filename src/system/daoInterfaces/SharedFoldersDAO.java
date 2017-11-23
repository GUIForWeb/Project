package system.daoInterfaces;

import system.models.SharedFolder;
import system.models.User;

public interface SharedFoldersDAO {
	public void loadUsersForFolder();
	public void setUser(User user);
	public void setFolder(String folder);
	public SharedFolder getShareFolder();
	public void newSharedFolder();
	public void deleteAll(int userId);
}
