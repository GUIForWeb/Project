guiLib.subsystem.BarManager = function() {
	this.remove = function(winAndBarNode) {
		winAndBarNode.bar.tag.remove();
	}
	this.append = function(iconObj) {
		var winAndBarNode = new WinAndBarNode();
		var tmpNode = this.nm.addBarNode(winAndBarNode);
		var barCount = this.nodeArray["winAndBar"].barCount;
		tmpNode.bar = new Bar();
		tmpNode.bar.guiName = this.guiName;
		tmpNode.bar.name = iconObj.name;
		tmpNode.bar.taskbarSelector = this.taskbarSelector;
		tmpNode.bar.view.taskbarOHeight = this.taskbar.view.oHeight;
		tmpNode.bar.init(this.valueArray["newId"], barCount);
		tmpNode.bar.appendBar();
		this.nodeArray["winAndBar"].barCount += 1;
		return tmpNode;
	}
	this.barLen = function() {
		return this.barArray.filter(function(element) {
			return element !== undefined;
		}).length;
	}
}