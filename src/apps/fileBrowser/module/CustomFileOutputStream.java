package apps.fileBrowser.module;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class CustomFileOutputStream extends FileOutputStream{
	private int byteCount=0;
	public CustomFileOutputStream(File file) throws FileNotFoundException {
		super(file);
		// TODO Auto-generated constructor stub
	}
	@Override
	public void write(int b) throws IOException{
	    byteCount += 1;
	    super.write(b);
	}
	public int getByteCount() {
		return byteCount;
	}
	public void setByteCount(int byteCount) {
		this.byteCount = byteCount;
	}
}
