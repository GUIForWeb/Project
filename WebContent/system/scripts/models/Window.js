	function Window() {
		this.tagIdRule = "window";
		this.numId = 0;
		this.tagId = "";
		this.name = "";
		this.fullScreen = false;
		this.bNumId = 0;
		this.view = new WindowView(this);
		this.appendWindow = function(){
			if(this.view.windowTag === undefined)
				this.view.getView();
			$(this.tag).css("z-index",this.view.zIndex);
			this.bgTag.append(this.view.windowTag);
			this.tag = this.view.windowTag;
		}
		this.init = function(numId){
			this.numId = numId;
			this.tagId = this.tagIdRule + numId;
			this.view.getView();
		}
		this.restoreModel = function(windowMap){
			this.bNumId = windowMap["bNumId"];
			this.fullScreen = (windowMap["fullScreen"] == "true");
			this.name = windowMap["name"];
			this.numId = parseInt(windowMap["numId"]);
			this.tagId = windowMap["tagId"];
			this.view.content = decodeURIComponent(windowMap["content"]);
		}
		this.addEvent = function(status,xFunc){
			if(status == "x"){
				this.xTrigger = true;
				this.view.xButtonTag.click(function() {
					eval(xFunc);
				});
				this.view.xButtonTag.attr("onclick",this.guiName+".click.xButton(this)");
			}
		}
	}
