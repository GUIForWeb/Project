system.elements.winAndBars.subsystems.WinAndBarRepository = function() {
	this.json = {
		"app" : "system.webSockets.WinAndBarWebSocket",
		"data" : {}
	}
	this.updateContent = function(win) {
		var numId = win.numId;
		var content = win.view.contentSelector.html();
		content = encodeURIComponent(content);
		content = content.replace(/'/g, "%27");
		this.json.data = {
			"status" : "updateContent",
			"numId" : numId,
			"content" : content
		}
		this.ws.send(this.json);
	}
	this.fullScreen = function(winAndBarNode) {
		var view = winAndBarNode.win.view;
		this.json.data = {
			"status" : "fullScreen",
			"zIndex" : view.prevZIdx,
			"oTop" : view.oTop,
			"oLeft" : view.oLeft,
			"oWidth" : view.oWidth,
			"oHeight" : view.oHeight,
			"prevOTop" : view.prevOTop,
			"prevOLeft" : view.prevOLeft,
			"prevOWidth" : view.prevOWidth,
			"prevOHeight" : view.prevOHeight,
			"isFullScreen" : view.isFullScreen
		}
		this.ws.send(this.json);
	}
	this.changePosition = function(winAndBarNode) {
		var numId = winAndBarNode.win.numId;
		var oTop = winAndBarNode.win.view.oTop;
		var oLeft = winAndBarNode.win.view.oLeft;
		var zIndex = winAndBarNode.win.view.prevZIdx;
		var isFullScreen = winAndBarNode.win.view.isFullScreen;
		this.json.data = {
			"status" : "position",
			"zIndex" : zIndex,
			"oTop" : oTop,
			"oLeft" : oLeft,
			"isFullScreen" : isFullScreen
		}
		this.ws.send(this.json);
	}
	this.resizeend = function(winAndBarNode) {
		var win = winAndBarNode.win;
		this.json.data = {
			"status" : "resizeend",
			"zIndex" : win.view.prevZIdx,
			"oWidth" : parseInt(win.view.oWidth),
			"oHeight" : parseInt(win.view.oHeight),
			"oLeft" : parseInt(win.view.oLeft),
			"oTop" : parseInt(win.view.oTop)
		}
		this.ws.send(this.json);
	}
	this.appear = function(numId) {
		this.json.data = {
			"status" : "appear",
			"numId" : numId
		}
		this.ws.send(this.json);
	}
	this.disappear = function(zIndex) {
		this.json.data = {
			"status" : "disappear",
			"zIndex" : zIndex
		}
		this.ws.send(this.json);
	}
	this.xWinAndBar = function(winAndBarNode) {
		this.json.data = {
			"status" : "xWinAndBar",
			"zIndex" : winAndBarNode.win.view.zIndex,
			"position" : winAndBarNode.bar.view.position
		}
		this.ws.send(this.json);
	}
	this.newWinAndBar = function(winAndBarNode) {
		this.json.data = {
			"status" : "",
			"win" : {},
			"bar" : {}
		}
		this.pack(winAndBarNode);
		this.json.data.status = "newWinAndBar";
		this.ws.send(this.json);
	}
	this.moveWinToTop = function(zIndex) {
		this.json.data = {
			"status" : "moveWinToTop",
			"zIndex" : zIndex
		}
		this.ws.send(this.json);
	}

	this.pack = function(winAndBarNode) {
		this.winToJSON(winAndBarNode.win);
		this.barToJSON(winAndBarNode.bar);
		this.json.data.win = this.winJSON;
		this.json.data.bar = this.barJSON;
	}
	this.winToJSON = function(win) {
		this.winJSON = {
			"isFullScreen" : win.view.isFullScreen,
			"isOnScreen" : win.view.isOnScreen,
			"numId" : win.numId,
			"name" : win.name,
			"oWidth" : parseInt(win.view.oWidth),
			"oHeight" : parseInt(win.view.oHeight),
			"oLeft" : parseInt(win.view.oLeft),
			"oTop" : parseInt(win.view.oTop),
			"prevOWidth" : parseInt(win.view.prevOWidth),
			"prevOHeight" : parseInt(win.view.prevOHeight),
			"prevOLeft" : parseInt(win.view.prevOLeft),
			"prevOTop" : parseInt(win.view.prevOTop),
			"zIndex" : win.view.zIndex,
			"contentURL" : win.view.contentURL
		};
	}

	this.barToJSON = function(bar) {
		this.barJSON = {
			"numId" : bar.numId,
			"name" : bar.name,
			"position" : bar.view.position
		};
	}
	this.restoreNodes = function(winAndBarArray) {
		for (wbi = 0; wbi < winAndBarArray.length; wbi++) {
			var winAndBarMap = winAndBarArray[wbi]
			var winAndBarNode = new WinAndBarNode();
			winAndBarNode.bar = this.restoreBar(winAndBarMap["bar"]);
			winAndBarNode.win = this.restoreWin(winAndBarMap["win"]);
			if (winAndBarMap["win"]["isOnScreen"]) {
				this.winArray[winAndBarMap["win"]["zIndex"]] = winAndBarNode;
			}
			this.manager.nm.addBarNode(winAndBarNode);
		}

	}
	this.restoreWinOrder = function() {
		var tmpNode = this.nodeArray["winAndBar"];
		for (wi = 0; wi < this.winArray.length; wi++) {
			tmpNode.nextWin = this.winArray[wi];
			this.winArray[wi].prevWin = tmpNode;
			tmpNode = this.winArray[wi];
			this.manager.pe.append(tmpNode);
			this.nodeArray["winAndBar"].lastWin = tmpNode;
			tmpNode.win.appear();
		}

	}
	this.restoreWin = function(winMap) {
		var win = new Window();
		win.guiName = this.guiName;
		win.windowZoneSelector = this.windowZoneSelector;
		win.view.setDefaultValues(this.winDefaultValueArray);
		win.init(winMap["numId"]);
		win.restoreModel(winMap);
		win.view.restoreView(winMap);
		return win;
	}

	this.restoreBar = function(barMap) {
		var bar = new Bar();
		bar.guiName = this.guiName;
		bar.bgSelector = this.bgSelector;
		bar.taskbarSelector = this.taskbarSelector;
		bar.view.taskbarOHeight = this.taskbar.view.oHeight;
		bar.init(barMap["numId"], barMap["position"]);
		bar.restoreModel(barMap);
		bar.appear();
		return bar;
	}
}