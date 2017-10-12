apps.fileBrowser.views.FBContextMenuView = function() {
	this.outerLayerSelectorClass = "fbContextMenuOuterLayer";
	this.contentLayerSelectorClass = "fbContextMenuContentLayer";
	this.contentPath = "";
	this.contextMenuLayer = function() {
		this.outerSelector.append(this.contentSelector);
		this.contextMenuSelector = this.outerSelector;
	}
	this.outerLayer = function() {
		var tmpSelector = $("<div></div>");
		tmpSelector.attr("id", "fbContextMenu" + this.id);
		tmpSelector.css("z-index", this.zIndex);
		tmpSelector.css("position", "absolute");
		if (this.isOnTheScreen)
			tmpSelector.offset({
				left : event.clientX - this.bgSelector.offset().left,
				top : event.clientY - this.bgSelector.offset().top
			});
		else
			tmpSelector.offset({
				left : event.clientX,
				top : event.clientY
			});
		tmpSelector.addClass(this.outerLayerSelectorClass);
		this.outerSelector = tmpSelector;
	}
	this.contentLayer = function() {
		var tmpSelector = $("<div></div>");
		var ulSelector = $("<ul></ul>");
		var newFolderSelector = $("<li>New Folder</li>");
		var renameSelector = $("<li>Rename</li>");
		var copySelector = $("<li>Copy</li>");
		var cutSelector = $("<li>Cut</li>");
		var pasteSelector = $("<li>Paste</li>");
		var deleteSelector = $("<li>Delete</li>");
		var downloadSelector = $("<li>Download</li>");
		newFolderSelector.click({
			"id" : this.id
		}, function(event) {
			taskArray["fileBrowser"][event.data.id].click.newFolder(event);
		});
		renameSelector.click({
			"id" : this.id
		}, function(event) {
			taskArray["fileBrowser"][event.data.id].click.rename(event);
		});
		deleteSelector.click({
			"id" : this.id
		}, function(event) {
			taskArray["fileBrowser"][event.data.id].click.del(event);
		});
		downloadSelector.click({
			"id" : this.id
		}, function(event) {
			taskArray["fileBrowser"][event.data.id].click.downlaod(event);
		});
		copySelector.click({
			"id" : this.id
		}, function(event) {
			taskArray["fileBrowser"][event.data.id].click.copy(event);
		});
		cutSelector.click({
			"id" : this.id
		}, function(event) {
			taskArray["fileBrowser"][event.data.id].click.cut(event);
		});
		pasteSelector.click({
			"id" : this.id
		}, function(event) {
			taskArray["fileBrowser"][event.data.id].click.paste(event);
		});
		tmpSelector.append(ulSelector);
		ulSelector.append(newFolderSelector);
		ulSelector.append(renameSelector);
		ulSelector.append(copySelector);
		ulSelector.append(cutSelector);
		ulSelector.append(pasteSelector);
		ulSelector.append(deleteSelector);
		ulSelector.append(downloadSelector);
		tmpSelector.addClass(this.contentLayerSelectorClass);
		this.contentSelector = tmpSelector;
	}
	this.getView = function() {
		this.contentLayer();
		this.outerLayer();
		this.contextMenuLayer();
	}
}
