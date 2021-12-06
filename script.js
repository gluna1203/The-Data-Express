var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
var lastend = 0;
var data = [1, 0, 5, 7, 1, 6, 1, 1, 4, 1, 1, 1];
var myTotal = 0;
var myColor = ['blue', 'red', 'green', 'magenta', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'maroon', 'grey', 'black'];
var labels = ['', '', '', '', '', '', '', '', '', '', '', ''];

for (var e = 0; e < data.length; e++) {
    myTotal += data[e];
}

var off = 10
var w = (canvas.width - off) / 2
var h = (canvas.height - off) / 2
for (var i = 0; i < data.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w, h);
    var len = (data[i] / myTotal) * 2 * Math.PI
    var r = h - off / 2
    ctx.arc(w, h, r, lastend, lastend + len, false);
    ctx.lineTo(w, h);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var mid = lastend + len / 2
    ctx.fillText(labels[i], w + Math.cos(mid) * (r / 2), h + Math.sin(mid) * (r / 2));
    lastend += Math.PI * 2 * (data[i] / myTotal);
}
