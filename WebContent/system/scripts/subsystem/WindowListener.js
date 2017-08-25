	function WindowListener(){
		var bar = [];
		this.call = function(status,winObj){
			var param = "";
			param = this.winObjToString(winObj);
			param = param.substring(0, param.length-1);
			this.form.submit(status,param);
		}
		this.winObjToString = function(winObj){
			tmpStr = "";
			tmpStr += "fullScreen="+winObj.fullScreen+"&";
			tmpStr += "tagId="+winObj.tagId+"&";
			tmpStr += "name="+winObj.name+"&";
			tmpStr += "numId="+winObj.numId+"&";
			tmpStr += "bNumId="+winObj.bNumId+"&";
			content = winObj.view.contentTag.html();
			content = encodeURIComponent(content);
			tmpStr += "content="+content+"&";
			tmpStr += "oWidth="+parseInt(winObj.view.oWidth)+"&";
			tmpStr += "oHeight="+parseInt(winObj.view.oHeight)+"&";
			tmpStr += "oLeft="+parseInt(winObj.view.oLeft)+"&";
			tmpStr += "oTop="+parseInt(winObj.view.oTop)+"&";
			tmpStr += "preOWidth="+parseInt(winObj.view.preOWidth)+"&";
			tmpStr += "preOHeight="+parseInt(winObj.view.preOHeight)+"&";
			tmpStr += "preOLeft="+parseInt(winObj.view.preOLeft)+"&";
			tmpStr += "preOTop="+parseInt(winObj.view.preOTop)+"&";
			tmpStr += "zIndex="+winObj.view.zIndex+"&";
			return tmpStr;
		}
	}