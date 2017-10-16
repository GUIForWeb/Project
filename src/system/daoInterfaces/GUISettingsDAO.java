package system.daoInterfaces;

import system.models.GUISetting;

public interface GUISettingsDAO {
	public void updateIcon();
	public void updateInteface(); 
	public void load(); 
	public GUISetting getGUISetting();
	public void setGUISetting(GUISetting guiSetting);
}
