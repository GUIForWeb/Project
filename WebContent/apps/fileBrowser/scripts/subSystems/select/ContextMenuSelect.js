fileBrowser.subsystem.select.ContextMenuSelect = function() {
	this.dataItem = function() {
		this.setScriptTag(event.currentTarget);
		if (this.tag["t"].children[0].innerHTML != "..")
			this.va["isData"] = true;
		else
			this.va["isData"] = false;
		this.contextMenu.isOnTheScreen = true;
		this.contextMenu.appendContextMenu();
	}
}