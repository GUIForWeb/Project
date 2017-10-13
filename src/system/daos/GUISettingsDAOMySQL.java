package system.daos;

import java.sql.ResultSet;
import java.sql.SQLException;

import system.daoInterfaces.GUISettingsDAO;
import system.databases.MySQL;
import system.models.GUISetting;
import system.models.GUIsInOS;

public class GUISettingsDAOMySQL implements GUISettingsDAO{
	private MySQL db;
	private GUIsInOS guisInOS;
	private ResultSet rset;
	private GUISetting guiSetting;
	
	public GUISettingsDAOMySQL(){
		this.db = new MySQL();
		this.guisInOS = new GUIsInOS();
		this.guiSetting = new GUISetting();
	}
	public GUISettingsDAOMySQL(GUIsInOS guisInOS){
		this.db = new MySQL();
		this.guisInOS = guisInOS;
		this.guiSetting = new GUISetting();
	}
	public void updateIcon() {
		String query = "UPDATE guisettings_t SET theme_name = ?, icon_width = ?, icon_height = ?, icon_border_width = ?, icon_border_height = ?, icon_border_color = ? WHERE id = ?";
		String[] info = new String[7];
		info[0] = this.guiSetting.getThemeName();
		info[1] = String.valueOf(this.guiSetting.getIconWidth());
		info[2] = String.valueOf(this.guiSetting.getIconHeight());
		info[3] = String.valueOf(this.guiSetting.getIconBorderWidth());
		info[4] = String.valueOf(this.guiSetting.getIconBorderHeight());
		info[5] = String.valueOf(this.guiSetting.getIconBorderColor());
		info[6] = String.valueOf(this.guiSetting.getId());
		this.db.connect();
		this.db.update(query, info);
		this.db.close();
	}
	public void updateWindow() {
		String query = "UPDATE guisettings_t SET theme_name = ?, win_b_border_width = ?, win_b_border_color = ?, win_b_bg_color = ?, win_b_width = ?, win_b_height = ?, win_b_top = ?, win_o_bg_color = ?, win_o_border_width = ?, win_h_bg_color = ?, win_h_height = ?, win_min_width = ?, win_min_height = ? WHERE id = ?";
		String[] info = new String[14];
		info[0] = this.guiSetting.getThemeName();
		info[1] = String.valueOf(this.guiSetting.getWinBBorderWidth());
		info[2] = this.guiSetting.getWinBBorderColor();
		info[3] = this.guiSetting.getWinBBgColor();
		info[4] = String.valueOf(this.guiSetting.getWinBWidth());
		info[5] = String.valueOf(this.guiSetting.getWinBHeight());
		info[6] = String.valueOf(this.guiSetting.getWinBTop());
		info[7] = this.guiSetting.getWinOBgColor();
		info[8] = String.valueOf(this.guiSetting.getWinOBorderWidth());
		info[9] = this.guiSetting.getWinHBgColor();
		info[10] = String.valueOf(this.guiSetting.getWinHHeight());
		info[11] = String.valueOf(this.guiSetting.getWinMinWidth());
		info[12] = String.valueOf(this.guiSetting.getWinMinHeight());
		info[13] = String.valueOf(this.guiSetting.getId());
		this.db.connect();
		this.db.update(query, info);
		this.db.close();
	}
	public void load(){
		String query = "SELECT * FROM guisettings_t WHERE id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.guisInOS.getGuiId());
		this.db.connect();
		this.rset = this.db.select(query, info);
		try {
			while(this.rset.next()){
				this.guiSetting.setId(this.rset.getInt("id"));
				this.guiSetting.setThemeName(this.rset.getString("theme_name"));
				this.guiSetting.setIconWidth(this.rset.getDouble("icon_width"));
				this.guiSetting.setIconHeight(this.rset.getDouble("icon_height"));
				this.guiSetting.setIconBorderWidth(this.rset.getDouble("icon_border_width"));
				this.guiSetting.setIconBorderHeight(this.rset.getDouble("icon_border_height"));
				this.guiSetting.setIconBorderStyle(this.rset.getString("icon_border_style"));
				this.guiSetting.setIconBorderColor(this.rset.getString("icon_border_color"));
				this.guiSetting.setIconTableTop(this.rset.getDouble("icon_table_top"));
				this.guiSetting.setIconTableLeft(this.rset.getDouble("icon_table_left"));
				this.guiSetting.setWinBWidth(this.rset.getDouble("win_b_width"));
				this.guiSetting.setWinBHeight(this.rset.getDouble("win_b_height"));
				this.guiSetting.setWinBTop(this.rset.getDouble("win_b_top"));
				this.guiSetting.setWinBBorderWidth(this.rset.getDouble("win_b_border_width"));
				this.guiSetting.setWinBBorderColor(this.rset.getString("win_b_border_color"));
				this.guiSetting.setWinBBgColor(this.rset.getString("win_b_bg_color"));
				this.guiSetting.setWinHHeight(this.rset.getDouble("win_h_height"));
				this.guiSetting.setWinHBgColor(this.rset.getString("win_h_bg_color"));
				this.guiSetting.setWinOBgColor(this.rset.getString("win_o_bg_color"));
				this.guiSetting.setWinODefaultLeft(this.rset.getDouble("win_o_default_left"));
				this.guiSetting.setWinODefaultTop(this.rset.getDouble("win_o_default_top"));
				this.guiSetting.setWinODefaultWidth(this.rset.getDouble("win_o_default_width"));
				this.guiSetting.setWinODefaultHeight(this.rset.getDouble("win_o_default_height"));
				this.guiSetting.setWinOBorderWidth(this.rset.getDouble("win_o_border_width"));
				this.guiSetting.setWinMinWidth(this.rset.getDouble("win_min_width"));
				this.guiSetting.setWinMinHeight(this.rset.getDouble("win_min_height"));
				this.guiSetting.setWinCBgColor(this.rset.getString("win_c_bg_color"));
				this.guiSetting.setWinHFontFamily(this.rset.getString("win_h_font_family"));
				this.guiSetting.setBarOBgColor(this.rset.getString("bar_o_bg_color"));
				this.guiSetting.setBarNBgColor(this.rset.getString("bar_n_bg_color"));
				this.guiSetting.setBarOWidth(this.rset.getDouble("bar_o_width"));
				this.guiSetting.setBarOHeight(this.rset.getDouble("bar_o_height"));
				this.guiSetting.setBarOBorderWidth(this.rset.getDouble("bar_o_border_width"));
				this.guiSetting.setTbarOBgColor(this.rset.getString("tbar_o_bg_color"));
				this.guiSetting.setTbarOOpacity(this.rset.getDouble("tbar_o_bg_opacity"));
				this.guiSetting.setTbarOBorderWidth(this.rset.getDouble("tbar_o_border_width"));
				this.guiSetting.setCmenuOFontFamily(this.rset.getString("cmenu_o_font_family"));
				this.guiSetting.setCmenuOBorderRadius(this.rset.getDouble("cmenu_o_border_radius"));
				this.guiSetting.setCmenuOBgColor(this.rset.getString("cmenu_o_bg_color"));
				this.guiSetting.setCmenuCBgColorHover(this.rset.getString("cmenu_c_bg_color_hover"));
				this.guiSetting.setCmenuCColor(this.rset.getString("cmenu_c_color"));
				this.guiSetting.setCmenuCColorHover(this.rset.getString("cmenu_c_color_hover"));
				this.guiSetting.setCmenuCBorderRadiusHover(this.rset.getDouble("cmenu_c_border_radius_hover"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.db.close();
	}
	
	public MySQL getDb() {
		return db;
	}
	public void setDb(MySQL db) {
		this.db = db;
	}
	public ResultSet getRset() {
		return rset;
	}
	public void setRset(ResultSet rset) {
		this.rset = rset;
	}
	@Override
	public GUISetting getGUISetting() {
		return this.guiSetting;
	}
	public void setGUISetting(GUISetting guiSetting) {
		this.guiSetting = guiSetting;
	}
}
