	function Taskbar(){
		this.__proto__ = new Model;
		this.guiName = "";
		this.tagIdRule = "taskbar";
		this.guiId = 0;
		this.numId = 0;
		this.tagId = "taskbar";
		this.view = new TaskbarView(this);
		this.appendTaskbar = function(){
			this.view.getView();
			this.bgTagArray.append(this.view.taskbarTagArray);
		}
		this.init = function(numId){
			this.numId = numId;
			this.tagId = this.tagIdRule + numId;
			this.zIndex = numId;
		}
	}