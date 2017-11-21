package system.daoInterfaces;

import java.util.Map;

import system.models.SharedFolder;
import system.models.SharedUser;
import system.models.User;

public interface SharedUsersDAO {
	public void load(); 
	public void setUser(User user);
	public void setShareFolder(SharedFolder sharedFolder);
	public void setPermissions(String permissions);
	public String getPermissions();
	public void insert();
	public void update(int userId);
	public void delete(int sharedFolderId);
	public Map<Integer, SharedUser> getSharedUserMap();
}
