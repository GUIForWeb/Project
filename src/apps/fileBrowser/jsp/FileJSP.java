package apps.fileBrowser.jsp;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.Calendar;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import apps.fileBrowser.module.FBManager;

@WebServlet("/fileJSP")
public class FileJSP extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private FBManager fbm;
	private JSONObject json;
	private String time;
	private HttpSession session;
    public FileJSP() {
        super();
        this.fbm = new FBManager();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	if(null != this.session.getAttribute("User")){
    		String paramName = request.getParameterNames().nextElement();
	    	if(paramName.equals("data") && request.getParameter(paramName).equals(this.time)){
				this.fbm.setSession(this.session);
				this.fbm.setResponse(response);
				this.fbm.setJson(this.json);
				this.fbm.findBrowser();
				this.fbm.download();
				this.json = null;
				this.time = null;
			}
    	}
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.session = request.getSession();
		if(null != this.session.getAttribute("User")){
			String paramName = request.getParameterNames().nextElement();
			if(paramName.equals("json")){
				this.json = new JSONObject(request.getParameter("json"));
				Calendar calendar = Calendar.getInstance();
				calendar.setTimeInMillis(System.currentTimeMillis());
				this.time = String.valueOf(calendar.get(Calendar.YEAR)) + String.valueOf(calendar.get(Calendar.MONTH)+1) + String.valueOf(calendar.get(Calendar.DAY_OF_MONTH)) + String.valueOf(calendar.get(Calendar.MILLISECOND));
				String url = request.getRequestURL().toString();
				response.getWriter().write(url+"?data="+this.time);
			}
		}
	}
}
