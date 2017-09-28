package system.exceptions;

@SuppressWarnings("serial")
public class WinAndBarException extends Exception{
	public WinAndBarException() { super("Repository for winados and bars is error"); }
	public WinAndBarException(String message) { super(message); }
	public WinAndBarException(String message, Throwable cause) { super(message, cause); }
	public WinAndBarException(Throwable cause) { super(cause); }
}
