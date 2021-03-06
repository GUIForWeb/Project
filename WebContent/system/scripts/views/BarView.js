system.views.BarView = function(BarModel) {
	this.__proto__ = BarModel;
	this.position = 0;
	this.outerLayerTagClass = "barOuterLayer";
	this.nameLayerTagClass = "barNameLayer";
	this.setDefaultValues = function(defaultValueArray) {
		this.oWidth = defaultValueArray.oWidth;
		this.oHeight = defaultValueArray.oHeight;
		this.oBorderWidth = defaultValueArray.oBorderWidth;
		this.nLeft = this.oBorderWidth;
		this.nTop = this.oBorderWidth;
		this.nWidth = this.oWidth - this.oBorderWidth*2;
		this.nHeight = this.oHeight - this.oBorderWidth*2;
	}
	this.setPosition = function(position) {
		this.position = position;
		this.setOLeft((this.position) * this.oWidth);
	}
	this.setOLeft = function(value) {
		this.oLeft = value;
		this.outerSelector.css("left", value);
	}
	this.barLayer = function() {
		this.outerSelector.append(this.nameSelector);
		this.barSelector = this.outerSelector;
	}
	this.outerLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.attr("id", this.tagId);
		tmpS.css("position", "absolute");
		tmpS.addClass(this.outerLayerTagClass);
		tmpS.width(this.oWidth);
		tmpS.height(this.oHeight);
		tmpS.offset({
			left : this.oLeft,
			top : this.oTop
		});
		this.outerSelector = tmpS;
	}
	this.nameLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.html(this.name);
		tmpS.css("position", "absolute");
		tmpS.css("overflow", "hidden");
		tmpS.addClass(this.nameLayerTagClass);
		tmpS.width(this.nWidth);
		tmpS.height(this.nHeight);
		tmpS.offset({
			left : this.nLeft,
			top : this.nTop
		});
		tmpS.click(function(evnet) {
			gui.winAndBar.click.bar(event);
		});
		this.nameSelector = tmpS;
	}
	this.init = function() {
		this.nameLayer();
		this.outerLayer();
		this.barLayer();
	}
}