	function Bar(){
		this.windowOnScreen = false;
		this.wNumId = 0;
		this.name;
		this.guiName = "";
		this.tagIdRule = "bar";
		this.guiId = 0;
		this.numId = 0;
		this.tagId = "";
		this.view = new BarView(this);
		this.appendBar = function(){
			var tagIdForAppend = "";
			this.view.oLeft = this.numId*this.view.oWidth;
			if(this.taskbarTag != null) {
				var tag = this.taskbarTag;
				this.view.oTop = (this.view.taskbarOHeight - this.view.oHeight)/2;
			}
			else {
				this.view.oTop = $(window).height() - this.oHeight;
				var tag = this.bgTag;
			}
			this.view.getView();
			tag.append(this.view.barTag);
			this.tag = this.view.barTag;
		}
		this.init = function(numId){
			this.numId = numId;
			this.tagId = this.tagIdRule + numId;
		}
		this.setName = function(){
			this.view.barTag.html(this.wNumId);
		}
		this.restoreModel = function(barMap){
			this.windowOnScreen = (barMap["windowOnScreen"] == "true");
			this.wNumId = barMap["wNumId"];
			this.name = barMap["name"];
		}
	}