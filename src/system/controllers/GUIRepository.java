package system.controllers;


import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import org.json.JSONArray;
import org.json.JSONObject;

@Named
@RequestScoped
public class GUIRepository extends Controller  {
	private int winCount;
	private String status;
	private String param;
	//private WinAndBarNode startNode;
	//private JSONObject winJSON;
	//private JSONObject barJSON;
	private JSONObject winAndBarJSON;
	private JSONArray winAndBarArray;
	
	public GUIRepository(){
		this.getSession();
	}
	public void listen(){
		//this.winJSON = jsonObj.getJSONObject("win");
		//this.barJSON = jsonObj.getJSONObject("bar");
		switch(this.status){
		/*
			case "disappear":
				this.disappear();
				break;
			case "appear":
				this.appear();
				break;
			case "moveWinToTop":
				this.moveWinToTop();
				break;
			case "newWinAndBar":
				this.newWinAndBar();
				break;
			case "xWinAndBar":
				this.xWinAndBar();
				break;
				*/
		}
		System.out.println(winCount);
	}
	private void xWinAndBar() {
		String data[] = this.param.split("&");
		int zIndex = Integer.parseInt(data[0]);
		int position = Integer.parseInt(data[1]);
		int tmpZIdx = 0;
		int tmpPst = 0;
		JSONObject tmpWin = null;
		JSONObject tmpBar = null;
		JSONObject tmpWinAndBar = null;
		JSONArray tmpArray = new JSONArray();
		for(int wi=0; wi<this.winAndBarArray.length(); wi++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(wi);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			tmpBar = tmpWinAndBar.getJSONObject("bar");
			tmpZIdx = tmpWin.getInt("zIndex");
			tmpPst = tmpBar.getInt("position");
			if(tmpPst > position){
				tmpPst--;
				tmpBar.put("position", tmpPst);
				tmpWinAndBar.put("bar",tmpBar);
				if(tmpZIdx > zIndex){
					tmpZIdx--;
					tmpWin.put("zIndex", tmpZIdx);
					tmpWinAndBar.put("win",tmpWin);
				}
				tmpArray.put(tmpPst,tmpWinAndBar);
			}
			else if(tmpPst < position){
				if(tmpZIdx > zIndex){
					tmpZIdx--;
					tmpWin.put("zIndex", tmpZIdx);
					tmpWinAndBar.put("win",tmpWin);
				}
				tmpArray.put(tmpPst,tmpWinAndBar);
			}
		}
		this.winCount--;
		this.winAndBarArray = tmpArray;
		this.setSession();
	}
	private void disappear() {
		int winCnt = this.winAndBarArray.length();
		int zIndex = Integer.valueOf(this.param);
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		for(int wi=0; wi<winCnt; wi++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(wi);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			tmpZIdx = tmpWin.getInt("zIndex");
			if(tmpZIdx < zIndex){
				continue;
			}else if(tmpZIdx > zIndex){
				tmpZIdx--;
				tmpWin.put("zIndex", tmpZIdx);
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarArray.put(wi,tmpWinAndBar);
			}
			else if (tmpZIdx == zIndex){
				tmpWin.put("onScreen", false);
				tmpWin.put("zIndex", -1);
				this.winCount--;
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarArray.put(wi,tmpWinAndBar);
			}
		}
		this.setSession();
	}
	private void appear() {
		int winCnt = this.winAndBarArray.length();
		int numId = Integer.valueOf(this.param);
		int tmpId = 0;
		JSONObject tmpObj = null;
		JSONObject tmpWinAndBar = null;
		for(int wi=0; wi<winCnt; wi++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(wi);
			tmpObj = tmpWinAndBar.getJSONObject("bar");
			tmpId = tmpObj.getInt("numId");
			if(numId == tmpId){
				this.winCount++;
				tmpObj = tmpWinAndBar.getJSONObject("win");
				tmpObj.put("onScreen", true);
				tmpObj.put("zIndex", this.winCount-1);
				tmpWinAndBar.put("win",tmpObj);
				this.winAndBarArray.put(wi,tmpWinAndBar);
				break;
			}
		}
		this.setSession();
	}
	private void moveWinToTop() {
		boolean isEdited = false;
		int zIndex = Integer.parseInt(this.param);
		int winCnt = this.winAndBarArray.length();
		int tmpZIdx = 0;
		JSONObject tmpWin = null;
		JSONObject tmpWinAndBar = null;
		
		for(int wi=0; wi<winCnt; wi++){
			tmpWinAndBar = this.winAndBarArray.getJSONObject(wi);
			tmpWin = tmpWinAndBar.getJSONObject("win");
			if(tmpWin.getBoolean("onScreen")){
				tmpZIdx = tmpWin.getInt("zIndex");
				if(tmpZIdx < zIndex){
					continue;
				}else if(tmpZIdx > zIndex){
					tmpZIdx--;
					tmpWin.put("zIndex", tmpZIdx);
				}
				else if (tmpZIdx == zIndex){
					tmpWin.put("zIndex", this.winCount-1);
				}
				tmpWinAndBar.put("win",tmpWin);
				this.winAndBarArray.put(wi,tmpWinAndBar);
				isEdited = true;
			}
		}
		if(isEdited){
			this.setSession();
		}
	}
	private void newWinAndBar() {
		JSONObject winAndBarJSON = new JSONObject(this.param);
		this.winCount++;
		this.winAndBarArray.put(winAndBarJSON);
		this.setSession();
	}
	private void setSession(){
		this.winAndBarJSON.put("winAndBar",this.winAndBarArray);
		this.session.setAttribute("winCount",this.winCount);
		this.session.setAttribute("winAndBarJSON",this.winAndBarJSON);
	}
	private void getSession(){
		this.winAndBarArray = new JSONArray();
		if(null != this.session.getAttribute("winAndBarJSON")){
			this.winAndBarJSON = (JSONObject) this.session.getAttribute("winAndBarJSON");
			this.winAndBarArray = this.winAndBarJSON.getJSONArray("winAndBar");
		}
		else {
			this.winAndBarJSON = new JSONObject();
		}
		if(null != this.session.getAttribute("winCount")){
			this.winCount = (int) this.session.getAttribute("winCount");
		}
		else 
			this.winCount = 0;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getParam() {
		return param;
	}
	public void setParam(String param) {
		this.param = param;
	}
	public int getWinCount() {
		return winCount;
	}
	public void setWinCount(int winCount) {
		this.winCount = winCount;
	}
}
