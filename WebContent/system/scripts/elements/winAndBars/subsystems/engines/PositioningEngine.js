system.elements.winAndBars.subsystems.engines.PositioningEngine = function() {
	this.oLeft = 0;
	this.oTop = 0;
	this.forMovement = {
		preX : "noValue",
		preY : "noValue",
		subX : "noValue",
		subY : "noValue"
	}
	this.outerLayer = function(tag) {
		var gapX;
		var gapY;
		oLeft = tag.offsetLeft;
		oTop = tag.offsetTop;
		if (this.forMovement.preX == "noValue") {
			this.forMovement.preX = event.clientX;
			this.forMovement.preY = event.clientY;
			return 0;
		} else {
			this.forMovement.subX = event.clientX;
			this.forMovement.subY = event.clientY;
			gapX = this.forMovement.subX - this.forMovement.preX;
			gapY = this.forMovement.subY - this.forMovement.preY;
			if (gapX > 50 || gapY > 50) {
				gapX = 1;
				gapY = 1;
			} else if (gapX < -50 || gapY < -50) {
				gapX = -1;
				gapY = -1;
			}
			if(this.dynamicMode) window.scrollTo(oLeft, oTop);
			oLeft = oLeft + (parseInt(gapX) * 2);
			oTop = oTop + (parseInt(gapY) * 2);

			$(tag).css("left", oLeft + "px");
			$(tag).css("top", oTop + "px");

			if (oLeft <= 0) {
				$(tag).css("left", "10px");
				oLeft = 10;
			} else if (oTop <= 0) {
				$(tag).css("top", "10px");
				oTop = 10;
			} else if (oLeft > this.bgSelector.width() - 30 && !this.dynamicMode) {
				var newOLeft = this.bgSelector.width() - 30;
				$(tag).css("left", newOLeft + "px");
				oLeft = newOLeft;
			} else if (oTop > this.bgSelector.height() - 30 && !this.dynamicMode) {
				var newOTop = this.bgSelector.height() - 30;
				$(tag).css("top", newOTop + "px");
				oTop = newOTop;
			}
			
			this.forMovement = {
				preX : "noValue",
				preY : "noValue",
				subX : "noValue",
				subY : "noValue"
			}
			return 0;
		}
	}
	this.removeAll = function() {
		var tmpNode = this.nodeArray["winAndBar"];
		while(tmpNode.nextBar != null) {
			tmpNode = tmpNode.nextBar;
			if(tmpNode.win.view.isOnScreen)
				this.remove(tmpNode);
		}
	}
	this.remove = function(winAndBarNode) {
		var tagId = winAndBarNode.win.tagId;
		var coordinate = this.windowCoordinate[tagId];
		var cLen = this.windowCoordinate[coordinate].length;
		for (ci = 0; ci < cLen; ci++)
			if (this.windowCoordinate[coordinate][ci] == tagId)
				delete this.windowCoordinate[coordinate][ci];
		delete this.windowCoordinate[tagId];
		this.windowCoordinate[coordinate] = this.windowCoordinate[coordinate].filter(function(elm){return elm != undefined});
		if(this.windowCoordinate[coordinate].length == 0)
			delete this.windowCoordinate[coordinate];
	}
	this.append = function(winAndBarNode) {
		this.left = winAndBarNode.win.view.oLeft;
		this.top = winAndBarNode.win.view.oTop;
		this.windowPositioning(winAndBarNode);
		winAndBarNode.win.view.oLeft = this.left;
		winAndBarNode.win.view.oTop = this.top;
	}
	this.windowPositioning = function(winAndBarNode) {
		var coordinate = this.left.toFixed(1) + "," + this.top.toFixed(1);
		var tagId = winAndBarNode.win.tagId;
		var subArray = [];
		if (this.windowCoordinate[coordinate] === undefined
				|| this.windowCoordinate[coordinate][0] === undefined) {
			subArray[0] = tagId;
			this.windowCoordinate[coordinate] = subArray;
			this.windowCoordinate[tagId] = coordinate;
			$("#" + tagId).offset({
				left : this.left,
				top : this.top
			});
		} else if(winAndBarNode.win.view.isFirst) {
			this.left += 30;
			this.top += 30;
			this.windowPositioning(winAndBarNode);
		} else {
			subArray = this.windowCoordinate[coordinate];
			subArray.push(tagId);
			this.windowCoordinate[tagId] = coordinate;
		}
	}
	this.changePosition = function(winAndBarNode) {
		var tagId = winAndBarNode.win.tagId;
		var coordinate = winAndBarNode.win.view.oLeft.toFixed(1) + ","
				+ winAndBarNode.win.view.oTop.toFixed(1);
		if (null != this.windowCoordinate[coordinate]) {
			var cLen = this.windowCoordinate[coordinate].length;
			for (ci = 0; ci < cLen; ci++) {
				if (this.windowCoordinate[coordinate][ci] == tagId) {
					delete this.windowCoordinate[coordinate][ci];
					delete this.windowCoordinate[tagId];
					if (this.length(this.windowCoordinate[coordinate]) == 0) {
						delete this.windowCoordinate[coordinate];
					}
				}
			}
		}
		var offsetLeft = winAndBarNode.win.tag.offsetLeft;
		var offsetTop = winAndBarNode.win.tag.offsetTop;
		coordinate = offsetLeft.toFixed(1) + "," + offsetTop.toFixed(1);
		winAndBarNode.win.view.oLeft = offsetLeft;
		winAndBarNode.win.view.oTop = offsetTop;
		if (this.windowCoordinate[coordinate] === undefined
				|| this.windowCoordinate[coordinate][0] === undefined) {
			var subArray = [];
			subArray[0] = tagId;
			this.windowCoordinate[coordinate] = subArray;
		} else {
			var flag = true;
			cLen = this.windowCoordinate[coordinate].length;
			for (ci = 0; ci < cLen; ci++) {
				if (this.windowCoordinate[coordinate][ci] === undefined) {
					this.windowCoordinate[coordinate][ci] = tagId;
					var flag = false;
					break;
				}
			}
			if (flag) {
				this.windowCoordinate[coordinate][cLen] = tagId;
			}
		}
		this.windowCoordinate[tagId] = coordinate;
	}
	this.restorePositioning = function(winObj) {
		var tagId = winObj.tagId;
		var coordinate = winObj.view.oLeft + "," + winObj.view.oTop;
		var subArray = [];
		subArray[0] = winObj.tagId;
		this.windowCoordinate[coordinate] = subArray;
		this.windowCoordinate[tagId] = coordinate;
	}
	this.length = function(array) {
		return array.filter(function(element) {
			return element !== undefined;
		}).length;
	}
}