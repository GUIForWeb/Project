system.elements.winAndBars.subsystems.managers.BarManager = function() {
	this.remove = function(winAndBarNode) {
		winAndBarNode.bar.tag.remove();
		var width = this.taskbar.manager.view.barZoneSelector.width();
		this.taskbar.manager.view.barZoneSelector.width(width - winAndBarNode.bar.selector.width());
		this.taskbar.manager.needBarZoneMover();
	}
	this.append = function(iconObj) {
		var winAndBarNode = new WinAndBarNode();
		var tmpNode = this.nm.addBarNode(winAndBarNode);
		var barCount = this.nodeArray["winAndBar"].barCount;
		tmpNode.bar = new Bar();
		tmpNode.bar.guiName = this.guiName;
		tmpNode.bar.name = iconObj.name;
		tmpNode.bar.barZoneSelector = this.taskbar.manager.view.barZoneSelector;
		tmpNode.bar.view.taskbarOHeight = this.taskbar.manager.view.oHeight;
		tmpNode.bar.view.setDefaultValues(barDefaultValueArray);
		tmpNode.bar.init(this.valueArray["newId"], barCount);
		tmpNode.bar.appear();
		this.nodeArray["winAndBar"].barCount += 1;
		this.taskbar.manager.needBarZoneMover();
		return tmpNode;
	}
	this.barLen = function() {
		return this.barArray.filter(function(element) {
			return element !== undefined;
		}).length;
	}
}