function GUI(guiVariableName) {
	this.winCount = 0;
	this.nodeArray = {};
	this.valueArray = {};
	this.barArray = [];
	this.iconArray = [];
	this.iconIdArray = [];
	this.winArray = [];
	this.windowCoordinate = [];
	this.windowInBarArray = [];
	this.iconTdValueArray = [];
	this.iconTableValueArray = [];
	this.iconCoordinate = [];
	this.winDefaultValueArray = [];
	this.contextPath = "";
	this.oLeft = 0;
	this.oTop = 0;
	this.guiName = guiVariableName;
	this.iconDataList = null;
	this.barTagIdRule = new Bar().tagIdRule;
	this.winTagIdRule = new Window().tagIdRule;
	this.dynamicMode = false;
	this.init = function() {
	}
	this.setDataIconJSONArray = function(dataIconJSONArray) {
		this.dataIconJSONArray = dataIconJSONArray;
	}
	this.initDesktopDataItems = function() {
		this.desktop.manager.appendDataIcon();
	}
	this.coordinateFilter = function(){
		
	}
	this.initIcon = function() {
		this.desktop.manager.appendIcon();
	}
	this.start = function() {
		sessionStorage.wMode = true;
		this.valueArray["ip"] = "192.168.56.103";
		this.ip = this.valueArray["ip"];
		// this.valueArray["ip"] = "52.14.247.195:8080";
		this.valueArray["newId"] = 0;
		this.valueArray["onScrCount"] = 0;
		this.nodeArray["winAndBar"] = new WinAndBarNode();
		this.nodeArray["winAndBar"].lastWin = this.nodeArray["winAndBar"];
		this.nodeArray["winAndBar"].lastBar = this.nodeArray["winAndBar"];
		this.desktop = new Desktop();
		this.desktop.__proto__ = this;
		this.winAndBar = new WinAndBar();
		this.winAndBar.__proto__ = this;
		this.configure = new Configure();
		this.configure.__proto__ = this;
		this.api = new API();
		this.api.__proto__ = this;
		this.ws = new webSockets.WebSocket(this.valueArray["ip"]);
		
		this.model = new Model();
		this.model.__proto__ = this;
		
		this.initBackground();
		this.initBgContextMenu();
		this.initIconContextMenu();
		this.initIcon();
		this.initWindowZone();
		this.initTaskbar();
		this.initDesktopDataItems();
	}
	
	this.initWindowZone = function() {
		this.windowZoneSelector = $("<div></div>");
		this.windowZoneSelector.attr("id","windowZone");
		this.sectionSelector.append(this.windowZoneSelector);
	}
	this.initBackground = function() {
		this.sectionSelector = $($(document).find("section")[0]);
		this.background = new Background();
		this.background.guiName = this.guiName;
		this.background.sectionSelector = this.sectionSelector;
		this.background.setTaskbarValues(this.taskbarValueArray);
		this.background.setIconTdValues(this.iconTdValueArray);
		this.background.setIconTableValues(this.iconTableValueArray);
		this.background.appear();
		this.bgSelector = this.background.view.backgroundSelector;
		this.background.appendIconTd();
		this.iconTable = this.background.view.tableSelector;
	}
	this.initBgContextMenu = function() {
		var contextMenuObj = new BackgroundContextMenu();
		contextMenuObj.bgSelector = this.bgSelector;
		contextMenuObj.tagId = "bgContextMenu";
		this.bgContextMenu = contextMenuObj;
		taskArray["contextMenu"] = this.bgContextMenu;
	}
	this.initIconContextMenu = function() {
		var contextMenuObj = new IconContextMenu();
		contextMenuObj.bgSelector = this.bgSelector;
		contextMenuObj.tagId = "iconContextMenu";
		this.iconContextMenu = contextMenuObj;
	}
	this.reinitIcon = function(iconTdBorderWidth, iconTdBorderHeight) {
		for (ci = 0; ci < this.iconArray.length; ci++) {
			var tmpIcon = new Icon();
			tmpIcon.contextPath = this.contextPath;
			tmpIcon.guiName = this.guiName;
			tmpIcon.init(this.iconArray[ci]);
			tmpIcon.view.iconTdBorderWidth = iconTdBorderWidth;
			tmpIcon.view.iconTdBorderHeight = iconTdBorderHeight;
			tmpIcon.appear();
		}
	}
	this.setIconTdValues = function(iconTdValueArray) {
		this.iconTdValueArray = iconTdValueArray;
	}
	this.initTaskbar = function() {
		this.taskbar = new Taskbar();
		this.taskbar.contextPath = this.contextPath;
		this.taskbarTagId = "taskbar";
		this.taskbar.tagId = this.taskbarTagId;
		this.taskbar.sectionSelector = this.sectionSelector;
		this.taskbar.view.setTaskbarValues(this.taskbarValueArray);
		this.taskbar.appendTaskbar();
		this.taskbarSelector = this.taskbar.view.taskbarSelector;
	}
	this.setIconJSONArray = function(iconJSONArray) {
		this.iconJSONArray = iconJSONArray;
	}
	this.setIconTableValues = function(iconTableValueArray) {
		this.iconTableValueArray = iconTableValueArray;
	}
	this.setContextPath = function(contextPath) {
		this.contextPath = contextPath;
	}
	this.setContextURL = function(contextURL) {
		this.contextURL = contextURL;
	}
	this.setTaskbarValues = function(taskbarValueArray) {
		this.taskbarValueArray = taskbarValueArray;
	}
	this.setWinCount = function(wincount) {
		if (wincount != "")
			this.winCount = parseInt(winCount)
	}
	this.restoreWinAndBar = function(winAndBarJSONArray) {
		if (winAndBarJSONArray.length > 0) {
			this.nodeArray["winAndBar"].winCount = this.winCount;
			this.nodeArray["winAndBar"].barCount = winAndBarJSONArray.length;
			var tmpNode = new WinAndBarNode();
			this.winAndBar.repo.restoreNodes(winAndBarJSONArray);
			this.winAndBar.repo.restoreWinOrder();
			if (this.nodeArray["winAndBar"].barCount != 0)
				this.valueArray["newId"] = this.nodeArray["winAndBar"].lastBar.bar.numId + 1;
			else
				this.valueArray["newId"] = 0;
		}
	}
	/*
	this.iconTheme = function(iconThemeVals) {
		var view = this.background.view;
		var cls = new Icon().tagClass
		var imgCls = new Icon().imgClass
		var tmpWidth = iconThemeVals["iconTdWidth"];
		var tmpHeight = iconThemeVals["iconTdHeight"];
		var tmpBWidth = iconThemeVals["iconTdBorderWidth"];
		var tmpBHeight = iconThemeVals["iconTdBorderHeight"];
		var tmpColor = iconThemeVals["iconTdBorderColor"];

		view.tableSelector.css("width", $(window).width()
				- view.iconTableLeftPadding);
		view.tableSelector.css("height", (view.guiHeight - view.iconTableTopPadding)
				+ "px");
		view.iconTdWidth = parseInt(tmpWidth);
		view.iconTdHeight = parseInt(tmpHeight);
		view.iconTdBorderWidth = parseInt(tmpBWidth);
		view.iconTdBorderHeight = parseInt(tmpBHeight);
		gui.background.resizeIconTd();
		//$(".iconTd").css("border-left", (tmpBWidth) + "px solid " + tmpColor);
		//$(".iconTd").css("border-right", (tmpBWidth) + "px solid " + tmpColor);
		//$(".iconTd").css("border-top", (tmpBHeight) + "px solid " + tmpColor);
		//$(".iconTd")
		//		.css("border-bottom", (tmpBHeight) + "px solid " + tmpColor);

		for (ii = 0; ii < gui.iconIdArray.length; ii++) {
			$("#" + gui.iconIdArray[ii]).remove();
		}
		gui.reinitIcon(tmpBWidth, tmpBHeight);
		$("." + cls).css("width", tmpWidth);
		$("." + cls).css("height", tmpHeight);
		$("." + imgCls).css("width", tmpWidth);
		$("." + imgCls).css("height", tmpHeight);
	}
	this.changeIconTheme = function(tag) {
		if (event.keyCode == 13 || event.type == "blur") {
			var iconThemeVals = [];
			var input = $(tag).parent().find("input")
			iconThemeVals["iconTdWidth"] = $(input[1]).val();
			iconThemeVals["iconTdHeight"] = $(input[2]).val();
			iconThemeVals["iconTdBorderWidth"] = $(input[3]).val();
			iconThemeVals["iconTdBorderHeight"] = $(input[4]).val();
			iconThemeVals["iconTdBorderColor"] = $(input[5]).val();
			this.iconTheme(iconThemeVals);
		}
	}
	this.restoreIconTheme = function() {
		this.iconTheme(this.iconTdValueArray);
	}
	this.resetIconTheme = function() {
		var input = $("#iconThemeForm0").parent().find("input");
		this.iconTdValueArray["iconTdWidth"] = $(input[1]).val();
		this.iconTdValueArray["iconTdHeight"] = $(input[2]).val();
		this.iconTdValueArray["iconTdBorderWidth"] = $(input[3]).val();
		this.iconTdValueArray["iconTdBorderHeight"] = $(input[4]).val();
		this.iconTdValueArray["iconTdBorderColor"] = $(input[5]).val();
	}
	*/
	
	this.length = function(array) {
		return array.filter(function(element) {
			return element !== undefined;
		}).length;
	}
	this.getWinInfo = function(section) {
		var cOfWindow = section.parent();
		var window = cOfWindow.parent();
		var winAndBarNode = this.winAndBar.manager.nm.getNodeWithWinTag(window[0]);
		var win = winAndBarNode.win;
		var json = {
			"id" : win.numId,
			"window" : window,
			"content" : cOfWindow,
			"x" : win.view.xButtonSelector,
			"m" : win.view.movementHandleSelector,
			"options" : win.options
		};
		return json;
	}
}
