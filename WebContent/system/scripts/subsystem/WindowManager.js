	function WindowManager(){
		this.remove = function(winAndBarNode){
			
			winAndBarNode.win.tag.remove();
		}
		this.disappear = function(winAndBarNode){
			winAndBarNode.win.view.isOnScreen = false;
			winAndBarNode.win.tag.remove();
		}
		this.appear = function(winAndBarNode){
			winAndBarNode.win.view.isOnScreen = true;
			winAndBarNode.win.appendWindow();
		}
		this.append = function(iconObj,winAndBarNode){
			var zIndex = this.nodeArray["winAndBar"].winCount;
			var tmpNode = this.ee.addNewWinAndBarNode(winAndBarNode);
			this.winArray[zIndex] = tmpNode;
			tmpNode.win = new Window();
			tmpNode.win.name = iconObj.name;
			tmpNode.win.guiName = this.guiName;
			tmpNode.win.bgTagArray = this.bgTagArray;
			tmpNode.win.view.setDefaultValues(this.winDefaultValueArray);
			tmpNode.win.view.zIndex = zIndex;
			tmpNode.win.content = this.form.getData(this.contextPath+iconObj.contentURL);
			tmpNode.win.init(this.valueArray["newId"]);
			tmpNode.win.appendWindow();
			
			this.nodeArray["winAndBar"].lastWin = tmpNode;
			if($("<div>"+tmpNode.win.content+"</div>").find(".xWin").length > 0){	
				var xWinFunc = $("<div>"+tmpNode.win.content+"</div>").find(".xWin").val();
				xWinFunc = this.form.getData(this.contextPath+xWinFunc);
				tmpNode.win.addEvent("x",xWinFunc);
			}
			this.nodeArray["winAndBar"].winCount += 1;
			return tmpNode;
			
			/*
			var node = this.nodeArray["winAndBar"];
			while(node.next instanceof Node){
				node = node.next;
			}
			node.nextWin = new Node();
			node.nextWin.prevWin = node;
			node = node.nextWin;
			node.win = new Window();
			node.win.name = obj.name;
			node.win.guiName = this.guiName;
			node.win.bgTagArray = this.bgTagArray;
			node.win.view.setDefaultValues(this.winDefaultValueArray);
			this.nodeArray["winAndBar"].count += 1;
			var winCount = this.nodeArray["winAndBar"].winCount;
			node.win.view.zIndex = winCount;
			this.winNum += 1;
			node.win.init(this.winNum);
			node.win.appendWindow();
			this.nodeArray["winAndBar"].lastWin = node;
			return node;
			*/ 
			/*
			var winNode = this.nodeArray["win"];
			while(winNode.next instanceof WinNode){
				winNode = winNode.next;
			}
			winNode.next = new WinNode();
			winNode.next.prev = winNode;
			winNode = winNode.next;
			winNode.win = new Window();
			winNode.win.name = obj.name;
			winNode.win.guiName = this.guiName;
			winNode.win.bgTagArray = this.bgTagArray;
			winNode.win.view.setDefaultValues(this.winDefaultValueArray);
			this.nodeArray["win"].count += 1;
			var count = this.nodeArray["win"].count;
			winNode.win.view.zIndex = count;
			this.winNum += 1;
			if(obj.contentURL.indexOf("http://") !== -1){
				this.form.submit("wMode",0);
				winNode.win.content = this.form.getData(obj.contentURL);
				winNode.win.contentURL = obj.contentURL;
			} 
			else if(obj.contentURL !== undefined){
				this.form.submit("wMode",0);
				var content = this.form.getData(this.contextPath+obj.contentURL);
				if(obj.option !== undefined){
					content = $("<div>"+content+"</div>");
					var html = content.find("#init0Option").html();
					content.find("#init0Option").html("var option = '" + obj.option +"';" + html);
					winNode.win.content = content.html();
				}
				else{
					winNode.win.content = content;
				}
				
				winNode.win.contentURL = obj.contentURL;
			}
			else
				winNode.win.content = obj.content;
			
			if($("<div>"+winNode.win.content+"</div>").find(".form").length > 0){
				var form = $("<div>"+winNode.win.content+"</div>").find(".form").val();
				form = this.form.getData(this.contextPath+form);
				form  = $("<div>"+form+"</div>").find("form");
				var formId = form.first().attr("id");
				if($("#"+formId).length == 0){
					$("#forms").append($(form));
					this.form.submit("form",encodeURIComponent($("#forms").html()));
				}
			}
			
			if($("<div>"+winNode.win.content+"</div>").find(".xWin").length > 0){	
				var xWinFunc = $("<div>"+winNode.win.content+"</div>").find(".xWin").val();
				xWinFunc = this.form.getData(this.contextPath+xWinFunc);
				winNode.win.addEvent("x",xWinFunc);
			}
			winNode.win.init(this.winNum);
			winNode.win.appendWindow();
			this.nodeArray["win"].end = winNode;
			return winNode; 
			*/
			/*
			var newWin  = new Window();
			var zIdx = 0;newWin
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
			*/
		}
		
		this.winSize = function(){
			return this.windowArray.filter(function( element ) {
				   return element !== undefined;
				}).length;
		}
	}