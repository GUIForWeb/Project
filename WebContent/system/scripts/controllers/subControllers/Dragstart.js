	function Dragstart(){
		this.head = function(tag){
			var winTag = tag.parentNode.parentNode;
			this.gm.moveWinToTop(winTag);
		}
	}