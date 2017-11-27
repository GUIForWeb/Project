system.elements.winAndBars.subsystems.engines.WindowSizingEngine = function() {
	this.resizing = function(tag) {
		this.tag = tag;
		this.winTag = this.tag.parentNode;
		this.initStandardValue();
		if(this.win.view.isResizable) {
			this.initAdditionalValue();
			this.calculate();
			this.change();
		}
	}
	this.initStandardValue = function() {
		this.winAndBarNode = this.nm.getNodeWithWinTag(this.winTag);
		this.win = this.winAndBarNode.win;
		this.oLeft = this.winTag.offsetLeft;
		this.oTop = this.winTag.offsetTop;
		this.oWidth = $(this.winTag).width();
		this.oHeight = $(this.winTag).height();
	}
	this.initAdditionalValue = function() {
		this.className = this.tag.className;
		this.minWidth = this.win.view.minWidth;
		this.minHeight = this.win.view.minHeight;
		this.resizeHeight = this.win.view.resizeHeight;
		this.resizeWidth = this.win.view.resizeWidth;
	}
	this.calculate = function() {
		this.totalMouseX = event.clientX + window.pageXOffset;
		this.totalMouseY = event.clientY + window.pageYOffset;
		if (this.totalMouseX == 0)
			return 0;
		if (this.totalMouseY == 0)
			return 0;
		this.tmpGapOfWidth = this.totalMouseX - this.oLeft;
		this.tmpGapOfHeight = this.totalMouseY - this.oTop;
		if (this.oWidth > this.minWidth && this.oHeight > this.minHeight) {
			if (this.className == this.win.view.southEastLayerTagClass) {
				this.oHeight = this.tmpGapOfHeight;
				this.oWidth = this.tmpGapOfWidth;
			} else if (this.className == this.win.view.northEastLayerTagClass) {
				this.oHeight = this.oHeight - this.tmpGapOfHeight;
				this.oWidth = this.tmpGapOfWidth;
				if (this.oHeight >= 100)
					this.oTop = this.totalMouseY;
			} else if (this.className == this.win.view.eastLayerTagClass) {
				this.oWidth = this.tmpGapOfWidth;
			} else if (this.className == this.win.view.southLayerTagClass) {
				this.oHeight = this.tmpGapOfHeight;
			} else if (this.className == this.win.view.southWestLayerTagClass) {
				this.oHeight = this.tmpGapOfHeight;
				this.oWidth = this.oWidth - this.tmpGapOfWidth;
				if (this.oWidth >= 100)
					this.oLeft = this.totalMouseX;
			} else if (this.className == this.win.view.westLayerTagClass) {
				this.oWidth = this.oWidth - this.tmpGapOfWidth;
				if (this.oWidth >= 100)
					this.oLeft = this.totalMouseX;
			} else if (this.className == this.win.view.northLayerTagClass) {
				this.oHeight = this.oHeight - this.tmpGapOfHeight;
				if (this.oHeight >= 100)
					this.oTop = event.clientY;
			} else if (this.className == this.win.view.northWestLayerTagClass) {
				this.oWidth = this.oWidth - this.tmpGapOfWidth;
				this.oHeight = this.oHeight - this.tmpGapOfHeight;
				if (this.oWidth >= 100)
					this.oLeft = this.totalMouseX;
				if (this.oHeight >= 100)
					this.oTop = this.totalMouseY;
			}
		}
	}
	this.change = function() {
		if (this.oWidth <= this.minWidth) {
			this.oWidth = this.minWidth + 5;
		}
		if (this.oHeight <= this.minHeight) {
			this.oHeight = this.minHeight + 5;
		}
		this.tagIds = this.win.view.tagIds;
		this.oBorderWidth = this.win.view.oBorderWidth;
		this.bBorderWidth = this.win.view.bBorderWidth;
		this.bWidth = this.win.view.bWidth;
		this.bTop = this.win.view.bTop;
		this.hHeight = this.win.view.hHeight;
		this.hTop = this.win.view.hTop;
		this.cLeft = this.win.view.cLeft;
		this.hWidth = this.oWidth - (this.oBorderWidth*2);
		this.bGap = (this.bBorderWidth * 2) + this.bWidth + this.bTop;
		this.mWidth = this.hWidth - this.bGap * 3 - (this.oBorderWidth*2);
		this.xBLeft = this.oWidth - this.bGap - (this.oBorderWidth*2);
		this.fBLeft = this.oWidth - this.bGap * 2 - (this.oBorderWidth*2);
		this.hBLeft = this.oWidth - this.bGap * 3 - (this.oBorderWidth*2);
		$("#" + this.tagIds["o"]).css("left", this.oLeft).css("top", this.oTop);
		$("#" + this.tagIds["o"]).css("width", this.oWidth);
		$("#" + this.tagIds["o"]).css("height", this.oHeight);
		$("#" + this.tagIds["m"]).css("width", this.mWidth);
		$("#" + this.tagIds["h"]).css("width", this.hWidth);
		$("#" + this.tagIds["c"]).css("left", this.cLeft).css("top",
				this.hHeight + this.hTop);
		$("#" + this.tagIds["c"]).css("width", this.oWidth - (this.oBorderWidth*2));
		$("#" + this.tagIds["c"]).css("height",
				this.oHeight - (this.oBorderWidth*2) - this.hHeight);
		$("#" + this.tagIds["xB"]).css("left", this.xBLeft);
		$("#" + this.tagIds["fB"]).css("left", this.fBLeft);
		$("#" + this.tagIds["hB"]).css("left", this.hBLeft);
		$("#" + this.tagIds["nw"]).css("left", 0).css("top", 0);
		$("#" + this.tagIds["ne"]).css("left", this.oWidth - this.resizeWidth)
				.css("top", 0);
		$("#" + this.tagIds["sw"]).css("left", 0).css("top",
				this.oHeight - this.resizeHeight);
		$("#" + this.tagIds["se"]).css("left", this.oWidth - this.resizeWidth)
				.css("top", this.oHeight - this.resizeHeight);
		$("#" + this.tagIds["n"]).css("width",
				this.oWidth - this.resizeWidth * 2);
		$("#" + this.tagIds["e"]).css("left", this.oWidth - this.resizeWidth);
		$("#" + this.tagIds["e"]).css("height",
				this.oHeight - this.resizeHeight * 2);
		$("#" + this.tagIds["s"]).css("top", this.oHeight - this.resizeWidth);
		$("#" + this.tagIds["s"]).css("width",
				this.oWidth - this.resizeWidth * 2);
		$("#" + this.tagIds["w"]).css("height",
				this.oHeight - this.resizeHeight * 2);
	}

	this.setSize = function(tag) {
		this.tag = tag;
		this.winTag = tag.parentNode;
		this.initStandardValue();
		this.win.view.oWidth = this.oWidth;
		this.win.view.oHeight = this.oHeight;
		if (this.win.view.oLeft != this.oLeft
				|| this.win.view.oTop != this.oTop) {
			this.pe.changePosition(this.winAndBarNode);
		}
		this.win.view.oLeft = this.oLeft;
		this.win.view.oTop = this.oTop;
		return this.winAndBarNode;
	}

	this.fullScreen = function(winAndBarNode) {
		this.winAndBarNode = winAndBarNode;
		this.tag = winAndBarNode.win.tag;
		this.winTag = winAndBarNode.win.tag;
		this.win = this.winAndBarNode.win;
		if(this.win.view.isResizable) {
			this.oLeft = this.winTag.offsetLeft;
			this.oTop = this.winTag.offsetTop;
			this.oWidth = $(this.winTag).width();
			this.oHeight = $(this.winTag).height();
			this.oBWidth = parseInt($(this.tag).css("border-width"));
			if (this.win.view.isFullScreen) {
				this.oLeft = this.win.view.prevOLeft;
				this.oTop = this.win.view.prevOTop;
				this.oWidth = this.win.view.prevOWidth;
				this.oHeight = this.win.view.prevOHeight;
				this.win.view.isFullScreen = false;
			} else {
				this.win.view.prevOLeft = this.winTag.offsetLeft;
				this.win.view.prevOTop = this.winTag.offsetTop;
				this.win.view.prevOWidth = this.winTag.offsetWidth;
				this.win.view.prevOHeight = this.winTag.offsetHeight;
				this.oLeft = 0;
				this.oTop = 0;
				this.oWidth = $(window).width() - this.oBWidth * 2;
				this.oHeight = $(window).height() - this.taskbar.manager.view.oHeight;
				this.win.view.isFullScreen = true;
			}
			this.win.view.oWidth = this.oWidth;
			this.win.view.oHeight = this.oHeight;
			this.initAdditionalValue();
			this.calculate();
			this.change();
			this.win.view.oLeft = this.winTag.offsetLeft;
			this.win.view.oTop = this.winTag.offsetTop;
			this.win.view.oWidth = this.winTag.offsetWidth;
			this.win.view.oHeight = this.winTag.offsetHeight;
		}
		return this.winAndBarNode;
	}
	/*
	 * this.fullScreen = function(winTag){ this.tag = winTag; this.winTag =
	 * winTag; this.initStandardValue(); this.oBWidth =
	 * parseInt($(this.tag).css("border-width")); if(this.win.fullScreen){
	 * this.oLeft = this.win.view.preOLeft; this.oTop = this.win.view.preOTop;
	 * this.oWidth = this.win.view.preOWidth; this.oHeight =
	 * this.win.view.preOHeight; this.win.fullScreen = false; } else{
	 * this.win.view.preOLeft = this.winTag.offsetLeft; this.win.view.preOTop =
	 * this.winTag.offsetTop; this.win.view.preOWidth = this.winTag.offsetWidth;
	 * this.win.view.preOHeight = this.winTag.offsetHeight; this.oLeft = 0;
	 * this.oTop = 0; this.oWidth = $(window).width() - this.oBWidth*2;
	 * this.oHeight = $(window).height() - this.taskbar.view.oHeight;
	 * this.win.fullScreen = true; } this.win.view.oWidth = this.oWidth;
	 * this.win.view.oHeight = this.oHeight; this.initAdditionalValue();
	 * this.calculate(); this.change(); return this.winAndBarNode; }
	 */
}