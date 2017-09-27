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
import org.json.JSONObject;

public interface DataIconsDAO {
	public void load(); 
	public JSONArray getJSONArray();
	public void insert(JSONArray jsonArray);
	public String delete(JSONArray jsonArray);
	public void updateXYs(JSONArray jsonArray);
	public void updateXY(JSONObject json);
}
