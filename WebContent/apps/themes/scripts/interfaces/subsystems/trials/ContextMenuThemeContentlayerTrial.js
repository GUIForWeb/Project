apps.themes.interfaces.subsystems.trials.ContextMenuThemeContentlayerTrial = function(){
	this.changeLis = function() {
		var lis = this.contentSelector.find("li");
		var iVal = this.va.iVal;
		lis.hover(
			function(){
				lis.css("color",iVal.cmenuCColorHover);
				lis.css("background-color",iVal.cmenuCBgColorHover);
				lis.css("border-radius",iVal.cmenuCBorderRadiusHover+"px");
			},
			function(){
				lis.css("color",iVal.cmenuCColor);
				lis.css("background-color",iVal.cmenuOBgColor);
				lis.css("border-radius",iVal.cmenuOBorderRadius+"px");
			}
		);
		lis.height(iVal.cmenuLHeight);
		lis.css("line-height",iVal.cmenuLHeight+"px");
	}
	this.changeColor = function(event) {
		this.changeLis();
	}
	this.changeColorHover = function(event) {
		this.changeLis();
	}
	this.changeBgColorHover = function(event) {
		this.changeLis();
	}
	this.changeBorderRadiusHover = function(event) {
		this.changeLis();
	}
	this.changeHeight = function(event) {
		this.changeLis();
	}
}