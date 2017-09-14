package system.dao;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import org.json.JSONArray;
import apps.fileBrowser.model.DataItem;

public class DataItemDAO {
	private String filePath;
	private JSONArray dataItemArray;
	public DataItemDAO(){
	}
	public DataItemDAO(String filePath){
		this.filePath = filePath;
		this.listFoldersAndFiles();
	}
	
	private void listFoldersAndFiles() {
		File directory = new File(this.filePath);
		File[] fList = directory.listFiles();
		File tmpFile;
		DataItem tmpDI;
		int fLen = fList.length;
		this.dataItemArray = new JSONArray();
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
			tmpDI.setDateModified(sdf.format(tmpFile.lastModified()));
			tmpDI.setSize(tmpFile.length());
			this.dataItemArray.put(tmpDI.getJSON());
		}
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
		this.listFoldersAndFiles();
	}
	public JSONArray getDataItemArray() {
		return dataItemArray;
	}
	public void setDataItemArray(JSONArray dataItemArray) {
		this.dataItemArray = dataItemArray;
	}
}
