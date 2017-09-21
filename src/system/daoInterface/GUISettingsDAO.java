package system.daoInterface;

import system.model.GUISetting;

public interface GUISettingsDAO {
	public void updateIcon();
	public void updateWindow(); 
	public void load(); 
	public GUISetting getGUISetting();
	public void setGUISetting(GUISetting guiSetting);
}
