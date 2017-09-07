function FileBrowser(id){
	this.ws = function(){}
	this.id = id;
	this.setJSON = function(data) {
		this.data = data;
	}
	this.init = function() {
		this.controller = new Controller();
		this.controller.__proto__ = this;
		this.dblclick = new DblClick();
		this.dblclick.__proto__ = this.controller;
		this.click = new Click();
		this.click.__proto__ = this.controller;
		this.dragstart = new Dragstart();
		this.dragstart.__proto__ = this.controller;
		this.drag = new Drag();
		this.drag.__proto__ = this.controller;
		this.drop = new Drop();
		this.drop.__proto__ = this.controller;
		this.dragend = new Dragend(); 
		this.dragend.__proto__ = this.controller;
		this.dragover = new Dragover(); 
		this.dragover.__proto__ = this.controller;
		this.ds = new DragSelect();
		this.ds.__proto__ = this.controller;
		this.fbm = new FBManager();
		this.fbm.__proto__ = this.controller;
		this.fs = new FileWebSocket("192.168.56.103:8081");
		this.fs.__proto__ = this.controller;
		this.focusout = new Focusout();
		this.focusout.__proto__ = this.controller;
		this.keydown = new Keydown();
		this.keydown.__proto__ = this.controller;
		this.mouseover = new Mouseover();
		this.mouseover.__proto__ = this.controller;
		this.mouseout = new Mouseout();
		this.mouseout.__proto__ = this.controller;
		/*
		this.fbm.send = new FBSender();
		this.fbm.send.__proto__ = this.controller;
		this.fbm.receive = new FBReceiver();
		this.fbm.receive.__proto__ = this.controller;
		*/
		this.window = $("#fbTable"+this.id).parent().parent();
		this.cOfWindow = $("#fbTable"+this.id).parent();
		this.fbTable = $("#fbTable"+this.id);
		this.contextMenu = new FileBrowserContextMenu(this);
		this.x = this.window.children("#hOfwindow"+this.id).children("#xBOfwindow"+this.id);
	}
	this.appendFunction = function(){
		this.x.click({"id":this.id},function(event){
			taskArray['fileBrowser'][event.data.id].click.x(event);
		});
		this.cOfWindow.click({"id":this.id},function(event){
			taskArray['fileBrowser'][event.data.id].click.eButton(event);
		});
		this.fbTable.on("dragover",{"id":this.id},function(event){
			taskArray['fileBrowser'][event.data.id].drag.over.fileItem(event);
		});
		this.fbTable.on("drop",{"id":this.id},function(event){
			taskArray['fileBrowser'][event.data.id].drag.drop.fileItem(event);
		});
		var tr = this.fbTable.find("tr"); 
		tr.dblclick({"id":this.id},function(event){
			taskArray['fileBrowser'][event.data.id].dblclick.row(event);
		});
		tr.contextmenu({"id":this.id},function(event){
			taskArray['fileBrowser'][event.data.id].click.cButton(event);
		});
		tr.mouseover({"id":this.id},function(event){
			taskArray['fileBrowser'][event.data.id].mouseover.row(event);
		});
		tr.mouseout({"id":this.id},function(event){
			taskArray['fileBrowser'][event.data.id].mouseout.row(event);
		});
		tr.on("dragstart",{"id":this.id},function(event){
			taskArray['fileBrowser'][event.data.id].drag.start.fileItem(event)
		});
		
		tr.attr("draggable","true");
		
		
		this.fbTable.parent().attr("ondragstart","taskArray['fileBrowser']['"+this.id+"'].drag.start.selection(this,event)");
		this.fbTable.parent().attr("ondrag","taskArray['fileBrowser']['"+this.id+"'].drag.ing.selection(this,event)");
		this.fbTable.parent().attr("ondragend","taskArray['fileBrowser']['"+this.id+"'].drag.end.selection()");
		$(this.fbTable.find("tr")[0]).dblclick(null);
	}
	this.displayHead = function() {
		this.fbTable.html("");
		var tmpTr = $("<tr></tr>");
		tmpTr.addClass("fb-table-header");
		var tmpTd0 = $("<th>Name</th>");
		var tmpTd1 = $("<th>Date</th>");
		var tmpTd2 = $("<th>Type</th>");
		var tmpTd3 = $("<th>Size</th>");
		tmpTr.append(tmpTd0);
		tmpTr.append(tmpTd1);
		tmpTr.append(tmpTd2);
		tmpTr.append(tmpTd3);
		this.fbTable.append(tmpTr);
		tmpTr = $("<tr></tr>");
		tmpTr.addClass("fb-table-row");
		tmpTd0 = $("<td>..</td>");
		tmpTd1 = $("<td></td>");
		tmpTd2 = $("<td></td>");
		tmpTd3 = $("<td></td>");
		tmpTr.append(tmpTd0);
		tmpTr.append(tmpTd1);
		tmpTr.append(tmpTd2);
		tmpTr.append(tmpTd3);
		this.fbTable.append(tmpTr);
	}
	this.displayData = function() {
		for(i=0; i<this.data.length; i++) {
			var tmpTr = $("<tr></tr>");
			tmpTr.addClass("fb-table-row");
			tmpTr.addClass("fileItem");
			var tmpTd0 = $("<td>"+this.data[i]["name"]+"</td>");
			var tmpTd1 = $("<td>"+this.data[i]["dateModified"]+"</td>");
			var tmpTd2 = $("<td>"+this.data[i]["type"]+"</td>");
			var tmpTd3 = $("<td>"+this.data[i]["size"]+"</td>");
			tmpTr.append(tmpTd0);
			tmpTr.append(tmpTd1);
			tmpTr.append(tmpTd2);
			tmpTr.append(tmpTd3);
			this.fbTable.append(tmpTr);
		}
	}
	
	this.display = function() {
		this.displayHead();
		this.displayData();
		
		//this.window = $("#fbTable"+this.id).parent().parent();
		/*
		 * this.ws = new WebSocket("ws://10.0.2.15:8080/WebGUI/fbc");
		this.contextMenu = new FileBrowserContextMenu(this);
		this.controller = new Controller();
		this.mouseover = new Mouseover();
		
		this.dragenter = new Dragenter();
		this.dragover = new Dragover();
		this.dragleave = new Dragleave();
		
		this.drop = new Drop();
		
		this.click = new Click();
		this.click.__proto__ = this.controller;
		
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
		
		
		this.dblclick.__proto__ = this.controller;
	
		this.window = $("#fbTable"+this.id).parent().parent();
		this.cOfWindow = $("#fbTable"+this.id).parent();
		*/
	}
	/*
	 *
	
	
	 
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
	*/
}

