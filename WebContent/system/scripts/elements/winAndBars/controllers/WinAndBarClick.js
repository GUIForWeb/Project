system.elements.winAndBars.controllers.WinAndBarClick = function() {
	this.xButton = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var winAndBarNode = this.manager.xWinAndBar(winTag);
		this.repo.xWinAndBar(winAndBarNode);
	}
	this.cButton = function(event) {
		var winTag = event.currentTarget.parentNode;
		var zIndex = winTag.style.zIndex;
		this.manager.moveWinToTop(winTag);
		this.repo.moveWinToTop(zIndex);
	}
	this.hButton = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var zIndex = winTag.style.zIndex
		this.manager.disappear(winTag);
		this.repo.disappear(zIndex);
	}
	this.bar = function(event) {
		var barTag = event.currentTarget.parentNode;
		var winTagId = this.winTagIdRule + this.getBarNumId(barTag);
		var winTag = $("#" + winTagId)[0];
		if (winTag) {
			var winCount = gui.nodeArray["winAndBar"].winCount;
			var zIndex = winTag.style.zIndex;
			if(zIndex == winCount-1){
				this.manager.disappear(winTag);
				this.repo.disappear(zIndex);
			}
			else {
				var winAndBarNode = this.manager.moveWinToTop(winTag);
				this.repo.moveWinToTop(zIndex);
			}
		} else {
			this.manager.appear(barTag);
			this.repo.appear(this.getBarNumId(barTag));
		}
	}
	this.head = function(event) {
		event.stopPropagation();
		var winTag = event.currentTarget.parentNode.parentNode;
		var zIndex = winTag.style.zIndex;
		this.manager.moveWinToTop(winTag);
		this.repo.moveWinToTop(zIndex);
	}
	this.content = function(event) {
		var winTag = event.currentTarget.parentNode;
		var zIndex = winTag.style.zIndex;
		this.manager.moveWinToTop(winTag);
		this.repo.moveWinToTop(zIndex);
	}
	this.fButton = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var winAndBarNode = this.manager.fullScreen(winTag);
		this.repo.fullScreen(winAndBarNode);
	}
}