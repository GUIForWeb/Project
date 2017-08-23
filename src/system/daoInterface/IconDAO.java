/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: User DAO Interface 
****************************************************************************************************/
package system.daoInterface;

import java.util.List;

import system.model.Icon;

public interface IconDAO {
	public void load(); 
	public List<Icon> getIconList();
}
