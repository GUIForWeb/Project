console.log("xFB");
taskArray["fileBrowser"][event.data.id].fbm.send.x();
delete taskArray["fileBrowser"][event.data.id];
if(gui.length(taskArray["fileBrowser"]) == 0){
	$("#fbCSS").remove();
}
