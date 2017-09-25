package apps.fileBrowser.libraries;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class FBFileOutputStream extends FileOutputStream{
	private int byteCount=0;
	public FBFileOutputStream(File file) throws FileNotFoundException {
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
