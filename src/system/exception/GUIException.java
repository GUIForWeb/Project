package system.exception;

public class GUIException extends Exception{
	public GUIException() { super("error"); }
	public GUIException(String message) { super(message); }
	public GUIException(String message, Throwable cause) { super(message, cause); }
	public GUIException(Throwable cause) { super(cause); }
}
