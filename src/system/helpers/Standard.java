/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: Helper class for a name Standard 
****************************************************************************************************/
package system.helpers;

public class Standard {
	public static String name(String tmpName) {
		String tmpChar;
		tmpChar = Character.toString(tmpName.charAt(0));
		tmpChar = tmpChar.toUpperCase();
		tmpName = tmpChar + tmpName.substring(1).toLowerCase();
		return tmpName;
	}
}
