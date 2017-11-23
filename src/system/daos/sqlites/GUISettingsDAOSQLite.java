package system.daos.sqlites;

import java.sql.ResultSet;
import java.sql.SQLException;

import system.daoInterfaces.GUISettingsDAO;
import system.databases.SQLite;
import system.models.GUISetting;
import system.models.GUISettingsInOS;

public class GUISettingsDAOSQLite implements GUISettingsDAO{
	final private String table0 = "guisettings_t";
	final private String expr0 = "theme_name";
	final private String expr1 = "icon_width";
	final private String expr2 = "icon_height";
	final private String expr3 = "icon_border_width";
	final private String expr4 = "icon_border_height";
	final private String expr5 = "icon_border_color";
	final private String expr6 = "icon_border_style";
	final private String expr7 = "icon_table_top";
	final private String expr8 = "icon_table_left";
	final private String expr9 = "win_b_border_width";
	final private String expr10 = "win_b_border_color";
	final private String expr11 = "win_b_bg_color";
	final private String expr12= "win_b_width";
	final private String expr13 = "win_b_height";
	final private String expr14 = "win_b_top";
	final private String expr15 = "win_o_bg_color";
	final private String expr16 = "win_o_border_width";
	final private String expr17 = "win_h_bg_color";
	final private String expr18 = "win_h_height";
	final private String expr19 = "win_min_width";
	final private String expr20 = "win_min_height";
	final private String expr21 = "win_o_default_left";
	final private String expr22 = "win_o_default_top";
	final private String expr23 = "win_o_default_width";
	final private String expr24 = "win_o_default_height";
	final private String expr25 = "win_c_bg_color";
	final private String expr26 = "win_h_font_family";
	final private String expr27 = "bar_o_bg_color";
	final private String expr28 = "bar_n_bg_color";
	final private String expr29 = "bar_o_width";
	final private String expr30 = "bar_o_height";
	final private String expr31 = "tbar_o_bg_color";
	final private String expr32 = "tbar_o_bg_opacity";
	final private String expr33 = "cmenu_o_font_family";
	final private String expr34 = "cmenu_o_border_radius";
	final private String expr35 = "cmenu_o_bg_color";
	final private String expr36 = "bar_o_border_width";
	final private String expr37 = "tbar_o_border_width";
	final private String expr38 = "cmenu_c_bg_color_hover";
	final private String expr39 = "cmenu_c_color";
	final private String expr40 = "cmenu_c_color_hover";
	final private String expr41 = "cmenu_c_border_radius_hover";
	final private String expr42 = "id";
	
	
	
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
		String query = "UPDATE "+this.table0+" SET "+this.expr0+" = ?, "+this.expr1+" = ?, "+this.expr2+" = ?, "+this.expr3+" = ?, "+this.expr4+" = ?, "+this.expr5+" = ? WHERE "+this.expr42+" = ?";
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
		String query = "UPDATE "+this.table0+" SET "+this.expr0+" = ?, "+this.expr9+" = ?, "+this.expr10+" = ?, "+this.expr11+" = ?, "+this.expr12+" = ?, "+this.expr13+" = ?, "+this.expr14+" = ?, "+this.expr15+" = ?, "+this.expr16+" = ?, "+this.expr17+" = ?, "+this.expr18+" = ?, "+this.expr19+" = ?, "+this.expr20+" = ? WHERE "+this.expr42+" = ?";
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
		String query = "SELECT * FROM "+this.table0+" WHERE "+this.expr42+" = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.guiSettingsInOS.getGUISettingId());
		try {
			this.rset = this.db.executeQuery(query, info);
			while(this.rset.next()){
				this.guiSetting.setId(this.rset.getInt(this.expr42));
				this.guiSetting.setThemeName(this.rset.getString(this.expr0));
				this.guiSetting.setIconWidth(this.rset.getDouble(this.expr1));
				this.guiSetting.setIconHeight(this.rset.getDouble(this.expr2));
				this.guiSetting.setIconBorderWidth(this.rset.getDouble(this.expr3));
				this.guiSetting.setIconBorderHeight(this.rset.getDouble(this.expr4));
				this.guiSetting.setIconBorderColor(this.rset.getString(this.expr5));
				this.guiSetting.setIconBorderStyle(this.rset.getString(this.expr6));
				this.guiSetting.setIconTableTop(this.rset.getDouble(this.expr7));
				this.guiSetting.setIconTableLeft(this.rset.getDouble(this.expr8));
				this.guiSetting.setWinBWidth(this.rset.getDouble(this.expr12));
				this.guiSetting.setWinBHeight(this.rset.getDouble(this.expr13));
				this.guiSetting.setWinBTop(this.rset.getDouble(this.expr14));
				this.guiSetting.setWinBBorderWidth(this.rset.getDouble(this.expr9));
				this.guiSetting.setWinBBorderColor(this.rset.getString(this.expr10));
				this.guiSetting.setWinBBgColor(this.rset.getString(this.expr11));
				this.guiSetting.setWinHHeight(this.rset.getDouble(this.expr18));
				this.guiSetting.setWinHBgColor(this.rset.getString(this.expr17));
				this.guiSetting.setWinOBgColor(this.rset.getString(this.expr15));
				this.guiSetting.setWinODefaultLeft(this.rset.getDouble(this.expr21));
				this.guiSetting.setWinODefaultTop(this.rset.getDouble(this.expr22));
				this.guiSetting.setWinODefaultWidth(this.rset.getDouble(this.expr23));
				this.guiSetting.setWinODefaultHeight(this.rset.getDouble(this.expr24));
				this.guiSetting.setWinOBorderWidth(this.rset.getDouble(this.expr16));
				this.guiSetting.setWinMinWidth(this.rset.getDouble(this.expr19));
				this.guiSetting.setWinMinHeight(this.rset.getDouble(this.expr20));
				this.guiSetting.setWinCBgColor(this.rset.getString(this.expr25));
				this.guiSetting.setWinHFontFamily(this.rset.getString(this.expr26));
				this.guiSetting.setBarOBgColor(this.rset.getString(this.expr27));
				this.guiSetting.setBarNBgColor(this.rset.getString(this.expr28));
				this.guiSetting.setBarOWidth(this.rset.getDouble(this.expr29));
				this.guiSetting.setBarOHeight(this.rset.getDouble(this.expr30));
				this.guiSetting.setBarOBorderWidth(this.rset.getDouble(this.expr36));
				this.guiSetting.setTbarOBgColor(this.rset.getString(this.expr31));
				this.guiSetting.setTbarOOpacity(this.rset.getDouble(this.expr32));
				this.guiSetting.setTbarOBorderWidth(this.rset.getDouble(this.expr37));
				this.guiSetting.setCmenuOFontFamily(this.rset.getString(this.expr33));
				this.guiSetting.setCmenuOBorderRadius(this.rset.getDouble(this.expr34));
				this.guiSetting.setCmenuOBgColor(this.rset.getString(this.expr35));
				this.guiSetting.setCmenuCBgColorHover(this.rset.getString(this.expr38));
				this.guiSetting.setCmenuCColor(this.rset.getString(this.expr39));
				this.guiSetting.setCmenuCColorHover(this.rset.getString(this.expr40));
				this.guiSetting.setCmenuCBorderRadiusHover(this.rset.getDouble(this.expr41));
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
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr42+" = ?";
		this.db.executeUpdate(query,id);
	}
}
