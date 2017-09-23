function FileBrowser(id){
	this.ws = function(){}
	this.id = id;
	this.setJSONArray = function(data) {
		this.controller.va["data"] = data;
	}
	this.InitForWMode = function() {
		this.api = new API();
		var winInfo = gui.getWinInfo(this.section)
		this.cOfWindow = winInfo.content;
		this.window = winInfo.window;
		this.winId = winInfo.id;
		this.x = winInfo.x;
		this.m = winInfo.m;
		var path = this.path;
		this.m.bind("dragstart",function(event){
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
		this.controller = new Controller();
		this.controller.__proto__ = this;
		this.dblclick = new DblClick();
		this.dblclick.__proto__ = this.controller;
		this.click = new Click();
		this.click.__proto__ = this.controller;
		this.contextmenu = new ContextMenu();
		this.contextmenu.__proto__ = this.controller;	
		this.drag = new Drag();
		this.drag.__proto__ = this.controller;
		this.mouse = new Mouse();
		this.mouse.__proto__ = this.controller;
		this.focusout = new Focusout();
		this.focusout.__proto__ = this.controller;
		this.keydown = new Keydown();
		this.keydown.__proto__ = this.controller;
		this.fws = new FileWebSocket(this.ip+":8081");
		this.fws.__proto__ = this.controller;
		
		this.select = new Select();
		this.select.__proto__ = this.controller;
		this.fbm = new FBManager();
		this.fbm.__proto__ = this.controller;
		
		this.section = $("#fbTable"+this.id).parent();
		this.footer = this.section.parent().find("footer");
		this.path = this.footer.find(".path");
		this.fbTable = $("#fbTable"+this.id);
		
		this.contextMenu = new FileBrowserContextMenu();
		this.contextMenu.__proto__ = this;
		taskArray["contextMenu"] = this.contextMenu; 
		this.status = new FileBrowserStatus();
		this.status.__proto__ = this;
		this.fs = new FileSort();
		this.fs.__proto__ = this.controller;
		this.fs.option = "name";
		this.fs.string.arrayPrototype();
		this.fm = new TableManager();
		this.fm.__proto__ = this.controller;
		
		if(sessionStorage.wMode !== undefined)
			this.InitForWMode();
	}
	this.appendFunctionForSection = function(){
		this.section.attr("draggable","false");
		this.section.mousedown(function(event){
			taskArray['fileBrowser'][id].mouse.down.button(event);
		});
		this.section.bind("mousedown",function(){
			taskArray['fileBrowser'][id].mouse.down.selection(event);
		});
		this.section.click(function(event){
			taskArray['fileBrowser'][id].click.button(event);
		});
		
		this.section.mousemove(function(event){
			taskArray['fileBrowser'][id].mouse.move.selection(event);
		});
		this.section.mouseup(function(event){
			taskArray['fileBrowser'][id].mouse.up.selection(event);
		});
	}
	this.appendFunctionForTable = function(){
		if(this.controller.va["data"].length == 0)
			this.fm.getData();
		
		var id = this.id;
		
		this.fbTable.on("dragover",function(event){
			taskArray['fileBrowser'][id].drag.over.dataItem(event);
		});
		this.fbTable.on("drop",function(event){
			taskArray['fileBrowser'][id].drag.drop.dataItem(event);
		});
		var trs = this.fbTable.find("tr");
		trs = trs.slice(2,trs.length)
		trs.attr("draggable","true");
		trs.dblclick(function(event){
			event.stopPropagation();
			taskArray['fileBrowser'][id].dblclick.row(event);
		});
		
		trs.contextmenu(function(event){
			taskArray['fileBrowser'][id].contextmenu.button(event);
		});
		
		trs.mouseover(function(event){
			event.stopPropagation();
			taskArray['fileBrowser'][id].mouse.over.row(event);
		});
		trs.mouseout(function(event){
			event.stopPropagation();
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
			this.fbm.send.isNotInWindow();
			var fbm = this.fbm;
			window.onbeforeunload = function () {
				fbm.send.x();
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

