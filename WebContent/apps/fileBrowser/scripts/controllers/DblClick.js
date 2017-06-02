function DblClick(){
	this.eButton = function(tag){
		if(tag.tagName == "TR"){
			event.stopPropagation();
			this.submit("choose",this.id+"&"+tag.children[2].innerHTML+"&"+tag.children[0].innerHTML);
		}
	}
}
