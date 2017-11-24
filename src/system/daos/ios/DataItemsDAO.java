package system.daos.ios;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import org.json.JSONArray;

import system.models.DataItem;
import system.models.Route;

public class DataItemsDAO {
	private JSONArray jsonArray;
	private Route dirPath;
	private Route[] dirPaths;
	public DataItemsDAO(){
	}
	public DataItemsDAO(String filePath){
		this.dirPath = new Route();
		this.dirPath.setPath(filePath);
		this.dirPath.setPermissions("rwx");
		this.load();
	}
	
	public void load() {
		this.jsonArray = new JSONArray();
		File directory = new File(this.dirPath.getPath());
		File[] fList = directory.listFiles();
		File tmpFile;
		DataItem tmpDI;
		int fLen = fList.length;
		for (int fi=0; fi<fLen; fi++) {
			tmpFile = fList[fi];
			tmpDI = new DataItem();
			tmpDI.setName(tmpFile.getName().replace(this.dirPath.getPath() + System.getProperty("file.separator"), ""));
			try {
				if(tmpFile.isFile())
					tmpDI.setType(Files.probeContentType(tmpFile.toPath()));
				else if(tmpFile.isDirectory())
					tmpDI.setType("inode/directory");
			} catch (IOException e) {
				e.printStackTrace();
			}
			SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
			tmpDI.setLastModified(tmpFile.lastModified());
			tmpDI.setDateModified(sdf.format(tmpFile.lastModified()));
			tmpDI.setSize(tmpFile.length());
			this.jsonArray.put(tmpDI.getJSON());
		}
	}
	public void loadData() {
		this.jsonArray = new JSONArray();
		for(int pi=0; pi<this.dirPaths.length; pi++) {
			File tmpFile = new File(this.dirPaths[pi].getPath());
			DataItem tmpDI;
			tmpDI = new DataItem();
			tmpDI.setName(tmpFile.getName().replace(this.dirPaths[pi].getPath() + System.getProperty("file.separator"), ""));
			try {
				if(tmpFile.isFile())
					tmpDI.setType(Files.probeContentType(tmpFile.toPath()));
				else if(tmpFile.isDirectory())
					tmpDI.setType("inode/directory");
			} catch (IOException e) {
				e.printStackTrace();
			}
			SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
			tmpDI.setLastModified(tmpFile.lastModified());
			tmpDI.setDateModified(sdf.format(tmpFile.lastModified()));
			tmpDI.setSize(tmpFile.length());
			this.jsonArray.put(tmpDI.getJSON());
		}
	}
	public JSONArray getJSONArray() {
		return jsonArray;
	}
	public void setJSONArray(JSONArray dataItemArray) {
		this.jsonArray = dataItemArray;
	}
	public Route[] getDirPaths() {
		return dirPaths;
	}
	public void setDirPaths(Route[] dirPaths) {
		this.dirPaths = dirPaths;
	}
	public Route getDirPath() {
		return dirPath;
	}
	public void setDirPath(Route dirPath) {
		this.dirPath = dirPath;
	}
}
