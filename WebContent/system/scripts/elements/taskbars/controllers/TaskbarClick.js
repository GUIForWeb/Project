system.elements.taskbars.controllers.TaskbarClick = function() {
	this.rightKey = function(event) {
		var bzoLeft = this.barZoneOuterSelector.offset().left;
		var bzoWidth = this.barZoneOuterSelector.width();
		var bzWidth = this.barZoneSelector.width();
		var bzLeft = this.barZoneSelector.offset().left;
		if(bzWidth+(bzLeft-bzoLeft)>bzoWidth)
		this.barZoneSelector.offset(
			{left: bzLeft - barDefaultValueArray.oWidth}
		);
	}
	this.leftKey = function(event) {
		var bzoLeft = this.barZoneOuterSelector.offset().left;
		var bzLeft = this.barZoneSelector.offset().left;
		if(bzLeft < bzoLeft)
		this.barZoneSelector.offset(
			{left: bzLeft + barDefaultValueArray.oWidth}
		);
	}
}