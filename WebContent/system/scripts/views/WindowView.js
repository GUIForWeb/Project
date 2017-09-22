system.views.WindowView = function(windowModel) {
	this.__proto__ = windowModel;
	this.isFullScreen = false;
	this.isOnScreen = true;
	this.outerLayerTagClass = "windowOuterLayer";
	this.headLayerTagClass = "windowHeadLayer";
	this.contentLayerTagClass = "windowContentLayer";
	this.buttonLayerTagClass = "windowButtonLayer";
	this.movementHandleLayerTagClass = "windowMovementHandleLayer";
	this.northLayerTagClass = "windowNorthLayer";
	this.eastLayerTagClass = "windowEastLayer";
	this.southLayerTagClass = "windowSouthLayer";
	this.westLayerTagClass = "windowWestLayer";
	this.northWestLayerTagClass = "windowNorthWestLayer";
	this.northEastLayerTagClass = "windowNorthEastLayer";
	this.southWestLayerTagClass = "windowSouthWestLayer";
	this.southEastLayerTagClass = "windowSouthEastLayer";
	this.prevZIdx = 0;
	this.zIndex = 0;
	this.xBorderWidth = 0;
	this.oBorderWidth = 0;
	this.hHeight = 0;
	this.bWidth = 0;
	this.bHeight = 0;
	this.bTop = 0;
	this.minWidth = 0;
	this.minHeight = 0;
	this.prevOLeft = 0;
	this.prevOTop = 0;
	this.prevOWidth = 0;
	this.prevOHeight = 0;
	this.resizeWidth = 10;
	this.resizeHeight = 10;
	this.nwLeft = 0;
	this.nwTop = 0;
	this.neTop = 0;
	this.swLeft = 0;
	this.nTop = 0;
	this.wLeft = 0;
	this.setZIndex = function(zIndex) {
		this.outerSelector[0].style.zIndex = zIndex;
		this.zIndex = zIndex;
	}
	this.windowLayer = function() {
		this.headSelector.append(this.hButtonSelector);
		this.headSelector.append(this.fButtonSelector);
		this.headSelector.append(this.xButtonSelector);
		this.headSelector.append(this.movementHandleSelector);
		// this.outerSelector.append(this.movementHandleSelector);
		this.outerSelector.append(this.contentSelector);
		this.outerSelector.append(this.headSelector);
		this.outerSelector.append(this.northSelector);
		this.outerSelector.append(this.eastSelector);
		this.outerSelector.append(this.southSelector);
		this.outerSelector.append(this.westSelector);
		this.outerSelector.append(this.northWestSelector);
		this.outerSelector.append(this.northEastSelector);
		this.outerSelector.append(this.southWestSelector);
		this.outerSelector.append(this.southEastSelector);
		this.windowSelector = this.outerSelector;
	}
	this.outerLayer = function() {
		// "<div id='" + this.ids["o"] + "' tabindex='0' style='z-index:1;
		// outline:1px solid transparent; position:absolute; left:" + this.oLeft
		// + "px; top:" + this.oTop + "px; width:" + this.oWidth + "px; height:"
		// + this.oHeight + "px; background-color:" + this.oBgC + ";' onfocus='"
		// + this.ids["id"] + ".incZIndex();'>";
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagId);
		tmpS.attr("draggable", "true");
		tmpS.css("z-index", parseInt(this.zIndex));
		tmpS.css("position", "absolute");
		tmpS.addClass(this.outerLayerTagClass);
		tmpS = tmpS.attr("tabindex", "0");
		tmpS.width(this.oWidth);
		tmpS.height(this.oHeight);
		tmpS.offset({
			left : this.oLeft,
			top : this.oTop
		});
		this.outerSelector = tmpS;
	}
	this.headLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.html(this.name);
		tmpS.attr("id", this.tagIds["h"]);
		tmpS.attr("draggable", "true");
		tmpS.css("position", "absolute");
		tmpS.addClass(this.headLayerTagClass);
		tmpS.width(this.hWidth);
		tmpS.height(this.hHeight);
		tmpS.offset({
			left : this.hLeft,
			top : this.hTop
		});
		this.headSelector = tmpS;
	}
	this.contentLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["c"]);
		tmpS.attr("draggable", "true");
		tmpS.html(this.content);
		tmpS.css("position", "absolute");
		tmpS.css("overflow", "auto");
		tmpS.addClass(this.contentLayerTagClass);
		tmpS.width(this.cWidth);
		tmpS.height(this.cHeight);
		tmpS.offset({
			left : this.cLeft,
			top : this.cTop
		});
		tmpS.click(function(event) {
			gui.click.content(event);
		});
		tmpS.contextmenu(function(event) {
			gui.click.cButton(event);
		});
		tmpS.bind("DOMSubtreeModified", function(event) {
			var winTag = event.currentTarget.parentNode;
			if (winTag.style !== undefined && gui.winArray.length != 0
					&& gui.winArray[winTag.style.zIndex] !== undefined) {
				gui.winArray[winTag.style.zIndex].win.view.alam();
			}
		});
		this.contentSelector = tmpS;
	}
	this.alam = function() {
		var win = this.__proto__;
		var time = 500;
		var args = arguments;
		var winTag = this;
		if (this.clock === undefined)
			this.clock = 0;
		clearTimeout(this.clock);
		this.clock = setTimeout(function() {
			gui.gr.updateContent(win);
		}, time);
	}
	this.movementHandleLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["m"]);
		tmpS.css("position", "absolute");
		tmpS.addClass(this.movementHandleLayerTagClass);
		tmpS.width(this.mWidth);
		tmpS.height(this.hHeight);
		tmpS.offset({
			left : 0,
			top : 0
		});
		tmpS.attr("draggable", "true");
		tmpS.on("dragstart", function(event) {
			gui.drag.start.head(event);
		});
		tmpS.on("drag", function(event) {
			gui.drag.ing.head(event);
		});
		tmpS.on("dragend", function(event) {
			gui.drag.end.head(event);
		});
		tmpS.click(function(event) {
			gui.click.head(event)
		});
		this.movementHandleSelector = tmpS;
	}
	this.hButtonLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["hB"]);
		tmpS.css("position", "absolute");
		tmpS.html("&lowbar;");
		tmpS.offset({
			left : this.hBLeft,
			top : this.bTop
		});
		tmpS.addClass(this.buttonLayerTagClass);
		tmpS.width(this.bWidth);
		tmpS.height(this.bHeight);
		tmpS.click(function(event) {
			gui.click.hButton(event)
		});
		this.hButtonSelector = tmpS;
	}
	this.fButtonLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["fB"]);
		tmpS.css("position", "absolute");
		tmpS.html("&squ;");
		tmpS.offset({
			left : this.fBLeft,
			top : this.bTop
		});
		tmpS.addClass(this.buttonLayerTagClass);
		tmpS.width(this.bWidth);
		tmpS.height(this.bHeight);
		tmpS.click(function(event) {
			gui.click.fButton(event)
		});
		this.fButtonSelector = tmpS;
	}
	this.xButtonLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["xB"]);
		tmpS.css("position", "absolute");
		tmpS.html("&times;");
		tmpS.offset({
			left : this.xBLeft,
			top : this.bTop
		});
		tmpS.addClass(this.buttonLayerTagClass);
		tmpS.width(this.bWidth);
		tmpS.height(this.bHeight);
		tmpS.click(function(event) {
			gui.click.xButton(event);
		});
		this.xButtonSelector = tmpS;
	}
	this.northWestLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["nw"]);
		tmpS.css("position", "absolute");
		tmpS.offset({
			left : this.nwLeft,
			top : this.nwTop
		});
		tmpS.addClass(this.northWestLayerTagClass);
		tmpS.width(this.resizeWidth);
		tmpS.height(this.resizeHeight);
		tmpS.attr("draggable", "true");
		tmpS.on("dragstart", function(event) {
			gui.resize.start.window(event);
		});
		tmpS.on("drag", function(event) {
			gui.resize.ing.window(event);
		});
		tmpS.on("dragend", function(event) {
			gui.resize.end.window(event);
		});
		this.northWestSelector = tmpS;
	}
	this.northEastLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["ne"]);
		tmpS.css("position", "absolute");
		tmpS.offset({
			left : this.neLeft,
			top : this.neTop
		});
		tmpS.addClass(this.northEastLayerTagClass);
		tmpS.width(this.resizeWidth);
		tmpS.height(this.resizeHeight);
		tmpS.attr("draggable", "true");
		tmpS.on("dragstart", function(event) {
			gui.resize.start.window(event);
		});
		tmpS.on("drag", function(event) {
			gui.resize.ing.window(event);
		});
		tmpS.on("dragend", function(event) {
			gui.resize.end.window(event);
		});
		this.northEastSelector = tmpS;
	}
	this.southWestLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["sw"]);
		tmpS.css("position", "absolute");
		tmpS.offset({
			left : this.swLeft,
			top : this.swTop
		});
		tmpS.addClass(this.southWestLayerTagClass);
		tmpS.width(this.resizeWidth);
		tmpS.height(this.resizeHeight);
		tmpS.attr("draggable", "true");
		tmpS.on("dragstart", function(event) {
			gui.resize.start.window(event);
		});
		tmpS.on("drag", function(event) {
			gui.resize.ing.window(event);
		});
		tmpS.on("dragend", function(event) {
			gui.resize.end.window(event);
		});
		this.southWestSelector = tmpS;
	}
	this.southEastLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["se"]);
		tmpS.css("position", "absolute");
		tmpS.offset({
			left : this.seLeft,
			top : this.seTop
		});
		tmpS.addClass(this.southEastLayerTagClass);
		tmpS.width(this.resizeWidth);
		tmpS.height(this.resizeHeight);
		tmpS.attr("draggable", "true");
		tmpS.on("dragstart", function(event) {
			gui.resize.start.window(event);
		});
		tmpS.on("drag", function(event) {
			gui.resize.ing.window(event);
		});
		tmpS.on("dragend", function(event) {
			gui.resize.end.window(event);
		});
		this.southEastSelector = tmpS;
	}

	this.northLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["n"]);
		tmpS.css("position", "absolute");
		tmpS.offset({
			left : this.nLeft,
			top : this.nTop
		});
		tmpS.addClass(this.northLayerTagClass);
		tmpS.width(this.nWidth);
		tmpS.height(this.nHeight);
		tmpS.attr("draggable", "true");
		tmpS.on("dragstart", function(event) {
			gui.resize.start.window(event);
		});
		tmpS.on("drag", function(event) {
			gui.resize.ing.window(event);
		});
		tmpS.on("dragend", function(event) {
			gui.resize.end.window(event);
		});
		this.northSelector = tmpS;
	}
	this.eastLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["e"]);
		tmpS.css("position", "absolute");
		tmpS.offset({
			left : this.eLeft,
			top : this.eTop
		});
		tmpS.addClass(this.eastLayerTagClass);
		tmpS.width(this.eWidth);
		tmpS.height(this.eHeight);
		tmpS.attr("draggable", "true");
		tmpS.on("dragstart", function(event) {
			gui.resize.start.window(event);
		});
		tmpS.on("drag", function(event) {
			gui.resize.ing.window(event);
		});
		tmpS.on("dragend", function(event) {
			gui.resize.end.window(event);
		});
		this.eastSelector = tmpS;
	}
	this.southLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["s"]);
		tmpS.css("position", "absolute");
		tmpS.offset({
			left : this.sLeft,
			top : this.sTop
		});
		tmpS.addClass(this.southLayerTagClass);
		tmpS.width(this.sWidth);
		tmpS.height(this.sHeight);
		tmpS.attr("draggable", "true");
		tmpS.on("dragstart", function(event) {
			gui.resize.start.window(event);
		});
		tmpS.on("drag", function(event) {
			gui.resize.ing.window(event);
		});
		tmpS.on("dragend", function(event) {
			gui.resize.end.window(event);
		});
		this.southSelector = tmpS;
	}
	this.westLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagIds["w"]);
		tmpS.css("position", "absolute");
		tmpS.offset({
			left : this.wLeft,
			top : this.wTop
		});
		tmpS.addClass(this.westLayerTagClass);
		tmpS.width(this.wWidth);
		tmpS.height(this.wHeight);
		tmpS.attr("draggable", "true");
		tmpS.on("dragstart", function(event) {
			gui.resize.start.window(event);
		});
		tmpS.on("drag", function(event) {
			gui.resize.ing.window(event);
		});
		tmpS.on("dragend", function(event) {
			gui.resize.end.window(event);
		});
		this.westSelector = tmpS;
	}
	this.setIds = function() {
		var tagId = this.tagId.charAt(0).toUpperCase() + this.tagId.slice(1);
		this.tagIds = [];
		this.tagIds["o"] = this.tagId;
		this.tagIds["h"] = "hOf" + tagId;
		this.tagIds["c"] = "cOf" + tagId;
		this.tagIds["m"] = "mOf" + tagId;
		this.tagIds["fB"] = "fBOF" + tagId;
		this.tagIds["xB"] = "xBOf" + tagId;
		this.tagIds["hB"] = "hBOf" + tagId;
		this.tagIds["nw"] = "nwOf" + tagId;
		this.tagIds["ne"] = "neOf" + tagId;
		this.tagIds["sw"] = "swOf" + tagId;
		this.tagIds["se"] = "seOf" + tagId;
		this.tagIds["n"] = "nOf" + tagId;
		this.tagIds["e"] = "eOf" + tagId;
		this.tagIds["s"] = "sOf" + tagId;
		this.tagIds["w"] = "wOf" + tagId;
	}
	this.setDefaultValues = function(defaultValueArray) {
		this.bBorderWidth = defaultValueArray["bBorderWidth"];
		this.oLeft = defaultValueArray["oDefaultLeft"];
		this.oTop = defaultValueArray["oDefaultTop"];
		this.oWidth = defaultValueArray["oDefaultWidth"];
		this.oHeight = defaultValueArray["oDefaultHeight"];
		this.oBorderWidth = defaultValueArray["oBorderWidth"];
		this.hHeight = defaultValueArray["hHeight"];
		this.bWidth = defaultValueArray["bWidth"];
		this.bHeight = defaultValueArray["bHeight"];
		this.bTop = defaultValueArray["bTop"];
		this.minWidth = defaultValueArray["minWidth"];
		this.minHeight = defaultValueArray["minHeight"];
	}
	this.restoreView = function(windowMap) {
		this.oLeft = windowMap["oLeft"];
		this.oTop = windowMap["oTop"];
		this.oWidth = windowMap["oWidth"];
		this.oHeight = windowMap["oHeight"];
		this.prevOLeft = windowMap["prevOLeft"];
		this.prevOTop = windowMap["prevOTop"];
		this.prevOWidth = windowMap["prevOWidth"];
		this.prevOHeight = windowMap["prevOHeight"];
		this.zIndex = windowMap["zIndex"];
		this.getView();
	}
	this.getView = function() {
		this.hLeft = this.oBorderWidth / 2;
		this.hTop = this.hLeft;
		this.bSpace = (this.bBorderWidth * 2) + this.bWidth + this.bTop;
		this.xBLeft = this.oWidth - this.bSpace - this.oBorderWidth;
		this.fBLeft = this.oWidth - this.bSpace * 2 - this.oBorderWidth;
		this.hBLeft = this.oWidth - this.bSpace * 3 - this.oBorderWidth;
		this.hWidth = this.oWidth - (this.oBorderWidth);
		this.mWidth = this.hWidth - this.bSpace * 3 - this.oBorderWidth;
		this.cWidth = this.oWidth - (this.oBorderWidth);
		this.cHeight = this.oHeight - this.oBorderWidth - this.hHeight;
		this.cLeft = this.oBorderWidth / 2;
		this.cTop = this.hHeight + this.oBorderWidth / 2;
		this.neLeft = this.oWidth - this.resizeWidth;
		this.swTop = this.oHeight - this.resizeHeight;
		this.seLeft = this.oWidth - this.resizeWidth;
		this.seTop = this.oHeight - this.resizeHeight;
		this.nLeft = this.resizeWidth;
		this.nWidth = this.oWidth - this.resizeWidth * 2;
		this.nHeight = this.resizeWidth;
		this.eLeft = this.oWidth - this.resizeWidth;
		this.eTop = this.resizeHeight;
		this.eWidth = this.resizeWidth;
		this.eHeight = this.oHeight - this.resizeHeight * 2;
		this.sLeft = this.resizeWidth;
		this.sTop = this.oHeight - this.resizeWidth;
		this.sWidth = this.oWidth - this.resizeWidth * 2;
		this.sHeight = this.resizeWidth;
		this.wTop = this.resizeHeight;
		this.wWidth = this.resizeWidth;
		this.wHeight = this.oHeight - this.resizeHeight * 2;
		this.setIds();
		this.northLayer();
		this.eastLayer();
		this.southLayer();
		this.westLayer();
		this.northWestLayer();
		this.northEastLayer();
		this.southWestLayer();
		this.southEastLayer();
		this.movementHandleLayer();
		this.xButtonLayer();
		this.hButtonLayer();
		this.fButtonLayer();
		this.outerLayer();
		this.headLayer();
		this.contentLayer();
		this.windowLayer();
	}
}