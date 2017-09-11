	function Window() {
		this.tagIdRule = "window";
		this.numId = 0;
		this.tagId = "";
		this.name = "";
		this.view = new WindowView(this);
		this.appendWindow = function(){
			this.view.getView();
			if(this.view.isOnScreen)
				this.bgSelector.append(this.view.windowSelector);
			this.tag = this.view.windowSelector[0];
			this.selector = this.view.windowSelector;
		}
		this.init = function(numId){
			this.numId = numId;
			this.tagId = this.tagIdRule + numId;
		}
		this.restoreModel = function(winMap){
			this.view.isFullScreen = (winMap["isFullScreen"] == true);
			this.view.isOnScreen = (winMap["isOnScreen"] == true);
			this.name = winMap["name"];
			this.view.content = decodeURIComponent(winMap["content"]);
		}
		this.addEvent = function(status,data){
			func = data.func
			delete data.func;
			if(status == "x"){
				this.view.xButtonSelector.click(data,function(event){
					eval(func);
				});
				//xBOfwindow0
				/*
				this.xTrigger = true;
				this.view.xButtonSelector.click(function() {
					eval(xFunc);
				});
				this.view.xButtonSelector.attr("onclick",this.guiName+".click.xButton(this)");
				*/
			}
		}
	}
