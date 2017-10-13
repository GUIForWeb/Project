apps.themes.icons.subsystems.trials.IconThemeTdTrial = function() {
	this.background = gui.background;
	this.width = function(val){
		this.va["td"]["iconTdWidth"] = parseFloat(val);
		this.tryBackground();
	}
	this.height = function(val){
		this.va["td"]["iconTdHeight"] = parseFloat(val);
		this.tryBackground();
	}
	this.borderWidth = function(val){
		this.va["td"]["iconTdBorderWidth"] = parseFloat(val);
		this.tryBackground();
	}
	this.borderHeight = function(val){
		this.va["td"]["iconTdBorderHeight"] = parseFloat(val);
		this.tryBackground();
	}
	this.tryBackground = function() {
		this.background.disappear();
		this.background.setIconTdValues(this.va["td"]);
		this.background.appear();
		this.tryToAppendIconTd();
		this.va["table"] = this.background.view.tableSelector;
		this.va["tds"] = this.va["table"].children("tr").children("td");
		gui.bgSelector = this.background.selector;
	}
	this.tryToAppendIconTd = function() {
		this.background.view.iconTableWidth = this.background.view.tableSelector.width();
		this.background.view.iconTableHeight = this.background.view.tableSelector.height();
		var tmpTd = null;
		tableRowNum = parseInt((this.background.view.iconTableHeight
				- this.background.view.taskbarOHeight - this.background.view.iconTablePaddingTop)
				/ (this.background.view.iconTdHeight + this.background.view.iconTdBorderHeight));
		tableColNum = parseInt((this.background.view.iconTableWidth - this.background.view.iconTablePaddingLeft)
				/ (this.background.view.iconTdWidth + this.background.view.iconTdBorderWidth));
		for (tri = 0; tri < tableRowNum; tri++) {
			tmpTr = this.background.view.tr();
			for (tdi = 0; tdi < tableColNum; tdi++) {
				tmpTd = this.background.view.td(tdi, tri);
				tmpTd.css("border-width",this.background.view.iconTdBorderHeight+"px "+this.background.view.iconTdBorderWidth+"px");
				tmpTr.append(tmpTd);
			}
			this.background.view.tableSelector.append(tmpTr);
		}
	}
}