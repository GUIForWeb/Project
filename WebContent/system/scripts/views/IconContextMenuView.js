guiLib.views.IconContextMenuView = function(iconContextMenuModel) {
	this.__proto__ = iconContextMenuModel;
	this.outerLayerTagClass = "contextMenuOuterLayer";
	this.contentLayerTagClass = "contextMenuContentLayer";
	this.contentPath = "";
	this.contextMenuLayer = function() {
		this.outerSelector.append(this.contentSelector);
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
	this.contentLayer = function() {
		var tmpTag = $("<div></div>");
		var ulTag = $("<ul></ul>");
		var theme = $("<li>Icon</li>");
		var themeUlTag = $("<ul></ul>");
		var window = $("<li>Window</li>");
		var background = $("<li>Background</li>");
		var icon = $("<li>Icon</li>");
		theme.attr("onmouseover", "gui.mouseover.li(this)");
		theme.attr("onmouseout", "gui.mouseout.li(this)");
		window.attr("onclick", "gui.click.theme(this)");
		background.attr("onclick", "gui.click.theme(this)");
		icon.attr("onclick", "gui.click.theme(this)");
		tmpTag.append(ulTag);
		ulTag.append(theme);
		theme.append(themeUlTag);
		themeUlTag.append(window);
		themeUlTag.append(background);
		themeUlTag.append(icon);
		tmpTag.addClass(this.contentLayerTagClass);
		this.contentSelector = tmpTag;
	}
	this.getView = function() {
		this.contentLayer();
		this.outerLayer();
		this.contextMenuLayer();
	}
}