system.views.IconContextMenuView = function(iconContextMenuModel) {
	this.__proto__ = iconContextMenuModel;
	this.outerLayerTagClass = "contextMenuOuterLayer";
	this.menuLayerTagClass = "contextMenuLayer";
	this.contentPath = "";
	this.contextMenuLayer = function() {
		this.outerSelector.append(this.menuSelector);
		this.contextMenuSelector = this.outerSelector;
	}
	this.outerLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag = tmpTag.attr("id", this.tagId);
		tmpTag.css("z-index", this.zIndex);
		tmpTag.css("position", "absolute");
		tmpTag.offset({
			left : event.clientX,
			top : event.clientY
		});
		tmpTag.addClass(this.outerLayerTagClass);
		this.outerSelector = tmpTag;
	}
	this.menuLayer = function() {
		var tmpSelector = $("<div></div>");
		var ulSelector = $("<ul></ul>");
		var renameSelector = $("<li>Rename</li>");
		var copySelector = $("<li>Copy</li>");
		var cutSelector = $("<li>Cut</li>");
		var pasteSelector = $("<li>Paste</li>");
		var deleteSelector = $("<li>Delete</li>");
		var downloadSelector = $("<li>Download</li>");
		
		renameSelector.click(function(event){
			gui.desktop.click.rename(event);
		});
		copySelector.click(function(){
			gui.desktop.click.copy(event);
		});
		cutSelector.click(function(){
			gui.desktop.click.cut(event);
		});
		pasteSelector.click(function(){
			gui.desktop.click.paste(event);
		});
		deleteSelector.click(function(){
			gui.desktop.click.del(event);
		});
		downloadSelector.click(function(){
			gui.desktop.click.download(event);
		});
		tmpSelector.append(ulSelector);
		ulSelector.append(renameSelector);
		ulSelector.append(copySelector);
		ulSelector.append(cutSelector);
		ulSelector.append(pasteSelector);
		ulSelector.append(deleteSelector);
		ulSelector.append(downloadSelector);
		tmpSelector.addClass(this.menuLayerTagClass);
		this.menuSelector = tmpSelector;
	}
	this.init = function() {
		this.menuLayer();
		this.outerLayer();
		this.contextMenuLayer();
	}
}