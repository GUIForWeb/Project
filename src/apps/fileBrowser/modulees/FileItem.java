package apps.fileBrowser.modulees;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;

public class FileItem {
	private String name;
	private String DataModified;
	private String type;
	private double size;
	public FileItem(String filePath, File file){
		this.name = file.toString().replace(filePath+"\\", "");
   		try {
   			if(file.isDirectory())
   				this.type = "directory";
   			else
   				this.type = Files.probeContentType(file.toPath());
		} catch (IOException e) {
			e.printStackTrace();
		} 
    	SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    	this.DataModified = sdf.format(file.lastModified());
    	this.size = file.length();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDataModified() {
		return DataModified;
	}
	public void setDataModified(String dataModified) {
		DataModified = dataModified;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public double getSize() {
		return size;
	}
	public void setSize(double size) {
		this.size = size;
	}
	public String toString(){
		String str = "";
			str += "(name=" + this.name + ", ";
			str += "dateModified=" + this.DataModified + ", ";
			str += "type=" + this.type + ", ";
			str += "size=" + this.size + ")";
		return str;
	}
}
