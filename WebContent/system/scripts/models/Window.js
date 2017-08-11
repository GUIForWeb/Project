	function Window() {
		this.tagIdRule = "window";
		this.numId = 0;
		this.tagId = "";
		this.name = "";
		this.fullScreen = false;
		this.onScreen = true;
		this.view = new WindowView(this);
		this.appendWindow = function(){
			this.view.getView();
			if(this.onScreen)
				this.bgTagArray.append(this.view.windowTagArray);
			this.tag = this.view.windowTagArray[0];
			this.tagArray = this.view.windowTagArray;
		}
		this.init = function(numId){
			this.numId = numId;
			this.tagId = this.tagIdRule + numId;
		}
		this.restoreModel = function(winMap){
			this.fullScreen = (winMap["fullScreen"] == true);
			this.onScreen = (winMap["onScreen"] == true);
			this.name = winMap["name"];
			this.view.content = decodeURIComponent(winMap["content"]);
		}
		this.addEvent = function(status,xFunc){
			if(status == "x"){
				/*
				this.xTrigger = true;
				this.view.xButtonTagArray.click(function() {
					eval(xFunc);
				});
				this.view.xButtonTagArray.attr("onclick",this.guiName+".click.xButton(this)");
				*/
			}
		}
	}
