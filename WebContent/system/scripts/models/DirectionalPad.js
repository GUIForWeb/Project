system.models.DirectionalPad = function(){
	this.__proto__ = new Model;
	this.view = new DirectionalPadView(this);
	this.init = function() {
		this.view.outerLayerTagClass = this.subjectName + "DPadTableLayer";
		this.view.keyLayerTagClass = this.subjectName + "DPadKeyLayer";
	}
	this.appear = function(){
		console.log("appear");
		this.view.getView();
		this.selector = this.view.dPadSelector;
		this.taskbarSelector.append(this.selector);
		//this.sectionSelector.append(this.view.moverSelector);
	}
	this.disappear = function(){
		console.log("disappear");
	}
}