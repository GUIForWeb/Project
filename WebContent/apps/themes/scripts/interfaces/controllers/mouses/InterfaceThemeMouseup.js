apps.themes.interfaces.controllers.mouses.InterfaceThemeMouseup = function() {
	this.input = function() {
		var input = this.inputs.filter(function(idx){
			if(this.title == sessionStorage.iThemeTitle)
				return this;
		});
		input.focus();
		this.contentSelector.scrollTop(sessionStorage.iThemeScrollTop);
	}
}