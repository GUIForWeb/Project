apps.themes.interfaces.controllers.InterfaceThemeClick = function() {
	this.submit = function() {
		for(ii=0; ii<this.inputs.length; ii++) {
			var title = this.inputs[ii].title;
			if(!isNaN(this.va.iVal[title])) 
				this.va.iVal[title] = this.va.iVal[title].toFixed(1);
			$(this.inputs[ii]).attr("value",this.va.iVal[title]);
		}
		gui.winAndBar.repo.updateContent(this.node.win);
	}
}