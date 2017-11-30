apps.themes.interfaces.subsystems.trials.TaskbarMenuThemeListLayerTrial = function(){
	this.changeLis = function() {
		var lis = this.listSelector.find("li");
		var iVal = this.va.iVal;
		lis.hover(
			function(){
				lis.css("color",iVal.tmenuLColorHover);
				lis.css("background-color",iVal.tmenuLBgColorHover);
				lis.css("border-radius",iVal.tmenuLBorderRadiusHover+"px");
			},
			function(){
				lis.css("color",iVal.tmenuLColor);
				lis.css("background-color",iVal.tmenuOBgColor);
			}
		);
		lis.height(iVal.tmenuLHeight);
		lis.css("line-height",iVal.tmenuLHeight+"px");
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