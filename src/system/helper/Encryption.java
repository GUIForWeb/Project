package system.helper;

import org.apache.commons.codec.digest.DigestUtils;

public class Encryption {
	public static String encrypt(String string){
		String encryption = "";
		encryption = DigestUtils.sha1Hex(string);
		return encryption.substring(4, 8) + encryption.substring(0, 4)  + encryption.substring(8, 40);
	}
}
