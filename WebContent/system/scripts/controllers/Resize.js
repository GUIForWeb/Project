	function Resize(){
		this.window = function(tag){
			this.wse.resize(tag);
			this.gr.resize(tag.parentNode);
		}
	}