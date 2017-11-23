package system.daoInterfaces;

import system.models.BgPath;

public interface BgPathsDAO {
	public void load();
	public BgPath getBgPath();
	public void update();
	public void setGUISettingId(int guiId);
	public void setBgPath(String bgPath);
	public void deleteAll(int guisettingId);
}
