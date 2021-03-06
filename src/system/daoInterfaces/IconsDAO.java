/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: User DAO Interface 
****************************************************************************************************/
package system.daoInterfaces;

import org.json.JSONArray;

public interface IconsDAO {
	public void load(); 
	public JSONArray getIconJSONArray();
}
