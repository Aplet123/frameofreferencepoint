var mouseDown = false;
var vals = {
	rpx: 50,
	rpy: 300,
	c1x: 150,
	c1y: 200,
	c2x: 300,
	c2y: 400,
	rps: "none",
	tep: 0
};
var startVals = Object.assign({}, vals);
$("#point, [id^=car]").mousedown(function() {
	mouseDown = this.id;
	return false;
});
$(document).mouseup(function() {
	mouseDown = false;
});
function updateValues() {
	vals.c1x = Math.max(Math.min(890, vals.c1x), 110);
	vals.c2x = Math.max(Math.min(890, vals.c2x), 110);
	if (vals.rps == "car1") {
		vals.rpx = vals.c1x;
		vals.rpy = vals.c1y;
	} else if (vals.rps == "car2") {
		vals.rpx = vals.c2x;
		vals.rpy = vals.c2y;
	}
	$("#referencepoint").attr("transform", "translate(" + vals.rpx + "," + vals.rpy + ")");
	$("#car1").attr("transform", "translate(" + vals.c1x + "," + vals.c1y + ")");
	$("#car2").attr("transform", "translate(" + vals.c2x + "," + vals.c2y + ")");
	$("#car1connect").attr("x1", vals.rpx);
	$("#car1connect").attr("y1", vals.rpy);
	$("#car2connect").attr("x1", vals.rpx);
	$("#car2connect").attr("y1", vals.rpy);
	$("#car1connect").attr("x2", vals.c1x);
	$("#car1connect").attr("y2", vals.c1y);
	$("#car2connect").attr("x2", vals.c2x);
	$("#car2connect").attr("y2", vals.c2y);
	$("#car1distance").text(Math.round(Math.sqrt(Math.pow(vals.rpx - vals.c1x, 2) + Math.pow(vals.rpy - vals.c1y, 2)) / 10));
	$("#car2distance").text(Math.round(Math.sqrt(Math.pow(vals.rpx - vals.c2x, 2) + Math.pow(vals.rpy - vals.c2y, 2)) / 10));
	if (vals.tep == 0) {
		$("#elapsedp").addClass("hidden");
	} else {
		$("#elapsedp").removeClass("hidden");
	}
	$("#elapsed").text(Math.round(vals.tep / 100) / 10);
}
$("#cars").mousemove(function(e) {
	if (mouseDown == "point") {
		vals.rpx = e.pageX - 5;
		vals.rpy = e.pageY - 5;
		updateValues();
	} else if (mouseDown == "car1") {
		vals.c1x = e.pageX - 5;
		updateValues();
	} else if (mouseDown == "car2") {
		vals.c2x = e.pageX - 5;
		updateValues();
	}
});
$("[id^=snapcar]").click(function () {
	vals.rps = this.id.substr(4, 4);
	$("[id^=snapcar]").attr("disabled", false);
	this.disabled = true;
	updateValues();
});
$("#gobutton").click(function () {
	vals.gnt = setInterval(function () {
		vals.c1x += 2;
		vals.c2x += 1;
		vals.tep += 20;
		updateValues();
	}, 20);
	$("#stopbutton").attr("disabled", false);
	this.disabled = true;
});
$("#stopbutton").click(function () {
	clearInterval(vals.gnt);
	$("#gobutton").attr("disabled", false);
	this.disabled = true;
});
$("#resetbutton").click(function () {
	Object.assign(vals, startVals);
	$("[id^=snapcar]").attr("disabled", false);
	$("#snapcarnone").attr("disabled", true);
	updateValues();
});
updateValues();