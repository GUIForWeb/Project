function FileBrowser(id){
	this.id = id;
	this.start = function(){
		this.controller = new Controller();
		this.mouseover = new Mouseover();
		this.dragstart = new Dragstart();
		this.dragenter = new Dragenter();
		this.dragover = new Dragover();
		this.dragleave = new Dragleave();
		this.drag = new Drag();
		this.drop = new Drop();
		this.dragend = new Dragend(); 
		this.click = new Click();
		this.focusout = new Focusout();
		this.keydown = new Keydown();
		this.ds = new DragSelect();
		this.dblclick = new DblClick();
		this.controller.__proto__ = this;
		this.dragover.__proto__ = this.controller;
		this.mouseover.__proto__ = this.controller;
		this.dragenter.__proto__ = this.controller;
		this.dragleave.__proto__ = this.controller;
		this.dragstart.__proto__ = this.controller;
		this.drag.__proto__ = this.controller;
		this.drop.__proto__ = this.controller;
		this.dragend.__proto__ = this.controller;
		this.click.__proto__ = this.controller;
		this.focusout.__proto__ = this.controller;
		this.keydown.__proto__ = this.controller;
		this.dblclick.__proto__ = this.controller;
		this.ds.__proto__ = this.controller;
		this.window = $("#fbTable"+this.id).parent().parent();
		this.cOfWindow = $("#fbTable"+this.id).parent();
	}
	this.contextMenu = new FileBrowserContextMenu(this);
	this.displayData = function(fileItemList){
		//$("#fbTable"+this.id).parent().attr("onclick","system['fileBrowser']['"+this.id+"'].click.eButton(this)");
		$("#fbTable"+this.id).parent().click({id:this.id},function(event) {
			system['fileBrowser'][event.data.id].click.eButton(this);
		});
		$("#fbTable"+this.id).attr("ondragover","system['fileBrowser']['"+this.id+"'].dragover.fileItem(event)");
		$("#fbTable"+this.id).attr("ondrop","system['fileBrowser']['"+this.id+"'].drop.fileItem(this,event)");
		$("#fbTable"+this.id).children("tbody").empty();
		//var tr = $("<tr></tr>").attr("onclick","system['fileBrowser']['"+this.id+"'].click.eButton(this)").html("<td>.</td><td></td><td></td><td></td>");
		//$("#fbTable"+this.id).append(tr);
		var tr = $("<tr></tr>").attr("ondblclick","system['fileBrowser']['"+this.id+"'].dblclick.eButton(this)")
		tr.attr("oncontextmenu","system['fileBrowser']['"+this.id+"'].click.cButton(this)");
		tr.html("<td>..</td><td></td><td></td><td></td>")
		$("#fbTable"+this.id).append(tr);
		for(fi=0; fi<fileItemList.length; fi++) {
			var fileItem = fileItemList[fi];
			tr = $("<tr></tr>");
			
			if(fileItem["type"] == "directory")
				tr.attr("ondblclick","system['fileBrowser']['"+this.id+"'].dblclick.eButton(this)");
			this.optionFB(fileItem,tr,this);
			tr.attr("class","fileItem");
			tr.attr("draggable","true");
			tr.attr("ondragstart","system['fileBrowser']['"+this.id+"'].dragstart.fileItem(this,event)");
			tr.attr("oncontextmenu","system['fileBrowser']['"+this.id+"'].click.cButton(this)");
			
			td0 = $("<td>"+fileItem["name"]+"</td>");
			td1 = $("<td>"+fileItem["dateModified"]+"</td>");
			td2 = $("<td>"+fileItem["type"]+"</td>");
			td3 = $("<td>"+fileItem["size"]+"</td>");
			tr.append(td0);
			tr.append(td1);
			tr.append(td2);
			tr.append(td3);
			$("#fbTable"+this.id).append(tr);
		}
		
		if(!$("#forms").length)
			$("#fbTable"+this.id).parent().height($(window).height())
		$("#fbTable"+this.id).parent().attr("draggable","true");
		$("#fbTable"+this.id).parent().attr("ondragstart","system['fileBrowser']['"+this.id+"'].dragstart.selection(this,event)");
		$("#fbTable"+this.id).parent().attr("ondrag","system['fileBrowser']['"+this.id+"'].drag.selection(this,event)");
		$("#fbTable"+this.id).parent().attr("ondragend","system['fileBrowser']['"+this.id+"'].dragend.selection()");
	}
	this.optionFB = function(fileItem,tr,fb){
		if(this.option !== undefined)
			eval(this.gui.form.getData(this.gui.contextPath+this.option));
	}
	this.javaListToJSMap = function (javaList){
		javaList = javaList.split("), ");
		var jsList = [];
		
		if(javaList[0] != "[]" && javaList[0] != "null")
		{	
			for(li=0; li<javaList.length; li++){
				var fSplit = [];
				javaList[li] = javaList[li].replace("[(", "");
				javaList[li] = javaList[li].replace(")]", "");
				if(javaList[li].charAt(0) == "(")
					javaList[li] = javaList[li].replace("(", "");
				fSplit = javaList[li].split(", ");
				tmpArr = [];
				for(si=0; si<fSplit.length; si++){
					tmpVal = [];
					tmpVal = fSplit[si].split("=");
					tmpArr[tmpVal[0]] = tmpVal[1];
				}
				jsList[li]=tmpArr;
			}
		}
		return jsList;
	}
	this.changeView = function(data){
		
		if(data.status == "success") {
			var form = $("#fileBrowserForm0");
			var span = $(form[0]).children("span");
			var id = span[0].innerHTML;
			span[0].innerHTML = "";
			
			if(id == ""){
				form = $("#fileBrowserForm1");
				span = $(form[0]).children("span");
				id = span[0].innerHTML;
			}
			
			var fileItemList = span[1].innerHTML;
			span[1].innerHTML = "";
			
			if(fileItemList == "removeFb"){
				delete system["fileBrowser"][id];
			}
			else if(fileItemList == "removeForm"){
				delete system["fileBrowser"][id];
				$("#fileBrowserForm0").remove();
				$("#fileBrowserForm1").remove();
				$("#fileBrowserForm2").remove();
				delete system["fileBrowser"];
			}
			else if(fileItemList != "") {
				fileItemList = system["fileBrowser"][id].javaListToJSMap(fileItemList);
				system["fileBrowser"][id].displayData(fileItemList);
				if(system["fileBrowser"][id].gui !== undefined){
					var zIdx = system["fileBrowser"][id].window.css("zIndex");
					var winObj = system["fileBrowser"][id].gui.windowArray[zIdx];
					system["fileBrowser"][id].gui.windowListener.call("content",winObj);
				}
			}
			if(span.length == 3){
				var update = span[2].innerHTML;
				span[2].innerHTML = "";
				if(update != ""){
					var input = $(form[0]).children("input");
					input[1].value = "update";
					input[2].value = update;
					input[3].click();
				}
			}
		}
	}
	this.getData = function(address){
		var xhr =  new XMLHttpRequest();
		xhr.open("POST", address, false);
		xhr.send();
		return xhr.responseText;
	}
	this.size = function(){
		return system["fileBrowser"].filter(function( element ) {
			   return element !== undefined;
			}).length;
	}
	this.submit = function(status,param){
		var form = $("#fileBrowserForm0");
		var input = $(form[0]).children("input");
		input[1].value = status;
		input[2].value = param;
		input[3].click();
	}
	this.submitForDl = function(status,param){
		var form = $("#fileBrowserForm2");
		var input = $(form[0]).children("input");
		input[1].value = status;
		input[2].value = param;
		input[3].click();
	}
	this.close = function(){
		var zIdx = $("#fbTable"+this.id).parent().parent().css("z-index");
		var winObj = this.gui.windowArray[zIdx];
		this.gui.wme.disappear(winObj);
		this.gui.wpe.disappearPositioning(winObj);
		var barObj = this.gui.bme.disappear(winObj);
		this.gui.barListener.call("x",barObj);
		if(this.gui.eventListener.xTrigger){
			this.gui.eventListener.callEvent();
		}
	}
}

