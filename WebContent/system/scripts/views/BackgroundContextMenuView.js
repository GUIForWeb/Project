system.views.BackgroundContextMenuView = function(backgroundContextMenuView) {
	this.__proto__ = backgroundContextMenuView;
	this.outerLayerTagClass = "contextMenuOuterLayer";
	this.contentLayerTagClass = "contextMenuContentLayer";
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
		var theme = $("<li>Theme</li>");
		var themeUlTag = $("<ul></ul>");
		var window = $("<li>Window</li>");
		var background = $("<li>Background</li>");
		var icon = $("<li>Icon</li>");
		theme.mouseover(function(){
			gui.desktop.mouse.over.li(this)
		});
		theme.mouseout(function(){
			gui.desktop.mouse.out.li(this)
		});
		window.click(function(){
			gui.winAndBar.click.theme(event)
		});
		background.click(function(){
			gui.winAndBar.click.theme(event)
		});
		icon.click(function(){
			gui.winAndBar.click.theme(event)
		});
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