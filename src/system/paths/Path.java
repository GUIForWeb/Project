package system.paths;

public class Path {
	//public static String ;
	public static String appDir;
	public static String serverXMLFile;
	public static String storageDir;
	public static String serverDir;
	public static String sqliteFile;
	public Path() {
	}
	private static Path instance;
	public static Path newInstance() {
		if(null == instance) {
			instance = new Path();
		}
		return instance;
	}
}
