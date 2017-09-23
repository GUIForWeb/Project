function Bottom() {
	this.init = function() {
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
		this.sectionHeight();
		var ss = this.va["s"];
		var c = this.c;

		this.c.scroll(function(event) {
			var sTop = c.scrollTop();
			var height = c.height();
			ss.css("position", "absolute");
			ss.css("top", height - ss.height() + sTop);
		});
		var api = this;
		fB.bind("click", function() {
			api.complement.positioning();
			api.complement.sectionHeight();
		});
		nw.bind("drag", function() {
			api.complement.positioning();
			api.complement.sectionHeight();
		});
		ne.bind("drag", function() {
			api.complement.positioning();
			api.complement.sectionHeight();
		});
		sw.bind("drag", function() {
			api.complement.positioning();
			api.complement.sectionHeight();
		});
		se.bind("drag", function() {
			api.complement.positioning();
			api.complement.sectionHeight();
		});
		n.bind("drag", function() {
			api.complement.positioning();
			api.complement.sectionHeight();
		});
		e.bind("drag", function() {
			api.complement.positioning();
			api.complement.sectionHeight();
		});
		s.bind("drag", function() {
			api.complement.positioning();
			api.complement.sectionHeight();
		});
		w.bind("drag", function() {
			api.complement.positioning();
			api.complement.sectionHeight();
		});
	}
	this.sectionHeight = function() {
		var height = this.c.height();
		this.section = this.c.find("section");
		this.section.height(height - this.va["s"].height());
	}
	this.positioning = function() {
		var height = this.c.height();
		this.va["s"].css("position", "absolute");
		this.va["s"].css("top", height - this.va["s"].height());
	}
}