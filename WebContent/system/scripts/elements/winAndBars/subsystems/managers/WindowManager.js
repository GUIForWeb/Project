system.elements.winAndBars.subsystems.managers.WindowManager = function() {
	this.remove = function(winAndBarNode) {
		winAndBarNode.win.tag.remove();
	}
	this.disappear = function(winAndBarNode) {
		winAndBarNode.win.view.isOnScreen = false;
		winAndBarNode.win.tag.remove();
	}
	this.appear = function(winAndBarNode) {
		winAndBarNode.win.view.isOnScreen = true;
		winAndBarNode.win.appear();
	}
	this.append = function(iconObj, winAndBarNode) {
		var zIndex = this.nodeArray["winAndBar"].winCount;
		var tmpNode = this.ee.addNewWinAndBarNode(winAndBarNode);
		this.winArray[zIndex] = tmpNode;
		tmpNode.win = new Window();
		tmpNode.win.name = iconObj.name;
		if(!iconObj.winInfo.isResizable) {
		tmpNode.win.isResizable = iconObj.isResizable;
			this.winDefaultValueArray.oDefaultWidth = iconObj.winInfo.oWidth;
			this.winDefaultValueArray.oDefaultHeight = iconObj.winInfo.oHeight;
		}
		if(Object.keys(iconObj.options).length) {
			tmpNode.win.options = [];
			var keys = Object.keys(iconObj.options);
			for(ki=0; ki<keys.length; ki++){
				tmpNode.win.options[keys[ki]] = this.request.getData(this.contextPath + iconObj.options[keys[ki]]);
			}
		}
		tmpNode.win.windowZoneSelector = this.windowZoneSelector;
		tmpNode.win.view.setDefaultValues(this.winDefaultValueArray);
		tmpNode.win.view.zIndex = zIndex;
		tmpNode.win.content = this.request.getData(this.contextPath
				+ iconObj.contentURL);
		tmpNode.win.contentURL = iconObj.contentURL;
		tmpNode.win.init(this.valueArray["newId"]);
		tmpNode.win.appear();

		this.nodeArray["winAndBar"].lastWin = tmpNode;
		if ($("<div>" + tmpNode.win.content + "</div>").find(".xWin").length > 0) {
			var content = $("<div>" + tmpNode.win.content + "</div>");
			var data = {};
			data.id = parseInt(content.find(".id").val());
			var func = content.find(".xWin").val();
			data.func = this.request.getData(this.contextPath + func);
			tmpNode.win.addEvent("x", data);
		}
		this.nodeArray["winAndBar"].winCount += 1;
		return tmpNode;
	}

	this.winSize = function() {
		return this.windowArray.filter(function(element) {
			return element !== undefined;
		}).length;
	}
}