package system.daoInterfaces;

import java.util.Map;

import system.models.SharedFolder;
import system.models.User;

public interface SharedFoldersDAO {
	public void loadUsersForFolder();
	public void setUser(User user);
	public void setFolder(String folder);
	public SharedFolder getShareFolder();
	public void newSharedFolder();
	public void deleteAll(int userId);
	public void selectFolders(String ids);
	public Map<Integer, SharedFolder> getSharedFolderMap();
}
