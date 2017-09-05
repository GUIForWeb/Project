	function Draging(){
		this.head = function (event){
			this.pe.outerLayer(event.currentTarget.parentNode.parentNode);
		}
		this.icon = function (tag){
			this.pe.outerLayer(tag);
		}
	} 