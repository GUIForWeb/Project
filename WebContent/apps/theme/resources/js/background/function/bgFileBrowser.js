if(fileItem["type"] == "image/jpeg"){
	tr.attr("ondblclick","system['backgroundTheme'].dblclick.imgFile(this,"+fb.id+")");
	tr.css("color","green");
}