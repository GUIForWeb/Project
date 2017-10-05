package apps.fileBrowser.jsps;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import apps.fileBrowser.modules.FBManager;
import system.modules.DesktopManager;

@WebServlet("/fileJSP")
public class FileJSP extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private FBManager fbm;
	private DesktopManager dm;
	private JSONObject json;
	private Map<Long,JSONObject> dataMap;
	private HttpSession session;
	private int subject;
	private static final int DESKTOPMANAGER = 0;
	private static final int FILEMANAGER = 1;
    public FileJSP() {
        super();
        this.fbm = new FBManager();
    }
    private void initDesktopManager() {
    	this.dm = (DesktopManager) this.session.getAttribute("desktopManager");
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	if(null != this.session.getAttribute("User")){
    		String nano = request.getParameter("data");
    		if(this.dataMap.containsKey(Long.parseLong(nano))){
    			this.json.put("data", this.dataMap.get(Long.parseLong(nano)));
	    		if(this.subject == DESKTOPMANAGER) {
	    			this.initDesktopManager();
	    			this.dm.setSession(this.session);
	    			this.dm.setResponse(response);
	    			this.dm.setJSON(this.json);
	    			this.dm.download();
	    		}else if(this.subject == FILEMANAGER) {
	    			this.fbm.setSession(this.session);
					this.fbm.setResponse(response);
					this.fbm.setJSON(this.json);
					this.fbm.findBrowser();
					this.fbm.download();
	    		}
	    		this.dataMap.remove(Long.parseLong(nano));
    		}
    	}
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.session = request.getSession();
		if(null != this.session.getAttribute("User")){
			String paramName = request.getParameterNames().nextElement();
			if(paramName.equals("json")){
				this.json = new JSONObject(request.getParameter("json"));
				JSONArray dataArray = this.json.getJSONArray("data");
				this.subject = this.json.getInt("subject");
				this.dataMap = new HashMap<Long,JSONObject>();
				JSONArray timeJSONArray = new JSONArray();
				JSONObject tmpJSON;
				long nano;
				for(int di=0; di<dataArray.length(); di++){
					nano = System.nanoTime();
					tmpJSON = new JSONObject();
					tmpJSON.put("time", nano);
					timeJSONArray.put(tmpJSON);
					this.dataMap.put(nano, dataArray.getJSONObject(di));
				}
				String url = request.getRequestURL().toString();
				tmpJSON = new JSONObject();
				tmpJSON.put("url",url);
				tmpJSON.put("times",timeJSONArray);
				response.getWriter().write(tmpJSON.toString());
			}
		}
	}
}
