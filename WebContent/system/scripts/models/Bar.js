	function Bar(){
		this.name;
		this.guiName = "";
		this.tagIdRule = "bar";
		this.guiId = 0;
		this.numId = 0;
		this.tagId = "";
		this.winId = "";
		this.view = new BarView(this);
		this.appendBar = function(){
			var tagIdForAppend = "";
			this.view.oLeft = (this.view.position)*this.view.oWidth;
			this.view.oTop = (this.view.taskbarOHeight - this.view.oHeight)/2;
			this.view.getView();
			this.taskbarTagArray.append(this.view.barTagArray);
			this.tag = this.view.barTagArray[0];
			this.tagArray = this.view.barTagArray;
		}
		this.init = function(numId,position){
			this.view.position = position;
			this.numId = numId;
			this.tagId = this.tagIdRule + this.numId;
		}
		this.setName = function(){
			this.view.barTag.html(this.wNumId);
		}
		this.restoreModel = function(barMap){
			this.name = barMap["name"];
		}
	}