/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: User DAO for MySQL
****************************************************************************************************/
package system.daos.sqlites;

import java.sql.ResultSet;
import java.sql.SQLException;

import system.daoInterfaces.OSsDAO;
import system.databases.SQLite;
import system.models.OS;
import system.models.User;

public class OSsDAOSQLite implements OSsDAO {
	final private String table0 = "oss_t";
	final private String expr0 = "id";
	final private String expr1 = "user_id";
	final private String expr2 = "last_modified_desktop";
	final private String expr3 = "selected";
	private SQLite db;
	private User user;
	private ResultSet rset;
	private OS os;

	public OSsDAOSQLite() {
		this.db = new SQLite();
		this.user = new User();
		this.os = new OS();
	}

	public OSsDAOSQLite(User user) {
		this.db = new SQLite();
		this.user = user;
		this.os = new OS();
	}

	@Override
	public void updateLastModified(long lastModified) {
		String query = "UPDATE "+this.table0+" SET "+this.expr2+"=? WHERE "+this.expr0+" = ? AND "+this.expr1+" = ?";
		long[] info = new long[3];
		info[0] = lastModified;
		info[1] = this.os.getId();
		info[2] = this.user.getId();
		this.db.executeUpdate(query,info);
	}

	@Override
	public void load() {
		String query = "SELECT * FROM "+this.table0+" WHERE "+this.expr3+" = 1 AND "+this.expr1+" = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.user.getId());
		try {
			this.rset = this.db.executeQuery(query, info);
			while (this.rset.next()) {
				this.os.setId(this.rset.getInt(this.expr0));
				this.os.setUserId(this.rset.getInt(this.expr1));
				this.os.setSelected(this.rset.getBoolean(this.expr3));
				this.os.setLastModifiedDesktop(this.rset.getBigDecimal(this.expr2).longValue());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public OS getOS() {
		return os;
	}

	public void setOS(OS os) {
		this.os = os;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public ResultSet getRset() {
		return rset;
	}

	public void setRset(ResultSet rset) {
		this.rset = rset;
	}

	@Override
	public void deleteAll(int userId) {
		String query = "DELETE FROM "+this.table0+" WHERE "+this.expr1+" = ?";
		this.db.executeUpdate(query,userId);
	}
}
