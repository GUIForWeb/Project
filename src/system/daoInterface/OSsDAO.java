package system.daoInterface;

import system.model.OS;
import system.model.User;

public interface OSsDAO {
	public void load(); 
	public OS getOS();
	public void updateLastModified(long lastModified);
	public void setOS(OS os);
	public void setUser(User user);
}
