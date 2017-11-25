system.elements.winAndBars.subsystems.engines.EnumEngine = function() {
	this.moveBarToTop = function(winAndBarNode) {
		var position = winAndBarNode.bar.view.position;
		var tmpNode = this.nodeArray["winAndBar"];
		var barCount = this.nodeArray["winAndBar"].barCount;
		var lastBar = null;
		if (this.nodeArray["winAndBar"].lastBar != winAndBarNode) {
			while (tmpNode.nextBar instanceof WinAndBarNode) {
				var tmpPst = tmpNode.nextBar.bar.view.position;

				if (tmpPst > position) {
					tmpPst--;
					tmpNode.nextBar.bar.view.setPosition(tmpPst);
					tmpNode = tmpNode.nextBar;
				} else if (tmpPst == position) {
					tmpNode.nextBar.bar.view.setPosition(barCount - 1);
					lastBar = tmpNode.nextBar;
					tmpNode.nextBar.nextBar.prevBar = tmpNode;
					tmpNode.nextBar = lastBar.nextBar;
					lastBar.nextBar = null;
				} else
					tmpNode = tmpNode.nextBar;
			}
			lastBar.prevBar = tmpNode;
			tmpNode.nextBar = lastBar;
			this.nodeArray["winAndBar"].lastBar = lastBar;
		}
		return this.nodeArray["winAndBar"].lastBar;
	}
	this.moveWinToTop = function(winTag) {
		// set Chosen Window To Top
		var zIndex = winTag.style.zIndex
		var tmpNode = this.nodeArray["winAndBar"];
		var winCount = this.nodeArray["winAndBar"].winCount;
		var lastWin = null;
		if (this.nodeArray["winAndBar"].lastWin.win.tag != winTag) {
			while (tmpNode.nextWin instanceof WinAndBarNode) {
				var tmpZIdx = tmpNode.nextWin.win.view.zIndex
				if (tmpZIdx > zIndex) {
					tmpZIdx--;
					tmpNode.nextWin.win.view.setZIndex(tmpZIdx);
					tmpNode = tmpNode.nextWin;
					this.winArray[tmpZIdx] = tmpNode;
				} else if (tmpZIdx == zIndex) {
					tmpNode.nextWin.win.view.prevZIdx = zIndex;
					tmpNode.nextWin.win.view.setZIndex(winCount - 1);
					lastWin = tmpNode.nextWin;
					this.winArray[winCount - 1] = lastWin;
					tmpNode.nextWin.nextWin.prevWin = tmpNode;
					tmpNode.nextWin = lastWin.nextWin;
					lastWin.nextWin = null;
				} else
					tmpNode = tmpNode.nextWin;
			}
			lastWin.prevWin = tmpNode;
			tmpNode.nextWin = lastWin;
			this.nodeArray["winAndBar"].lastWin = lastWin;
		} else {
			this.nodeArray["winAndBar"].lastWin.win.view.prevZIdx = winTag.style.zIndex;
		}
		return this.nodeArray["winAndBar"].lastWin;
	}
	this.addNewWinAndBarNode = function(winAndBarNode) {
		var tmpNode = this.nodeArray["winAndBar"];
		tmpNode.lastWin.nextWin = winAndBarNode;
		winAndBarNode.prevWin = tmpNode.lastWin;
		tmpNode.lastWin = winAndBarNode;
		return tmpNode.lastWin;
	}
	this.appear = function(barTag) {
		var winAndBarNode = this.nm.getNodeWithBarTag(barTag);
		winAndBarNode.win.view.setZIndex(this.nodeArray["winAndBar"].winCount);
		var lastNode = this.nodeArray["winAndBar"].lastWin;
		lastNode.nextWin = winAndBarNode;
		winAndBarNode.prevWin = lastNode;
		this.nodeArray["winAndBar"].lastWin = winAndBarNode;
		this.nodeArray["winAndBar"].winCount++;
		return winAndBarNode;
	}
	this.disappearAll = function() {
		this.nodeArray["winAndBar"].winCount = 0;
	}
	this.disappear = function(winTag) {
		var winCount = --this.nodeArray["winAndBar"].winCount;
		var winAndBarNode = null;
		var zIndex = winTag.style.zIndex;
		if (zIndex != winCount) {
			var tmpNode = this.nodeArray["winAndBar"];
			while (tmpNode.nextBar instanceof WinAndBarNode) {
				tmpNode = tmpNode.nextBar;
				var tmpZIdx = tmpNode.win.view.zIndex;
				if (tmpZIdx > zIndex) {
					tmpZIdx--;
					tmpNode.win.view.setZIndex(tmpZIdx);
				} else if (tmpNode.win.tag == winTag) {
					winAndBarNode = tmpNode;
					winAndBarNode.win.view.setZIndex(-1);
				}
			}
			winAndBarNode.prevWin.nextWin = winAndBarNode.nextWin;
			winAndBarNode.nextWin.prevWin = winAndBarNode.prevWin;
			winAndBarNode.nextWin = null;
		} else {
			winAndBarNode = this.nodeArray["winAndBar"].lastWin;
			this.nodeArray["winAndBar"].lastWin = winAndBarNode.prevWin;
			winAndBarNode.prevWin.nextWin = null;

		}
		winAndBarNode.prevWin = null;
		return winAndBarNode;
	}
}