package system.databases;
 
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;

import system.paths.Path;
 
/**
 *
 * @author sqlitetutorial.net
 */
public class SQLite {
	private Connection conn;
	private Statement stmt;
	private PreparedStatement pstmt;
	private ResultSet rset;
	private String url;
	public SQLite() {
		try {
			DriverManager.registerDriver(new org.sqlite.JDBC());
			this.url = "jdbc:sqlite:" + Path.sqliteFile;
        } catch (SQLException e) {
          	e.printStackTrace();
        }
	}
    private void connect() throws SQLException {
    	if(null != this.conn && !this.conn.isClosed())
    		this.conn.close();
        this.conn = DriverManager.getConnection(this.url);
    }
    public ResultSet executeQuery(String query) throws SQLException {
		this.connect();
		this.stmt = conn.createStatement();
		this.rset = this.stmt.executeQuery(query);
		return this.rset;
    }
    public ResultSet executeQuery(String query, int[] info) throws SQLException {
		this.connect();
		this.pstmt = this.conn.prepareStatement(query);
		for(int ii=0; ii<info.length; ii++)
			this.pstmt.setInt(ii+1, info[ii]);
		this.rset = this.pstmt.executeQuery();
		return this.rset;
    }
    public ResultSet executeQuery(String query, String[] info) throws SQLException {
		this.connect();
		this.pstmt = this.conn.prepareStatement(query);
		for(int ii=0; ii<info.length; ii++)
			this.pstmt.setString(ii+1, info[ii]);
		this.rset = this.pstmt.executeQuery();
		return this.rset;
    }
    public int executeUpdate(String query, int info){
		int result = 0;
		try {
			this.connect();
			this.pstmt = this.conn.prepareStatement(query);
			this.pstmt.setInt(1, info);
			result = this.pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	public int executeUpdate(String query, long[] info){
		int result = 0;
		try {
			this.connect();
			this.pstmt = this.conn.prepareStatement(query);
			for(int ii=0; ii<info.length; ii++)
				this.pstmt.setLong(ii+1, info[ii]);
			result = this.pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	public int executeUpdate(String query, int[] info){
		int result = 0;
		try {
			this.connect();
			this.pstmt = this.conn.prepareStatement(query);
			for(int ii=0; ii<info.length; ii++)
				this.pstmt.setInt(ii+1, info[ii]);
			result = this.pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	public int executeUpdate(String query, String[] info){
		int result = 0;
		try {
			this.connect();
			this.pstmt = this.conn.prepareStatement(query);
			for(int ii=0; ii<info.length; ii++)
				this.pstmt.setString(ii+1, info[ii]);
			result = this.pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	public int executeUpdate(String query){
		int result = 0;
		try {
			this.connect();
			this.pstmt = this.conn.prepareStatement(query);
			result = this.pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
    public Connection getConn() {
		return conn;
	}
	public void setConn(Connection conn) {
		this.conn = conn;
	}
}