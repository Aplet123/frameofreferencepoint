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
	$("#coordinategrid").attr("transform", "translate(" + vals.rpx + "," + vals.rpy + ")");
	$("#car1").attr("transform", "translate(" + vals.c1x + "," + vals.c1y + ")");
	$("#car2").attr("transform", "translate(" + vals.c2x + "," + vals.c2y + ")");
	$("#car1connect").attr("x1", vals.rpx);
	$("#car1connect").attr("y1", vals.rpy);
	$("#car2connect").attr("x1", vals.rpx);
	$("#car2connect").attr("y1", vals.rpy);
	$("#car1connect").attr("x2", vals.rpx);
	$("#car1connect").attr("y2", vals.c1y);
	$("#car2connect").attr("x2", vals.rpx);
	$("#car2connect").attr("y2", vals.c2y);
	$("#car1connecta").attr("x1", vals.rpx);
	$("#car1connecta").attr("y1", vals.c1y);
	$("#car2connecta").attr("x1", vals.rpx);
	$("#car2connecta").attr("y1", vals.c2y);
	$("#car1connecta").attr("x2", vals.c1x);
	$("#car1connecta").attr("y2", vals.c1y);
	$("#car2connecta").attr("x2", vals.c2x);
	$("#car2connecta").attr("y2", vals.c2y);
	$("#car1distance").text(Math.round(Math.abs(vals.c1x - vals.rpx) / 10));
	$("#car2distance").text(Math.round(Math.abs(vals.c2x - vals.rpx) / 10));
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
	vals.rps = this.id.substr(4);
	$("[id^=snapcar]").attr("disabled", false);
	this.disabled = true;
	updateValues();
});
$("#gobutton").click(function () {
	if (this.innerText.match(/^Start/)) {
		vals.gnt = setInterval(function () {
			vals.c1x += 2;
			vals.c2x += 1;
			vals.tep += 20;
			updateValues();
		}, 20);
		this.innerText = this.innerText.replace(/^Start/, "Stop");
	} else if (this.innerText.match(/^Stop/)) {
		clearInterval(vals.gnt);
		this.innerText = this.innerText.replace(/^Stop/, "Start");
	}
});
$("#resetbutton").click(function () {
	Object.assign(vals, startVals);
	$("[id^=snapcar]").attr("disabled", false);
	$("#snapcarnone").attr("disabled", true);
	updateValues();
});
$("#coordgrid").click(function () {
	if (this.innerText.match(/^Hide/)) {
		$("#coordinategrid").addClass("hidden");
		this.innerText = this.innerText.replace(/^Hide/, "Show");
	} else if (this.innerText.match(/^Show/)) {
		$("#coordinategrid").removeClass("hidden");
		this.innerText = this.innerText.replace(/^Show/, "Hide");
	}
});
var cg = $("#coordinategrid")[0];
for (var xval = -1000; xval <= 1000; xval += 20) {
	cg.insertAdjacentHTML("beforeend", '<line x1="' + xval + '" y1="-550" x2="' + xval + '" y2="550" stroke-width="2px" stroke="' + (xval % 100 ? "#ddf" : "#aaf") + '" stroke-dasharray="4"/>');
}
for (var yval = -560; yval <= 560; yval += 20) {
	cg.insertAdjacentHTML("beforeend", '<line x1="-1000" y1="' + yval + '" x2="1000" y2="' + yval + '" stroke-width="2px" stroke="' + (yval % 100 ? "#ddf" : "#aaf") + '" stroke-dasharray="4"/>');
}
updateValues();
