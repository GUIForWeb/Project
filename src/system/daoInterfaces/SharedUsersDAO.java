package system.daoInterfaces;

import java.util.Map;

import system.models.SharedFolder;
import system.models.SharedUser;
import system.models.User;

public interface SharedUsersDAO {
	public void load(); 
	public void setUser(User user);
	public void setFolder(String folder);
	public void setShareFolder(SharedFolder sharedFolder);
	public void setPermissions(String permissions);
	public String getPermissions();
	public void shareFolderWithUser();
	public Map<Integer, SharedUser> getSharedUserMap();
}
