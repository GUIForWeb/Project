	function WindowManagerEngine(){
		this.newWindow = function(obj){
			var newWin  = new Window();
			var zIdx = 0;
			if(this.zIdx == 0)
				zIdx = this.winSize();
			else
				zIdx = parseInt(this.zIdx);
			
			newWin.name = obj.name;
			newWin.guiName = this.guiName;
			newWin.bgTag = this.bgTag;
			newWin.view.zIndex = zIdx;
			newWin.view.setDefaultValues(this.winDefaultValueArray);
			if(obj.contentURL.indexOf("http://") !== -1){
				this.form.submit("wMode",0);
				newWin.content = this.form.getData(obj.contentURL);
				newWin.contentURL = obj.contentURL;
			} 
			else if(obj.contentURL !== undefined){
				this.form.submit("wMode",0);
				var content = this.form.getData(this.contextPath+obj.contentURL);
				if(obj.option !== undefined){
					content = $("<div>"+content+"</div>");
					var html = content.find("#init0Option").html();
					content.find("#init0Option").html("var option = '" + obj.option +"';" + html);
					newWin.content = content.html();
				}
				else{
					newWin.content = content;
				}
				
				newWin.contentURL = obj.contentURL;
			}
			else
				newWin.content = obj.content;
			
			if($("<div>"+newWin.content+"</div>").find(".form").length > 0){
				var form = $("<div>"+newWin.content+"</div>").find(".form").val();
				form = this.form.getData(this.contextPath+form);
				form  = $("<div>"+form+"</div>").find("form");
				var formId = form.first().attr("id");
				if($("#"+formId).length == 0){
					$("#forms").append($(form));
					this.form.submit("form",encodeURIComponent($("#forms").html()));
				}
			}
			
			newWin.init(this.winNum);
			
			if($("<div>"+newWin.content+"</div>").find(".xWin").length > 0){	
				var xWinFunc = $("<div>"+newWin.content+"</div>").find(".xWin").val();
				xWinFunc = this.form.getData(this.contextPath+xWinFunc);
				newWin.addEvent("x",xWinFunc);
			}
			newWin.appendWindow();
			this.windowArray[zIdx] = newWin;
			return newWin;
		}
		
		this.restoreWindow = function(windowMap){
			var winSize = this.winSize();
			var winObj = this.restore(windowMap);
			winObj.appendWindow();
			this.windowArray[winSize] = winObj;
			return winObj;
		}
		this.restoreWindowInBar = function(windowMap){
			var winObj = this.restore(windowMap);
			this.windowInBarArray[winObj.bNumId] = winObj;
		}
		this.restore = function(windowMap){
			var winObj  = new Window();
			winObj.guiName = this.guiName;
			winObj.bgTag = this.bgTag;
			winObj.view.setDefaultValues(this.winDefaultValueArray);
			winObj.restoreModel(windowMap);
			winObj.view.restoreView(windowMap);
			winObj.view.getView();
			if(winObj.numId >= this.winLastNumId){
				this.winLastNumId =  parseInt(winObj.numId) + 1;
			}
			return winObj;
		}
		this.addWindowObj = function(winObj){
			var winSize = this.winSize();
			winObj.view.zIndex = winSize;
			this.windowArray[winSize] = winObj;
			return winObj;
		}
		this.disappear = function(winObj){
			var zIdx = winObj.view.zIndex;
			var winSize = this.winSize();
			for(wi=parseInt(zIdx)+1; wi<winSize; wi++){
				this.windowArray[wi].view.windowTag.css("z-index",wi-1);
				this.windowArray[wi].view.zIndex = wi-1;
				this.windowArray[wi-1] = this.windowArray[wi];
			}
			delete this.windowArray[winSize-1];
			winObj.view.windowTag.remove();
		}
		this.appear = function(winObj){
			var tagId = winObj.tagId;
			var winSize = this.winSize();
			winObj.appendWindow();
			this.windowArray[winSize] = winObj;
		}
		this.winSize = function(){
			return this.windowArray.filter(function( element ) {
				   return element !== undefined;
				}).length;
		}
	}