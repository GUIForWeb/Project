guiLib.subsystem.EventListener = function() {
	this.xTrigger = false;
	this.event = function() {
	};
	this.callEvent = function() {
		this.xTrigger = false;
		this.event();
		this.event = function() {
		};
	}
	this.addListener = function(name, func) {
		if (name == "xClick") {
			this.clickX(func);
		}
	}
	this.clickX = function(func) {
		this.xTrigger = true;
		this.event = func;
	}
}