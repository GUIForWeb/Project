function FileBrowser(id){
	this.ws = function(){}
	this.id = id;
	this.data = [];
	this.setJSON = function(data) {
		this.controller.va["data"] = data;
	}
	this.InitForWMode = function() {
		this.api = new API();
		this.cOfWindow = this.section.parent();
		this.window = this.cOfWindow.parent();
		this.x = this.window.children("#hOfwindow"+this.id).children("#xBOfwindow"+this.id);
	}
	this.appendFunctionForWMode = function() {
		this.x.click(function(event){
			taskArray['fileBrowser'][id].click.x(event);
		});
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
		this.select = new Select();
		this.select.__proto__ = this.controller;
		/*
		this.ks = new ClickSelect();
		this.ks.__proto__ = this.controller;
		this.ds = new DragSelect();
		this.ds.__proto__ = this.controller;
		this.cs = new CtrlSelect();
		this.cs.__proto__ = this.controller;
		*/
		this.fbm = new FBManager();
		this.fbm.__proto__ = this.controller;
		this.fws = new FileWebSocket(this.ip+":8081");
		this.fws.__proto__ = this.controller;
		this.focusout = new Focusout();
		this.focusout.__proto__ = this.controller;
		this.keydown = new Keydown();
		this.keydown.__proto__ = this.controller;
		this.mouseover = new Mouseover();
		this.mouseover.__proto__ = this.controller;
		this.mouseout = new Mouseout();
		this.mouseout.__proto__ = this.controller;
		this.section = $("#fbTable"+this.id).parent();
		this.footer = this.section.parent().find("footer");
		this.fbTable = $("#fbTable"+this.id);
		
		this.contextMenu = new FileBrowserContextMenu();
		this.contextMenu.__proto__ = this;
		this.status = new FileBrowserStatus();
		this.status.__proto__ = this;
		this.fs = new FileSort();
		this.fs.__proto__ = this.controller;
		this.fs.option = "name";
		this.fs.string.arrayPrototype();
		if(sessionStorage.wMode !== undefined)
			this.InitForWMode();
	}
	this.appendFunction = function(){
		var id = this.id;
		
		this.section.click(function(event){
			taskArray['fileBrowser'][id].click.button(event);
		});
		this.fbTable.on("dragover",function(event){
			taskArray['fileBrowser'][id].drag.over.dataItem(event);
		});
		this.fbTable.on("drop",function(event){
			taskArray['fileBrowser'][id].drag.drop.dataItem(event);
		});
		var tr = this.fbTable.find("tr"); 
		tr.dblclick(function(event){
			taskArray['fileBrowser'][id].dblclick.row(event);
		});
		tr.contextmenu(function(event){
			taskArray['fileBrowser'][id].contextmenu.button(event);
		});
		tr.mouseover(function(event){
			taskArray['fileBrowser'][id].mouseover.row(event);
		});
		tr.mouseout(function(event){
			taskArray['fileBrowser'][id].mouseout.row(event);
		});
		tr.on("dragstart",function(event){
			taskArray['fileBrowser'][id].drag.start.dataItem(event)
		});
		
		tr.attr("draggable","true");
		this.section.attr("draggable","true");
		this.section.on("dragstart",function(event){
			taskArray["fileBrowser"][id].drag.start.selection(event);
		});
		this.section.on("drag",function(event){
			taskArray["fileBrowser"][id].drag.ing.selection(event);
		});
		this.section.on("dragend",function(event){
			taskArray["fileBrowser"][id].drag.end.selection(event);
		});
		
		$(this.fbTable.find("tr")[0]).dblclick(null);
		
		var trS = this.fbTable.find("tr");
		var thS = $(trS[0]).find("th");
		this.nameHead = $(thS[0]);
		this.dateHead = $(thS[1]);
		this.typeHead = $(thS[2]);
		this.sizeHead = $(thS[3]);
		this.nameHead.click(function(){
			taskArray["fileBrowser"][id].click.nameHead();
		});
		this.dateHead.click(function(){
			taskArray["fileBrowser"][id].click.dateHead();
		});
		this.typeHead.click(function(){
			taskArray["fileBrowser"][id].click.typeHead();
		});
		this.sizeHead.click(function(){
			taskArray["fileBrowser"][id].click.sizeHead();
		});
		if(sessionStorage.wMode !== undefined)
			this.appendFunctionForWMode();
		else {
			this.section.height(window.innerHeight - this.footer.height());
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

