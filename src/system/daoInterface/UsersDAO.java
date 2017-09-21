/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: User DAO Interface 
****************************************************************************************************/
package system.daoInterface;

import system.authentication.Authentication;
import system.authentication.DbAuth;
import system.authentication.Parameter;
import system.model.User;

public interface UsersDAO {
	public DbAuth login(); 
	public DbAuth register();
	public User[] selectAll();
	public User selectUser(int id);
	public void newUser(int id);
	public void delete(int id);
	public void activate(int id);
	public void deactivate(int id);
	public void setPMap(Parameter pMap);
	public void setAuthentication(Authentication authentication);
}
