package system.dao;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import org.json.JSONArray;

import system.model.DataItem;

public class DataItemsDAO {
	private String filePath;
	private JSONArray jsonArray;
	public DataItemsDAO(){
	}
	public DataItemsDAO(String filePath){
		this.filePath = filePath;
		this.load();
	}
	
	public void load() {
		File directory = new File(this.filePath);
		File[] fList = directory.listFiles();
		File tmpFile;
		DataItem tmpDI;
		int fLen = fList.length;
		this.jsonArray = new JSONArray();
		for (int fi=0; fi<fLen; fi++) {
			tmpFile = fList[fi];
			tmpDI = new DataItem();
			tmpDI.setName(tmpFile.getName().replace(this.filePath + "/", ""));
			try {
	   			if(tmpFile.isDirectory())
	   				tmpDI.setType("directory");
	   			else
	   				tmpDI.setType(Files.probeContentType(tmpFile.toPath()));
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
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public JSONArray getJSONArray() {
		return jsonArray;
	}
	public void setJSONArray(JSONArray dataItemArray) {
		this.jsonArray = dataItemArray;
	}
}
