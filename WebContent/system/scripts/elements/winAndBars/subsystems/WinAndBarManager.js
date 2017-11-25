system.elements.winAndBars.subsystems.WinAndBarManager = function() {
	this.wm = new WindowManager();
	this.wm.__proto__ = this;
	this.bm = new BarManager();
	this.bm.__proto__ = this;
	this.ee = new EnumEngine();
	this.ee.__proto__ = this;
	this.wse = new WindowSizingEngine();
	this.wse.__proto__ = this;
	this.pe = new PositioningEngine();
	this.pe.__proto__ = this;
	this.nm = new NodeManager();
	this.nm.__proto__ = this;
	this.isAllDisappeared = false;
	this.resizeend = function(tag) {
		this.wse.setSize(tag);
	}
	this.resizing = function(tag) {
		this.wse.resizing(tag);
	}
	this.fullScreen = function(winTag) {
		var winAndBarNode = this.ee.moveWinToTop(winTag);
		this.pe.remove(winAndBarNode);
		this.wse.fullScreen(winAndBarNode);
		this.pe.append(winAndBarNode);
		return winAndBarNode;
	}
	this.xWinAndBar = function(winTag) {
		var zIndex = winTag.style.zIndex;
		var winAndBarNode = this.ee.moveWinToTop(winTag);
		var position = winAndBarNode.bar.view.position;
		winAndBarNode = this.ee.moveBarToTop(winAndBarNode);
		this.bm.remove(winAndBarNode);
		this.wm.remove(winAndBarNode);
		this.pe.remove(winAndBarNode);
		this.nm.removeLastNode();
		winAndBarNode.win.view.zIndex = zIndex;
		winAndBarNode.bar.view.position = position;
		return winAndBarNode;
	}
	this.moveWinToTop = function(winTag) {
		return this.ee.moveWinToTop(winTag);
	}
	this.disappearAll = function() {
		this.isAllDisappeared = true;
		this.ee.disappearAll();
		this.pe.removeAll();
		this.wm.disappearAll();
	}
	this.disappear = function(winTag) {
		var winAndBarNode = this.ee.disappear(winTag);
		this.wm.disappear(winAndBarNode);
		this.pe.remove(winAndBarNode);
	}
	this.appear = function(barTag) {
		this.isAllDisappeared = false;
		var winAndBarNode = this.ee.appear(barTag);
		this.wm.appear(winAndBarNode);
		this.pe.append(winAndBarNode);
	}
	this.newWinAndBar = function(iconObj) {
		this.isAllDisappeared = false;
		var winAndBarNode = this.bm.append(iconObj);
		this.wm.append(iconObj, winAndBarNode);
		this.pe.append(winAndBarNode);
		this.valueArray["newId"]++;
		winAndBarNode.win.view.isFirst = false;
		return winAndBarNode;
	}
}