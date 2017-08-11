	function Dragstart(){
		this.head = function(tag,event){
			var winTag = tag.parentNode.parentNode
			this.ee.window(winTag);
			//var url = window.location.href.split(this.contextPath)[0];
			//var zIdx = tag.parentNode.parentNode.style.zIndex;
			/*
			var contentURL = this.windowArray[zIdx].contentURL;
			if(contentURL.indexOf("https://") != -1 || contentURL.includes("http://") != -1){
				url += this.contextPath+contentURL;
			}
			event.dataTransfer.setData("text/uri-list", url);
			*/
		}
	}