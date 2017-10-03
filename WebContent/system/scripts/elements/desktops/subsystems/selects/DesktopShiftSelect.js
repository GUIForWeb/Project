system.elements.desktops.subsystems.selects.DesktopShiftSelect = function() {
	this.isOnGoing = false;
	this.isWorking = false;
	this.rIdx0 = null;
	this.rIdx1 = null;
	this.icon = function(event){
		this.setScriptTag(event.target.parentNode);
		var rowTag = this.tag["t"].parentNode.parentNode;
		var rIdx = rowTag.rowIndex;
		var data = null;
		if(this.va["selectedIcon"] != null){
			var icon = this.va["selectedIcon"];
			this.tagId0 = icon.prop("id");
			this.tagId1 = this.tag["s"].prop("id");
			this.rIdx0 = icon[0].parentNode.parentNode.rowIndex;
			this.rIdx1 = rIdx;
			this.init();
			this.widing();
		}
		else if(this.rIdx0 === null) {
			this.rIdx0 = rIdx;
			this.tagId0 = this.tag["s"].prop("id");
			this.init();
		}
		else if(this.rIdx0 != this.rIdx1){
			this.rIdx1 = rIdx;
			this.tagId1 = this.tag["s"].prop("id");
			this.widing();
		}
	}
	this.init = function(){
		data = this.iconArray[this.tagId0];
		data.isChosen= true;
		data.isChangeable= false;
		this.tag["s"].css("background-color", "dimgray");
		this.tag["s"].css("opacity", "1");
		this.isOnGoing = true;
		this.isWorking = true;
	}
	this.widing = function(){
		var isSwiched = false;
		var isStarted = false;
		var trs = this.background.view.tableSelector.find("tr");
		var tds = null;
		if(this.rIdx0 > this.rIdx1) {
			var tmp = this.rIdx0;
			this.rIdx0 = this.rIdx1;
			this.rIdx1 = tmp;
			tmp = this.tagId0;
			this.tagId0 = this.tagId1;
			this.tagId1 = tmp;
			isSwiched = true;
		}
		for(ti = this.rIdx0; ti <= this.rIdx1; ti++){
			console.log(ti);
			tds = $(trs[ti]).find("td");
			if(ti == this.rIdx0){
				var td = null;
				for(di=0; di<tds.length; di++){
					td = $(tds[di]);
					if(td.children().length && td.children().prop("id") == this.tagId0) {
						isStarted = true;
					}
					if(td.children().length){
						var data = this.iconArray[td.children().prop("id")].json;
						if(isStarted) {
							this.selectData(data,true);
							this.hover(true,td.children());
						}
						else {
							this.selectData(data,false);
							this.hover(false,td.children());
						}
					}
				}
			}
			else if(ti == this.rIdx1){
				var td = null;
				for(di=0; di<tds.length; di++){
					td = $(tds[di]);
					if(td.children().length){
						var data = this.iconArray[td.children().prop("id")].json;
						if(isStarted) {
							this.selectData(data,true);
							this.hover(true,td.children());
						}
						else {
							this.selectData(data,false);
							this.hover(false,td.children());
						}
					}
					if(td.children().length && td.children().prop("id") == this.tagId1) {
						isStarted = false;
					}
				}
			}
			else {
				for(di=0; di<tds.length; di++){
					td = $(tds[di]);
					if(td.children().length){
						var data = this.iconArray[td.children().prop("id")].json;
						if(isStarted) {
							this.selectData(data,true);
							this.hover(true,td.children());
						}
						else {
							this.selectData(data,false);
							this.hover(false,td.children());
						}
					}
				}
			}
			/*
			if(ti >= this.rIdx0 && ti<= this.rIdx1) {
				data = this.va["data"][ti-2];
				data.isChosen= true;
				data.isChangeable= false;
				$(trs[ti]).css("background-color", "dimgray");
			}
			else {
				data = this.va["data"][ti-2];
				data.isChosen= false;
				data.isChangeable= true;
				$(trs[ti]).css("background-color", "white");
			}
			*/
		}
		if(isSwiched) {
			this.rIdx0 = this.rIdx1;
			this.rIdx1 = null;
			this.tagId0 = this.tagId1;
			this.tagId1 = null;
		}
		this.isOnGoing = false;
	}
	this.cancle = function(){
		this.shift.isWorking = false;
		this.shift.rIdx0 = null;
		this.shift.rIdx1 = null;
	}
}