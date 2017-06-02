/****************************************************************************************************
* Project: comp3095assignment2
* Assignment: Assignment 2 
* Author(s): Gon Hu, Elis Shukullari, Leba Rubinoff
* Student Number: 100936779, 100823478, 100831385 
* Date: December 5, 2016
* Description: Encryption class 
****************************************************************************************************/
package system.helpers;

import org.apache.commons.codec.digest.DigestUtils;

public class Encryption {
	public static String encrypt(String string){
		String encryption = "";
		encryption = DigestUtils.sha1Hex(string);
		return encryption.substring(4, 8) + encryption.substring(0, 4)  + encryption.substring(8, 40);
	}
}
