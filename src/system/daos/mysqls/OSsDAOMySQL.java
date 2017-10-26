/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: User DAO for MySQL
****************************************************************************************************/
package system.daos.mysqls;

import java.sql.ResultSet;
import java.sql.SQLException;

import system.daoInterfaces.OSsDAO;
import system.databases.MySQL;
import system.models.OS;
import system.models.User;

public class OSsDAOMySQL implements OSsDAO {
	private MySQL db;
	private User user;
	private ResultSet rset;
	private OS os;

	public OSsDAOMySQL() {
		this.db = new MySQL();
		this.user = new User();
		this.os = new OS();
	}

	public OSsDAOMySQL(User user) {
		this.db = new MySQL();
		this.user = user;
		this.os = new OS();
	}

	@Override
	public void updateLastModified(long lastModified) {
		String query = "UPDATE oss_t SET last_modified_desktop=? WHERE id = ? AND user_id = ?";
		long[] info = new long[3];
		info[0] = lastModified;
		info[1] = this.os.getId();
		info[2] = this.user.getId();
		this.db.connect();
		this.db.update(query,info);
		this.db.close();
	}

	@Override
	public void load() {
		String query = "SELECT * FROM oss_t WHERE selected = 1 AND user_id = ?";
		String[] info = new String[1];
		info[0] = String.valueOf(this.user.getId());
		this.db.connect();
		this.rset = this.db.select(query, info);
		try {
			while (this.rset.next()) {
				this.os.setId(this.rset.getInt("id"));
				this.os.setUserId(this.rset.getInt("user_id"));
				this.os.setSelected(this.rset.getBoolean("selected"));
				this.os.setLastModifiedDesktop(this.rset.getBigDecimal("last_modified_desktop").longValue());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		this.db.close();
	}

	public OS getOS() {
		return os;
	}

	public void setOS(OS os) {
		this.os = os;
	}

	public MySQL getDb() {
		return db;
	}

	public void setDb(MySQL db) {
		this.db = db;
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
}
