system.models.DirectionalPad = function(){
	this.__proto__ = new Model;
	this.view = new DirectionalPadView(this);
	this.isDisplayed = false;
	this.init = function() {
		this.view.outerLayerTagClass = this.subjectName + "DPadTableLayer";
		this.view.keyLayerTagClass = this.subjectName + "DPadKeyLayer";
		this.view.getView();
	}
	this.appear = function(){
		this.selector = this.view.dPadSelector;
		this.taskbarSelector.append(this.selector);
		this.isDisplayed = true;
	}
	this.disappear = function(){
		if(this.isDisplayed)
			this.selector.remove();
	}
	this.setUpKeyClick = function(ctr){
		this.view.upKeySelector.click(function(){
			eval(ctr);
		});
	}
	this.setRigthKeyClick = function(ctr){
		this.view.rightKeySelector.click(function(){
			eval(ctr);
		});
	}
	this.setDownKeyClick = function(ctr){
		this.view.downKeySelector.click(function(){
			eval(ctr);
		});
	}
	this.setLeftKeyClick = function(ctr){
		this.view.leftKeySelector.click(function(){
			eval(ctr);
		});
	}
}