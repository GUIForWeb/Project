system.elements.configures.subsystems.ConfigureManager = function() {
	this.execute = new ExecutionManager();
	this.execute.__proto__ = this;
}