/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: Database class to connect mysql server 
****************************************************************************************************/
package system.databases;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class MySQL{
	private String url="jdbc:mysql://localhost:3306/WebGUI?noAccessToProcedureBodies=true&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&autoReconnect=true&useSSL=false";
	private String user="root";
	private String password="admin";
	private Connection conn;
	private Statement stmt;
	private CallableStatement cstmt;
	private PreparedStatement pstmt;
	private ResultSet rset;
	public MySQL() {
		try {
			DriverManager.registerDriver(new com.mysql.cj.jdbc.Driver());
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public void connect() {
		try {
			this.conn = DriverManager.getConnection(this.url,this.user,this.password);
			this.conn.setAutoCommit(false);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	//call procedure for Mysql 
	public ResultSet call(String query, String[] info) {
		try {
			this.cstmt = this.conn.prepareCall(query);
			for(int ii=0; ii<info.length; ii++){
				this.cstmt.setString(ii+1,info[ii]);
			}
			this.rset = this.cstmt.executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return this.rset;
	}
	
	public ResultSet call(String query) {
		try {
			this.cstmt = this.conn.prepareCall(query);
			this.rset = this.cstmt.executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return this.rset;
	}
	public boolean getMoreResults() {
		boolean flag = false;
		try {
			flag = this.cstmt.getMoreResults();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return flag;
	}
	//select data for Mysql
	public ResultSet select(String query, String[] info){
		try {
			this.pstmt = this.conn.prepareStatement(query);
			for(int ii=0; ii<info.length; ii++)
				this.pstmt.setString(ii+1, info[ii]);
			this.rset = this.pstmt.executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return this.rset;
	}
	
	public int executeUpdate(String query, int info){
		int result = 0;
		try {
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
			this.pstmt = this.conn.prepareStatement(query);
			result = this.pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	//select data for Mysql
	public ResultSet select(String query){
		try {
			this.stmt = this.conn.createStatement();
			this.rset = this.stmt.executeQuery(query);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return this.rset;
	}
		
	//close Mysql
	public void close(){
		try {
			this.conn.commit();
			if(null != this.cstmt)
				this.cstmt.close();
			else if(null != this.pstmt)
				this.pstmt.close();
			this.conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public int update(String query, int[] info){
		int result = 0;
		try {
			this.pstmt = this.conn.prepareStatement(query);
			for(int ii=0; ii<info.length; ii++)
				this.pstmt.setInt(ii+1, info[ii]);
			result = this.pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	public int update(String query, String[] info){
		int result = 0;
		try {
			this.pstmt = this.conn.prepareStatement(query);
			for(int ii=0; ii<info.length; ii++)
				this.pstmt.setString(ii+1, info[ii]);
			result = this.pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	public int update(String query, long[] info){
		int result = 0;
		try {
			this.pstmt = this.conn.prepareStatement(query);
			for(int ii=0; ii<info.length; ii++)
				this.pstmt.setLong(ii+1, info[ii]);
			result = this.pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	public String toString(){
		String str = this.conn.toString();
		return str;
	}
}
