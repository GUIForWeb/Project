	function DblClick(){
		this.imgFile = function(tag,id){
			system["fileBrowser"]["default"].submit("option",id+"&"+tag.children[0].innerHTML);
			system["fileBrowser"][id].close();
			this.__proto__.change = false;
			this.submit();
			//this.__proto__.change = false;
			//submit background change to bgTheme
		}
	}