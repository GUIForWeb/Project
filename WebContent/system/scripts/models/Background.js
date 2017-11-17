system.models.Background = function() {
	this.__proto__ = new Model();
	this.view = new BackgroundView(this);
	this.setIconTableValues = function(iconTableValueArray) {
		this.view.iconTablePaddingLeft = iconTableValueArray["iconTablePaddingLeft"];
		this.view.iconTablePaddingTop = iconTableValueArray["iconTablePaddingTop"];
	}
	this.appear = function() {
		this.view.init();
		this.sectionSelector.prepend(this.view.backgroundSelector);
		this.view.backgroundSelector.append(this.view.tableSelector);
		this.view.backgroundSelector.css("height", (this.view.guiHeight - 40)
				+ "px");
		this.view.tableSelector
				.css("height", (this.view.guiHeight - 40) + "px");
		this.selector = this.view.backgroundSelector;
	}
	this.disappear = function() {
		this.selector.remove();
	}
	this.appendIconTd = function() {
		this.view.iconTableWidth = this.view.tableSelector.width();
		this.view.iconTableHeight = this.view.tableSelector.height();
		tableRowNum = parseInt((this.view.iconTableHeight
				- this.view.taskbarOHeight - this.view.iconTablePaddingTop)
				/ (this.view.iconTdHeight + this.view.iconTdBorderHeight));
		tableColNum = parseInt((this.view.iconTableWidth - this.view.iconTablePaddingLeft)
				/ (this.view.iconTdWidth + this.view.iconTdBorderWidth));
		for (tri = 0; tri < tableRowNum; tri++) {
			tmpTr = this.view.tr();
			for (tdi = 0; tdi < tableColNum; tdi++) {
				tmpTr.append(this.view.td(tdi, tri));
			}
			this.view.tableSelector.append(tmpTr);
		}
	}
	this.resizeIconTd = function() {
		this.view.tableSelector.html("");
		this.appendIconTd();
		$("." + this.iconTdTagClass).width(this.view.iconTdWidth);
		$("." + this.iconTdTagClass).height(this.view.iconTdHeight);
	}
	this.setIconTdValues = function(iconTdValueArray) {
		this.view.iconTdWidth = iconTdValueArray["iconTdWidth"];
		this.view.iconTdHeight = iconTdValueArray["iconTdHeight"];
		this.view.iconTdBorderWidth = iconTdValueArray["iconTdBorderWidth"];
		this.view.iconTdBorderHeight = iconTdValueArray["iconTdBorderHeight"];
		this.view.iconTdBorderColor = iconTdValueArray["iconTdBorderColor"];
	}
	this.setTaskbarValues = function(taskbarValueArray) {
		this.view.taskbarOHeight = taskbarValueArray["taskbarOHeight"];
	}
}
