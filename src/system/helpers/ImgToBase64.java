package system.helpers;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;

public class ImgToBase64 {
	public static String getBase64(String srcPath) {
		String base64 = "";
		BufferedInputStream in;
		try {
			in = new BufferedInputStream(new FileInputStream(srcPath));
			byte[] imgBytes = new byte[in.available()];
			in.read(imgBytes);
	        in.close();
	        base64 = Base64.getEncoder().encodeToString(imgBytes);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return base64;
	}
}
