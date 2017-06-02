package system.daoInterfaces;

import system.models.BgPath;

public interface BgPathDAO {
	public void load();
	public BgPath getBgPath();
	public void update();
	public void setGUIId(int guiId);
	public void setBgPath(String bgPath);
}
