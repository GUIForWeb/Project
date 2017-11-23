package system.daoInterfaces;

import system.models.GUISettingsInOS;
import system.models.OS;

public interface GUISettingsInOSDAO {
	public void load(); 
	public GUISettingsInOS getGUISettingsInOS();
	public void deleteAll(int osId);
	public void setOs(OS os);
}
