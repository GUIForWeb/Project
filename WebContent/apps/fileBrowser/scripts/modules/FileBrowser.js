function FileBrowser(id){
	this.ws = function(){}
	this.id = id;
	this.setJSON = function(data) {
		this.fs.data = data;
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
		this.cOfWindow = this.section.parent();
		this.window = this.cOfWindow.parent();
		this.fbTable = $("#fbTable"+this.id);
		this.x = this.window.children("#hOfwindow"+this.id).children("#xBOfwindow"+this.id);
		
		this.contextMenu = new FileBrowserContextMenu();
		this.contextMenu.__proto__ = this;
		this.status = new FileBrowserStatus();
		this.status.__proto__ = this;
		this.fs = new FileSort();
		this.fs.__proto__ = this.controller;
	}
	this.appendFunction = function(){
		var id = this.id;
		this.x.click(function(event){
			taskArray['fileBrowser'][id].click.x(event);
		});
		this.section.click(function(event){
			taskArray['fileBrowser'][id].click.eButton(event);
		});
		this.fbTable.on("dragover",function(event){
			taskArray['fileBrowser'][id].drag.over.fileItem(event);
		});
		this.fbTable.on("drop",function(event){
			taskArray['fileBrowser'][id].drag.drop.fileItem(event);
		});
		var tr = this.fbTable.find("tr"); 
		tr.dblclick(function(event){
			taskArray['fileBrowser'][id].dblclick.row(event);
		});
		tr.contextmenu(function(event){
			taskArray['fileBrowser'][id].click.cButton(event);
		});
		tr.mouseover(function(event){
			taskArray['fileBrowser'][id].mouseover.row(event);
		});
		tr.mouseout(function(event){
			taskArray['fileBrowser'][id].mouseout.row(event);
		});
		tr.on("dragstart",function(event){
			taskArray['fileBrowser'][id].drag.start.fileItem(event)
		});
		
		tr.attr("draggable","true");
		
		this.cOfWindow.on("dragstart",function(event){
			taskArray["fileBrowser"][id].drag.start.selection(event);
		});
		this.cOfWindow.on("drag",function(event){
			taskArray["fileBrowser"][id].drag.ing.selection(event);
		});
		this.cOfWindow.on("dragend",function(event){
			taskArray["fileBrowser"][id].drag.end.selection(event);
		});
		
		$(this.fbTable.find("tr")[0]).dblclick(null);
		
		if($("#fbCSS").length == 0 ){
			var link = $("<link></link>");
			link.attr("id","fbCSS");
			link.attr("type","text/css");
			link.attr("rel","stylesheet");
			link.attr("href",this.contextURL+"/apps/fileBrowser/scripts/css/fileBrowser.css");
			$(document.head).append(link);
		}
		
		var trS = this.fbTable.find("tr");
		var thS = $(trS[0]).find("th");
		this.nameHead = $(thS[0]);
		this.dateHead = $(thS[1]);
		this.typeHead = $(thS[2]);
		this.sizeHead = $(thS[3]);
		this.nameHead.click(function(){
			taskArray["fileBrowser"][id].fs.sort(0);
		});
		this.dateHead.click(function(){
			taskArray["fileBrowser"][id].fs.sort(1);
		});
		this.typeHead.click(function(){
			taskArray["fileBrowser"][id].fs.sort(2);
		});
		this.sizeHead.click(function(){
			taskArray["fileBrowser"][id].fs.sort(3);
		});
	}
	
	this.positioningStatus = function(){
		this.status.appendStatus();
	}
	this.display = function() {
		this.fs.reference();
		//this.displayHead();
		//this.displayData();
	}
}

