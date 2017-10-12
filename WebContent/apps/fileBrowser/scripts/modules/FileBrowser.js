apps.fileBrowser.modules.FileBrowser = function(id){
	this.ws = function(){}
	this.id = id;
	this.funcArray = [];
	this.setJSONArray = function(data) {
		this.controller.va["data"] = data;
	}
	this.initForWMode = function() {
		this.api = new API();
		this.winInfo = gui.getWinInfo(this.section)
		this.cOfWindow = this.winInfo.content;
		//this.window = winInfo.window;
		//this.winId = winInfo.id;
		//this.x = winInfo.x;
		//this.m = winInfo.m;
		var path = this.path;
		this.winInfo.m.bind("dragstart",function(event){
			var url = event.originalEvent.dataTransfer.getData("text/uri-list");
			url += "?path="+encodeURIComponent(path.val());
			if(event.originalEvent.dataTransfer !== undefined){
				event.originalEvent.dataTransfer.setData("text/uri-list", url);
			}
			else if(event.dataTransfer !== undefined)
				event.dataTransfer.setData("text/uri-list", url);
		});
	}
	this.appendFunctionForWMode = function() {
		var id = this.id;
	}
	this.init = function() {
		this.controller = new FBController();
		this.controller.__proto__ = this;
		this.dblclick = new FBDblClick();
		this.dblclick.__proto__ = this.controller;
		this.click = new FBClick();
		this.click.__proto__ = this.controller;
		this.contextmenu = new controllers.FBContextMenu();
		this.contextmenu.__proto__ = this.controller;	
		this.drag = new FBDrag();
		this.drag.__proto__ = this.controller;
		this.mouse = new FBMouse();
		this.mouse.__proto__ = this.controller;
		this.focus = new FBFocus();
		this.focus.__proto__ = this.controller;
		this.key = new FBKey();
		this.key.__proto__ = this.controller;
		
		this.select = new FBSelect();
		this.select.__proto__ = this.controller;
		this.fbws = new FBWebSocket();
		this.fbws.__proto__ = this.controller;
		
		this.section = $("#fbTable"+this.id).parent();
		this.footer = this.section.parent().find("footer");
		this.path = this.footer.find(".path");
		this.fbTable = $("#fbTable"+this.id);
		
		this.contextMenu = new FBContextMenu();
		this.contextMenu.__proto__ = this;
		taskArray["contextMenu"] = this.contextMenu; 
		this.status = new FBStatus();
		this.status.__proto__ = this;
		this.fs = new FBFileSort();
		this.fs.__proto__ = this.controller;
		this.fs.option = "name";
		this.fs.string.arrayPrototype();
		this.tm = new FBTableManager();
		this.tm.__proto__ = this.controller;
		
		if(sessionStorage.wMode !== undefined)
			this.initForWMode();
	}
	this.appendFunctionForSection = function(){
		this.section.attr("draggable","false");
		this.section.mousedown(function(event){
			taskArray['fileBrowser'][id].mouse.down.button(event);
		});
		this.section.bind("mousedown",function(){
			taskArray['fileBrowser'][id].mouse.down.selection(event);
		});
		this.section.mousemove(function(event){
			taskArray['fileBrowser'][id].mouse.move.selection(event);
		});
		this.section.mouseup(function(event){
			taskArray['fileBrowser'][id].mouse.up.selection(event);
		});
		this.section.mouseout(function(event){
			taskArray['fileBrowser'][id].mouse.out.selection(event);
		});
	}
	this.appendFunctionForTable = function(){
		var winInfo = this.winInfo;
		
		if(sessionStorage.fileBrowser === undefined)
			sessionStorage.fileBrowser = "[]";
		this.funcArray = JSON.parse(sessionStorage.fileBrowser);
		if(winInfo.options["dblclick"] !== undefined) {
			var json = {"dblclick":winInfo.options["dblclick"]};
			this.funcArray[this.id] = json;
		}
		sessionStorage.fileBrowser = JSON.stringify(this.funcArray);
		
		if(this.controller.va["data"].length == 0)
			this.tm.getData();
		
		var id = this.id;
		var funcArray = this.funcArray;
		this.fbTable.on("dragover",function(event){
			taskArray['fileBrowser'][id].drag.over.dataItem(event);
		});
		this.fbTable.on("drop",function(event){
			taskArray['fileBrowser'][id].drag.drop.dataItem(event);
		});
		var trs = this.fbTable.find("tr");
		trs = trs.slice(1,trs.length)
		trs.attr("draggable","true");
		trs.click(function(event){
			event.stopPropagation();
			taskArray['fileBrowser'][id].click.row(event);
		});
		trs.dblclick(function(event){
			event.stopPropagation();
			taskArray['fileBrowser'][id].dblclick.row(event);
		});
		if(funcArray[id] !== undefined && funcArray[id].dblclick !== undefined)
			trs.bind("dblclick",function(event){
				eval(funcArray[id].dblclick);
			});
		
		trs.contextmenu(function(event){
			taskArray['fileBrowser'][id].contextmenu.button(event);
		});
		
		trs.mouseover(function(event){
			event.stopPropagation();
			taskArray['fileBrowser'][id].mouse.over.row(event);
		});
		trs.mouseout(function(event){
			taskArray['fileBrowser'][id].mouse.out.row(event);
		});
		trs.on("dragstart",function(event){
			event.stopPropagation();
			taskArray['fileBrowser'][id].drag.start.dataItem(event)
		});
		trs.on("dragleave",function(event){
			taskArray['fileBrowser'][id].drag.leave.dataItem(event);
		});
		
		$(this.fbTable.find("tr")[0]).dblclick(null);
		
		var trS = this.fbTable.find("tr");
		var thS = $(trS[0]).find("th");
		var nameHead = $(thS[0]);
		var dateHead = $(thS[1]);
		var typeHead = $(thS[2]);
		var sizeHead = $(thS[3]);
		nameHead.click(function(){
			event.stopPropagation();
			taskArray["fileBrowser"][id].click.nameHead();
		});
		dateHead.click(function(){
			event.stopPropagation();
			taskArray["fileBrowser"][id].click.dateHead();
		});
		typeHead.click(function(){
			event.stopPropagation();
			taskArray["fileBrowser"][id].click.typeHead();
		});
		sizeHead.click(function(){
			event.stopPropagation();
			taskArray["fileBrowser"][id].click.sizeHead();
		});
		if(sessionStorage.wMode !== undefined){
			this.appendFunctionForWMode();
		}
		else {
			this.section.height(window.innerHeight - this.footer.height());
			this.fbws.send.isNotInWindow();
			var fbws = this.fbws;
			window.onbeforeunload = function () {
				fbws.send.x();
		    }
		}
		if($("#fbCSS").length == 0 ){
			var link = $("<link></link>");
			link.attr("id","fbCSS");
			link.attr("type","text/css");
			link.attr("rel","stylesheet");
			link.attr("href",this.contextURL+"/apps/fileBrowser/scripts/css/fileBrowser.css");
			$(document.head).append(link);
		}
		$("body").offset({
			top: 0,
			left: 0
		});
	}
	
	this.positioningStatus = function(){
		this.status.appendStatus();
	}
	this.display = function() {
		this.fs.display();
	}
}

