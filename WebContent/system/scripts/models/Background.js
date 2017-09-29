system.models.Background = function() {
	this.__proto__ = new Model();
	this.view = new BackgroundView(this);
	this.setIconTableValues = function(iconTableValueArray) {
		this.view.iconTablePaddingLeft = iconTableValueArray["iconTablePaddingLeft"];
		this.view.iconTablePaddingTop = iconTableValueArray["iconTablePaddingTop"];
	}
	this.appendBackgroundView = function() {
		this.view.getView();
		$("section").append(this.view.backgroundSelector);
		this.view.backgroundSelector.append(this.view.tableSelector);
		this.view.backgroundSelector.css("height", (this.view.guiHeight - 40)
				+ "px");
		this.view.tableSelector
				.css("height", (this.view.guiHeight - 40) + "px");
		this.selector = this.view.backgroundSelector;
	}
	this.appendIconTd = function() {
		this.view.iconTableWidth = this.view.tableSelector.width();
		this.view.iconTableHeight = this.view.tableSelector.height();
		var taskbarWidthSize = 0;
		var taskbarHeightSize = 0;
		/*
		 * if(this.taskbarMode == "horizontal"){ taskbarHeightSize =
		 * this.view.taskbarHeight; }else if(this.taskbarMode == "vertical"){
		 * taskbarWidthSize = this.view.taskbarWidth; }
		 */
		tableRowNum = parseInt((this.view.iconTableHeight
				- this.view.taskbarHeight - this.view.iconTablePaddingTop)
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
		this.view.tableTag.html("");
		this.appendIconTd();
		$("." + this.iconTdTagClass).width(this.view.iconTdWidth);
		$("." + this.iconTdTagClass).height(this.view.iconTdHeight);
	}
	this.setIconTdValues = function(iconTdValueArray) {
		this.view.iconTdWidth = iconTdValueArray["iconTdWidth"];
		this.view.iconTdHeight = iconTdValueArray["iconTdHeight"];
		this.view.iconTdBorderWidth = iconTdValueArray["iconTdBorderWidth"];
		this.view.iconTdBorderHeight = iconTdValueArray["iconTdBorderHeight"];
	}
	this.setTaskbarValues = function(taskbarValueArray) {
		this.view.taskbarMode = taskbarValueArray["taskbarMode"];
		this.view.taskbarWidth = taskbarValueArray["taskbarWidth"];
		this.view.taskbarHeight = taskbarValueArray["taskbarHeight"];
	}
}
