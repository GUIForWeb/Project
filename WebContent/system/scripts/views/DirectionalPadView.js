system.views.DirectionalPadView = function(mover) {
	this.__proto__ = mover;
	this.name = "";
	this.oWidth = 100;
	this.oHeight = 30;
	this.moverLayer = function() {
		this.dPadSelector = this.tableSelector;
		this.firstRowSelector.append(this.upKeySelector);
		this.secondRowSelector.append(this.leftKeySelector);
		this.secondRowSelector.append(this.rightKeySelector);
		this.thirdRowSelector.append(this.downKeySelector);
		if(this.type == Direction.VERTICAL || this.type == Direction.NEWS) 
			this.tableSelector.append(this.firstRowSelector);
		if(this.type == Direction.HORIZONTAL || this.type == Direction.NEWS)
			this.tableSelector.append(this.secondRowSelector);
		if(this.type == Direction.VERTICAL || this.type == Direction.NEWS) 
			this.tableSelector.append(this.thirdRowSelector);
	}
	this.firstRowLayer = function() {
		var tmpTag = $("<tr></tr>");
		this.firstRowSelector = tmpTag;
	}
	this.secondRowLayer = function() {
		var tmpTag = $("<tr></tr>");
		this.secondRowSelector = tmpTag;
	}
	this.thirdRowLayer = function() {
		var tmpTag = $("<tr></tr>");
		this.thirdRowSelector = tmpTag;
	}
	this.upKeyLayer = function(){
		var tmpTag = $("<td>&#9651;</td>");
		tmpTag.addClass(this.keyLayerTagClass);
		tmpTag.attr("colspan", 2);
		tmpTag.width(this.oWidth);
		tmpTag.click(function(){
			gui.taskbar.click.upKey();
		})
		this.upKeySelector = tmpTag;
	}
	this.rightKeyLayer = function(){
		var tmpTag = $("<td>&#9655;</td>");
		tmpTag.addClass(this.keyLayerTagClass);
		tmpTag.width(this.oWidth/2);
		tmpTag.click(function(){
			gui.taskbar.click.rightKey();
		})
		this.rightKeySelector = tmpTag;
	}
	this.downKeyLayer = function(){
		var tmpTag = $("<td>&#9661;</td>");
		tmpTag.addClass(this.keyLayerTagClass);
		tmpTag.attr("colspan", 2);
		tmpTag.width(this.oWidth);
		tmpTag.click(function(){
			gui.taskbar.click.downKey();
		})
		this.downKeySelector = tmpTag;
	}
	this.leftKeyLayer = function(){
		var tmpTag = $("<td>&#9665;</td>");
		tmpTag.addClass(this.keyLayerTagClass);
		tmpTag.width(this.oWidth/2);
		tmpTag.click(function(){
			gui.taskbar.click.leftKey();
		})
		this.leftKeySelector = tmpTag;
	}
	
	this.tableLayer = function() {
		var tmpTag = $("<table></table>");
		tmpTag.addClass(this.outerLayerTagClass);
		tmpTag.width(this.oWidth);
		tmpTag.height(this.oHeight);
		tmpTag.offset({
			left : this.taskbarSelector.width() - this.oWidth,
			top : -this.oHeight
		});
		this.tableSelector = tmpTag;
	}
	this.getView = function() {
		this.firstRowLayer();
		this.secondRowLayer();
		this.thirdRowLayer();
		this.upKeyLayer();
		this.downKeyLayer();
		this.leftKeyLayer();
		this.rightKeyLayer();
		this.tableLayer();
		this.moverLayer();
	}
}