function Function(){
	this.javaListToJSMap = function (javaList){
		javaList = javaList.split("), ");
		var jsList = [];
		
		if(javaList[0] != "[]" && javaList[0] != "null")
		{	
			for(li=0; li<javaList.length; li++){
				var fSplit = [];
				javaList[li] = javaList[li].replace("[(", "");
				javaList[li] = javaList[li].replace(")]", "");
				if(javaList[li].charAt(0) == "(")
					javaList[li] = javaList[li].replace("(", "");
				fSplit = javaList[li].split(", ");
				tmpArr = [];
				for(si=0; si<fSplit.length; si++){
					tmpVal = [];
					tmpVal = fSplit[si].split(":=");
					tmpArr[tmpVal[0]] = tmpVal[1];
				}
				jsList[li]=tmpArr;
			}
		}
		return jsList;
	}
	this.submitPostForm = function (address,params){
		//examples
		//address "/web/icon"
		var http = new XMLHttpRequest();
	    http.open("POST", address, false);
	    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	    //params = "iconDiv" + "=" + encodeURIComponent(document.getElementsByName("text")[0].value);
	    http.send(params);
	    http.onload = function() {
	        //alert(http.responseText);
	    }
	}
}

/*
function submitForm() {
    var http = new XMLHttpRequest();
    http.open("POST", "/web/icon", false);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    params = "iconDiv" + "=" + encodeURIComponent(document.getElementsByName("text")[0].value);
    http.send(params);
    http.onload = function() {
        //alert(http.responseText);
    }
}
*/