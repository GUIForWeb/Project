package system.daoInterfaces;

import system.models.OS;
import system.models.User;

public interface OSsDAO {
	public void load(); 
	public OS getOS();
	public void updateLastModified(long lastModified);
	public void setOS(OS os);
	public void setUser(User user);
	public void deleteAll(int userId);
}
