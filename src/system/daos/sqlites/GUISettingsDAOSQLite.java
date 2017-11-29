package system.daos.sqlites;

import java.sql.ResultSet;
import java.sql.SQLException;

import system.daoInterfaces.GUISettingsDAO;
import system.databases.SQLite;
import system.models.GUISetting;
import system.models.GUISettingsInOS;

public class GUISettingsDAOSQLite implements GUISettingsDAO{
	final private String table0 = "guisettings_t";
	final private String expr0 = "id";
	final private String expr1 = "theme_name";
	final private String expr2_0 = "icon_width";
	final private String expr2_1 = "icon_height";
	final private String expr2_2 = "icon_border_width";
	final private String expr2_3 = "icon_border_height";
	final private String expr2_4 = "icon_table_left";
	final private String expr2_5 = "icon_table_top";
	final private String expr2_6 = "icon_border_color";
	final private String expr2_7 = "icon_border_style";
	final private String expr3_0 = "win_min_width";
	final private String expr3_1 = "win_min_height";
	final private String expr4_0 = "win_o_default_left";
	final private String expr4_1 = "win_o_default_top";
	final private String expr4_2 = "win_o_default_width";
	final private String expr4_3 = "win_o_default_height";
	final private String expr4_4 = "win_o_border_width";
	final private String expr4_5 = "win_o_bg_color";
	final private String expr5_0 = "win_h_height";
	final private String expr5_1 = "win_h_bg_color";
	final private String expr5_2 = "win_h_font_family";
	final private String expr6_0 = "win_c_bg_color";
	final private String expr7_0= "win_b_width";
	final private String expr7_1 = "win_b_height";
	final private String expr7_2 = "win_b_top";
	final private String expr7_3 = "win_b_border_width";
	final private String expr7_4 = "win_b_border_color";
	final private String expr7_5 = "win_b_bg_color";
	final private String expr8_0 = "bar_o_width";
	final private String expr8_1 = "bar_o_height";
	final private String expr8_2 = "bar_o_border_width";
	final private String expr8_3 = "bar_o_bg_color";
	final private String expr9_0 = "bar_n_bg_color";
	final private String expr10_0 = "tbar_o_border_width";
	final private String expr10_1 = "tbar_o_opacity";
	final private String expr10_2 = "tbar_o_bg_color";
	final private String expr11_0 = "cmenu_o_width";
	final private String expr11_1 = "cmenu_o_height";
	final private String expr11_2 = "cmenu_o_font_size";
	final private String expr11_3 = "cmenu_o_border_radius";
	final private String expr11_4 = "cmenu_o_bg_color";
	final private String expr11_5 = "cmenu_o_font_family";
	final private String expr12_0 = "cmenu_l_height";	
	final private String expr12_1 = "cmenu_l_border_radius_hover";
	final private String expr12_2 = "cmenu_l_color";
	final private String expr12_3 = "cmenu_l_bg_color_hover";
	final private String expr12_4 = "cmenu_l_color_hover";
	final private String expr13_0 = "tmenu_o_width";
	final private String expr13_1 = "tmenu_o_font_size";
	final private String expr13_2 = "tmenu_o_bg_color";
	final private String expr13_3 = "tmenu_o_font_family";
	final private String expr14_0 = "tmenu_l_height";
	final private String expr14_1 = "tmenu_l_color";
	final private String expr14_2 = "tmenu_l_border_radious_hover";
	final private String expr14_3 = "tmenu_l_color_hover";
	final private String expr14_4 = "tmenu_l_bg_color_hover";
	
	private SQLite db;
	private GUISettingsInOS guiSettingsInOS;
	private ResultSet rset;
	private GUISetting guiSetting;
	
