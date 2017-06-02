var wNumId = parseInt($(this).attr("id").replace("xBOfwindow",""));
var fbId = parseInt($("#cOfwindow"+wNumId).find("table").attr("id").replace("fbTable",""));
system["fileBrowser"]["default"].submit("x",fbId);



