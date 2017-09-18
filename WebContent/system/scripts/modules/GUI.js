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
	this.fileItem = [];
	this.init = function() {
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
		this.api = new API();
		this.api.__proto__ = this;
		this.controller = new Controller();
		this.controller.__proto__ = this;
		this.ws = new GUIWebSocket(this.valueArray["ip"]);
		this.gm = new GUIManager();
		this.gm.__proto__ = this.controller;
		this.gr = new GUIRepository(this.ws);
		this.gr.__proto__ = this.controller;
		this.wm = new WindowManager();
		this.wm.__proto__ = this.controller;
		this.im = new IconManager();
		this.im.__proto__ = this.controller;
		this.bm = new BarManager();
		this.bm.__proto__ = this.controller;
		this.ee = new EnumEngine();
		this.ee.__proto__ = this.controller;
		this.wse = new WindowSizingEngine();
		this.wse.__proto__ = this.controller;
		this.pe = new PositioningEngine();
		this.pe.__proto__ = this.controller;
		this.nm = new NodeManager();
		this.nm.__proto__ = this.controller;

		this.eventListener = new EventListener();
		this.eventListener.__proto__ = this.controller;
		this.model = new Model();
		this.model.__proto__ = this;
		this.dblclick = new Dblclick();
		this.dblclick.__proto__ = this.controller;
		this.change = new Change();
		this.change.__proto__ = this.controller;
		this.click = new Click();
		this.click.__proto__ = this.controller;
		this.contextmenu = new controllers.ContextMenu();
		this.contextmenu.__proto__ = this.controller;
		this.drag = new Drag();
		this.drag.__proto__ = this.controller;
		this.mouseover = new Mouseover();
		this.mouseover.__proto__ = this.controller;
		this.mouseout = new Mouseout();
		this.mouseout.__proto__ = this.controller;
		this.resize = new Resize();
		this.resize.__proto__ = this.controller;
		this.request = new GUIXMLHttpRequest();
		this.request.__proto__ = this.controller;
		this.initBackground();
		this.initBgContextMenu();
		this.initIcon();
		this.initTaskbar();
		this.initFileItem();
	}
	this.initBackground = function() {
		this.background = new Background();
		this.background.guiName = this.guiName;
		this.background.setTaskbarValues(this.taskbarValueArray);
		this.background.setIconTdValues(this.iconTdValueArray);
		this.background.setIconTableValues(this.iconTableValueArray);
		this.background.appendBackgroundView();
		this.bgSelector = this.background.view.backgroundSelector;
		this.tableWrapSelector = this.background.view.tableWrapSelector;
		this.background.appendIconTd();
	}
	this.initBgContextMenu = function() {
		var contextMenuObj = new models.ContextMenu();
		contextMenuObj.bgSelector = this.bgSelector;
		contextMenuObj.tagId = "bgContextMenu";
		this.bgContextMenu = contextMenuObj;
	}
	this.initIcon = function() {
		for (ci = 0; ci < this.iconDataList.length; ci++) {
			var tmpIcon = new Icon();
			tmpIcon.contextPath = this.contextPath;
			tmpIcon.guiName = this.guiName;
			tmpIcon.tableWrapTag = this.tableWrapSelector;
			tmpIcon.init(this.iconDataList[ci]);
			this.iconCoordinate[tmpIcon.iconX + "," + tmpIcon.iconY] = true;
			tmpIcon.view.iconTdBorderWidth = this.iconTdValueArray["iconTdBorderWidth"];
			tmpIcon.view.iconTdBorderHeight = this.iconTdValueArray["iconTdBorderHeight"];
			tmpIcon.view.getView();
			tmpIcon.appendIcon();
			this.iconArray[tmpIcon.tagId] = tmpIcon;
			this.iconArray[tmpIcon.name] = this.iconArray[tmpIcon.tagId];
			this.iconIdArray[this.iconIdArray.length] = tmpIcon.tagId;
		}
		this.iconTagIdRule = tmpIcon.tagIdRule;
	}
	this.reinitIcon = function(iconTdBorderWidth, iconTdBorderHeight) {
		for (ci = 0; ci < this.iconDataList.length; ci++) {
			var tmpIcon = new Icon();
			tmpIcon.contextPath = this.contextPath;
			tmpIcon.guiName = this.guiName;
			tmpIcon.tableWrapTag = this.tableWrapTag;
			tmpIcon.init(this.iconDataList[ci]);
			tmpIcon.view.getView();
			tmpIcon.view.iconTdBorderWidth = iconTdBorderWidth;
			tmpIcon.view.iconTdBorderHeight = iconTdBorderHeight;
			tmpIcon.appendIcon();
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
		this.taskbar.bgSelector = this.bgSelector;
		this.taskbar.view.setTaskbarValues(this.taskbarValueArray);
		this.taskbar.appendTaskbar();
		this.taskbarSelector = this.taskbar.view.taskbarSelector;
	}
	this.setIconDataList = function(iconDataList) {
		this.iconDataList = iconDataList;
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
	this.setDesktopDataArray = function(desktopDataArray) {
		this.desktopDataArray = desktopDataArray;
	}
	this.initFileItem = function() {
		for (di = 0; di < this.desktopDataArray.length; di++) {
			var json = this.desktopDataArray[di];
			this.fileItem[di] = new FileItem();
			this.fileItem[di].setJSON(json);
		}
		// console.log(this.fileItem);
	}
	this.restoreWinAndBar = function(winAndBarJSON) {// windowList,barList,windowInBarList)
		if (winAndBarJSON != "") {
			winAndBarJSON = JSON.parse(winAndBarJSON);
			var winAndBarArray = winAndBarJSON["winAndBar"];
			if (winAndBarArray.length > 0) {
				this.nodeArray["winAndBar"].winCount = this.winCount;
				this.nodeArray["winAndBar"].barCount = winAndBarArray.length;
				var tmpNode = new WinAndBarNode();
				this.gr.restoreNodes(winAndBarArray);
				this.gr.restoreWinOrder();
			}
			if (this.nodeArray["winAndBar"].barCount != 0)
				this.valueArray["newId"] = this.nodeArray["winAndBar"].lastBar.bar.numId + 1;
			else
				this.valueArray["newId"] = 0;
		}
	}
	this.iconTheme = function(iconThemeVals) {
		var view = this.background.view;
		var cls = new Icon().tagClass
		var imgCls = new Icon().imgClass
		var tmpWidth = iconThemeVals["iconTdWidth"];
		var tmpHeight = iconThemeVals["iconTdHeight"];
		var tmpBWidth = iconThemeVals["iconTdBorderWidth"];
		var tmpBHeight = iconThemeVals["iconTdBorderHeight"];
		var tmpColor = iconThemeVals["iconTdBorderColor"];

		view.tableTag.css("width", $(window).width()
				- view.iconTableLeftPadding);
		view.tableTag.css("height", (view.guiHeight - view.iconTableTopPadding)
				+ "px");
		view.iconTdWidth = parseInt(tmpWidth);
		view.iconTdHeight = parseInt(tmpHeight);
		view.iconTdBorderWidth = parseInt(tmpBWidth);
		view.iconTdBorderHeight = parseInt(tmpBHeight);
		gui.background.resizeIconTd();
		$(".iconTd").css("border-left", (tmpBWidth) + "px solid " + tmpColor);
		$(".iconTd").css("border-right", (tmpBWidth) + "px solid " + tmpColor);
		$(".iconTd").css("border-top", (tmpBHeight) + "px solid " + tmpColor);
		$(".iconTd")
				.css("border-bottom", (tmpBHeight) + "px solid " + tmpColor);

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
	this.length = function(array) {
		return array.filter(function(element) {
			return element !== undefined;
		}).length;
	}
}
