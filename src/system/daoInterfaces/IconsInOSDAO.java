/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: User DAO Interface 
****************************************************************************************************/
package system.daoInterfaces;

import java.util.List;

import org.json.JSONObject;

import system.models.IconInOS;

public interface IconsInOSDAO {
	public void load(); 
	public List<IconInOS> getIconsInOSList();
	public void updateXY(JSONObject json);
}
