apps.fileBrowser.models.FBStatus = function() {
	this.view = new FBStatusView();
	this.view.__proto__ = this;
	this.appendStatus = function() {
		this.view.getView();
		this.footerSelector = this.footer;
		this.footerSelector.find(".fb-status").remove();
		this.footerSelector.append(this.view.statusSelector);
		this.selector = this.view.statusSelector;
		this.tag = this.selector[0];
		if(sessionStorage.wMode !== undefined){
			this.api.set(this.selector).bottom();
		}
	}
	this.infoHtml = function(info) {
		this.view.infoSelector.html(info);
	}
	this.detailHtml = function(info) {
		this.view.detailSelector.html(info);
	}
	this.detailGraph = function(percentage, detail) {
		var tWidth = this.selector.width();
		var iWidth = this.view.infoSelector.width();
		this.view.detailSelector.width(tWidth - iWidth);
		this.view.graph(percentage);
		this.view.graphSelector.html(detail);
	}
}