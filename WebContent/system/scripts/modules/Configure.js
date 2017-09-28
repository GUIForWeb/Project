system.modules.Configure = function(){
	this.manager = new ConfigureManager();
	this.manager.__proto__ = this;
}