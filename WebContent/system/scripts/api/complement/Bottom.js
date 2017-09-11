function Bottom(){
	this.init = function(){
		
		var nw = this.va["w"].view.northWestSelector;
		var ne = this.va["w"].view.northEastSelector;
		var sw = this.va["w"].view.southWestSelector;
		var se = this.va["w"].view.southEastSelector;
		var n = this.va["w"].view.northSelector;
		var e = this.va["w"].view.eastSelector;
		var s = this.va["w"].view.southSelector;
		var w = this.va["w"].view.westSelector;
		var fB = this.va["w"].view.fButtonSelector;
		this.c = this.va["w"].view.contentSelector;
		this.positioning();
		
		var ss = this.va["s"];
		var c = this.c;
		
		this.c.scroll(function(event){
			var sTop = c.scrollTop();
			var height = c.height();
			ss.css("position","absolute");
			ss.css("top",height-ss.height()+sTop);
		});
		fB.bind("click",function(){
			gui.api.complement.positioning();
		}); 
		nw.bind("drag",function(){
			gui.api.complement.positioning();
		});
		ne.bind("drag",function(){
			gui.api.complement.positioning();
		});
		sw.bind("drag",function(){
			gui.api.complement.positioning();
		});
		se.bind("drag",function(){
			gui.api.complement.positioning();
		});
		n.bind("drag",function(){
			gui.api.complement.positioning();
		});
		e.bind("drag",function(){
			gui.api.complement.positioning();
		});
		s.bind("drag",function(){
			gui.api.complement.positioning();
		});
		w.bind("drag",function(){
			gui.api.complement.positioning();
		});
	}
	this.positioning = function(){
		var height = this.c.height();
		this.va["s"].css("position","absolute");
		this.va["s"].css("top",height-this.va["s"].height());
	}
}