	public GUISettingsDAOSQLite(){
		this.db = new SQLite();
		this.guiSettingsInOS = new GUISettingsInOS();
		this.guiSetting = new GUISetting();
	}
	public GUISettingsDAOSQLite(GUISettingsInOS guisInOS){
		this.db = new SQLite();
		this.guiSettingsInOS = guisInOS;
		this.guiSetting = new GUISetting();
	}
	public void updateIcon() {
		String query = "UPDATE "+this.table0+" SET "+this.expr1+" = ?, "+this.expr2_0+" = ?, "+this.expr2_1+" = ?, "+this.expr2_2+" = ?, "+this.expr2_3+" = ?, "+this.expr2_6+" = ? WHERE "+this.expr0+" = ?";
		String[] info = new String[7];
		info[0] = this.guiSetting.getThemeName();
		info[1] = String.valueOf(this.guiSetting.getIconWidth());
		info[2] = String.valueOf(this.guiSetting.getIconHeight());
		info[3] = String.valueOf(this.guiSetting.getIconBorderWidth());
		info[4] = String.valueOf(this.guiSetting.getIconBorderHeight());
		info[5] = String.valueOf(this.guiSetting.getIconBorderColor());
		info[6] = String.valueOf(this.guiSetting.getId());
		this.db.executeUpdate(query, info);
	}
	public void updateInteface() {
		//change all
		String query = "UPDATE "+this.table0+" SET "+this.expr1+" = ?, "+this.expr7_3+" = ?, "+this.expr7_4+" = ?, "+this.expr7_5+" = ?, "+this.expr7_0+" = ?, "+this.expr7_1+" = ?, "+this.expr7_2+" = ?, "+this.expr4_5+" = ?, "+this.expr4_4+" = ?, "+this.expr5_1+" = ?, "+this.expr5_0+" = ?, "+this.expr3_0+" = ?, "+this.expr3_1+" = ? WHERE "+this.expr0+" = ?";
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
		this.db.executeUpdate(query, info);
	}
	public void load(){
		String query = "SELECT * FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.guiSettingsInOS.getGUISettingId());
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				this.guiSetting.setId(this.rset.getInt(this.expr0));
				this.guiSetting.setThemeName(this.rset.getString(this.expr1));
				this.guiSetting.setIconWidth(this.rset.getDouble(this.expr2_0));
				this.guiSetting.setIconHeight(this.rset.getDouble(this.expr2_1));
				this.guiSetting.setIconBorderWidth(this.rset.getDouble(this.expr2_2));
				this.guiSetting.setIconBorderHeight(this.rset.getDouble(this.expr2_3));
				this.guiSetting.setIconBorderColor(this.rset.getString(this.expr2_6));
				this.guiSetting.setIconBorderStyle(this.rset.getString(this.expr2_7));
				this.guiSetting.setIconTableTop(this.rset.getDouble(this.expr2_5));
				this.guiSetting.setIconTableLeft(this.rset.getDouble(this.expr2_4));
				this.guiSetting.setWinBWidth(this.rset.getDouble(this.expr7_0));
				this.guiSetting.setWinBHeight(this.rset.getDouble(this.expr7_1));
				this.guiSetting.setWinBTop(this.rset.getDouble(this.expr7_2));
				this.guiSetting.setWinBBorderWidth(this.rset.getDouble(this.expr7_3));
				this.guiSetting.setWinBBorderColor(this.rset.getString(this.expr7_4));
				this.guiSetting.setWinBBgColor(this.rset.getString(this.expr7_5));
				this.guiSetting.setWinHHeight(this.rset.getDouble(this.expr5_0));
				this.guiSetting.setWinHBgColor(this.rset.getString(this.expr5_1));
				this.guiSetting.setWinOBgColor(this.rset.getString(this.expr4_5));
				this.guiSetting.setWinODefaultLeft(this.rset.getDouble(this.expr4_0));
				this.guiSetting.setWinODefaultTop(this.rset.getDouble(this.expr4_1));
				this.guiSetting.setWinODefaultWidth(this.rset.getDouble(this.expr4_2));
				this.guiSetting.setWinODefaultHeight(this.rset.getDouble(this.expr4_3));
				this.guiSetting.setWinOBorderWidth(this.rset.getDouble(this.expr4_4));
				this.guiSetting.setWinMinWidth(this.rset.getDouble(this.expr3_0));
				this.guiSetting.setWinMinHeight(this.rset.getDouble(this.expr3_1));
				this.guiSetting.setWinCBgColor(this.rset.getString(this.expr6_0));
				this.guiSetting.setWinHFontFamily(this.rset.getString(this.expr5_2));
				this.guiSetting.setBarOBgColor(this.rset.getString(this.expr8_3));
				this.guiSetting.setBarNBgColor(this.rset.getString(this.expr9_0));
				this.guiSetting.setBarOWidth(this.rset.getDouble(this.expr8_0));
				this.guiSetting.setBarOHeight(this.rset.getDouble(this.expr8_1));
				this.guiSetting.setBarOBorderWidth(this.rset.getDouble(this.expr8_2));
				this.guiSetting.setTbarOBgColor(this.rset.getString(this.expr10_2));
				this.guiSetting.setTbarOOpacity(this.rset.getDouble(this.expr10_1));
				this.guiSetting.setTbarOBorderWidth(this.rset.getDouble(this.expr10_0));
				this.guiSetting.setCmenuOFontFamily(this.rset.getString(this.expr11_5));
				this.guiSetting.setCmenuOBorderRadius(this.rset.getDouble(this.expr11_3));
				this.guiSetting.setCmenuOBgColor(this.rset.getString(this.expr11_4));
				this.guiSetting.setCmenuLBgColorHover(this.rset.getString(this.expr12_3));
				this.guiSetting.setCmenuLColor(this.rset.getString(this.expr12_2));
				this.guiSetting.setCmenuLColorHover(this.rset.getString(this.expr12_4));
				this.guiSetting.setCmenuLBorderRadiusHover(this.rset.getDouble(this.expr12_1));
				this.guiSetting.setCmenuOWidth(this.rset.getDouble(this.expr11_0));
				this.guiSetting.setCmenuOHeight(this.rset.getDouble(this.expr11_1));
				this.guiSetting.setCmenuLHeight(this.rset.getDouble(this.expr12_0));
				this.guiSetting.setCmenuOFontSize(this.rset.getDouble(this.expr11_2));
				this.guiSetting.setTmenuLHeight(this.rset.getDouble(this.expr14_0));
				this.guiSetting.setTmenuOWidth(this.rset.getDouble(this.expr13_0));
				this.guiSetting.setTmenuOFontSize(this.rset.getDouble(this.expr13_1));
				this.guiSetting.setTmenuOBgColor(this.rset.getString(this.expr13_2));
				this.guiSetting.setTmenuLColor(this.rset.getString(this.expr14_1));
				this.guiSetting.setTmenuLBgColorHover(this.rset.getString(this.expr14_4));
				this.guiSetting.setTmenuLColorHover(this.rset.getString(this.expr14_3));
				this.guiSetting.setTmenuLBorderRadiusHover(this.rset.getDouble(this.expr14_2));
				this.guiSetting.setTmenuOFontFamily(this.rset.getString(this.expr13_3));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
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
	@Override
	public void deleteAll(int id) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr0+" = ?";
		this.db.executeUpdate(query,id);
	}
}
