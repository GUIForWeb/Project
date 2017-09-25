package system.models;

import org.json.JSONObject;

public class WinAndBarNode {
	private int winCount;
	private int barCount;
	private WinAndBarNode prevWin;
	private WinAndBarNode prevBar;
	private WinAndBarNode nextWin;
	private WinAndBarNode nextBar;
	private WinAndBarNode lastWin;
	private WinAndBarNode lastBar;
	private JSONObject winAndBarJSON;
	//this.win = null;
	//this.bar = null;
	
	public WinAndBarNode(){
		
	}
	
	public int getWinCount() {
		return winCount;
	}

	public void setWinCount(int winCount) {
		this.winCount = winCount;
	}

	public int getBarCount() {
		return barCount;
	}

	public void setBarCount(int barCount) {
		this.barCount = barCount;
	}
	
	public WinAndBarNode getPrevWin() {
		return prevWin;
	}

	public void setPrevWin(WinAndBarNode prevWin) {
		this.prevWin = prevWin;
	}

	public WinAndBarNode getPrevBar() {
		return prevBar;
	}

	public void setPrevBar(WinAndBarNode prevBar) {
		this.prevBar = prevBar;
	}

	public WinAndBarNode getNextWin() {
		return nextWin;
	}

	public void setNextWin(WinAndBarNode nextWin) {
		this.nextWin = nextWin;
	}

	public WinAndBarNode getNextBar() {
		return nextBar;
	}

	public void setNextBar(WinAndBarNode nextBar) {
		this.nextBar = nextBar;
	}

	public WinAndBarNode getLastWin() {
		return lastWin;
	}

	public void setLastWin(WinAndBarNode lastWin) {
		this.lastWin = lastWin;
	}

	public WinAndBarNode getLastBar() {
		return lastBar;
	}

	public void setLastBar(WinAndBarNode lastBar) {
		this.lastBar = lastBar;
	}
	
	public JSONObject getWinAndBarJSON() {
		return winAndBarJSON;
	}

	public void setWinAndBarJSON(JSONObject winAndBar) {
		this.winAndBarJSON = winAndBar;
	}
}
