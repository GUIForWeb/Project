system.winsAndBars.subsystems.GUIManager = function() {
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
	this.disappear = function(winTag) {
		var winAndBarNode = this.ee.disappear(winTag);
		this.wm.disappear(winAndBarNode);
		this.pe.remove(winAndBarNode);
	}
	this.appear = function(barTag) {
		var winAndBarNode = this.ee.recover(barTag);
		this.wm.appear(winAndBarNode);
		this.pe.append(winAndBarNode);
	}
	this.newWinAndBar = function(iconObj) {
		var winAndBarNode = this.bm.append(iconObj);
		this.wm.append(iconObj, winAndBarNode);
		this.pe.append(winAndBarNode);
		this.valueArray["newId"]++;
		return winAndBarNode;
	}
}