package test.jsfs;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.enterprise.context.RequestScoped;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.servlet.ServletContext;

import system.databases.SQLite;

@Named
@RequestScoped
public class Test {
	public Test() {

	}
	public void init() {
		/*
		System.out.println("Yo");
		SQLite sqlite = new SQLite();
		sqlite.connect();
		String query = "SELECT * FROM users_t WHERE id = ?";
		int[] info = new int[1];
		info[0] = 1;
		ResultSet rset = sqlite.executeQuery(query,info);
		try {
			while (rset.next()) {
			    System.out.println(rset.getString("email")); 
			}
			sqlite.getConn().close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		*/
	}
}
