var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
var lastend = 0;

let fetchData = async () => {
    const response = await fetch('http://localhost:3000/api');
    const data = await response.json();
    console.log(data);
    return data;
}

fetchData()
    .then(data => {
        renderGraph(data)
    })


const renderGraph = (data) => {
    // var data = [1, 35, 5, 7, 1, 6, 1, 1, 4, 1, 1, 1];
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
    const canvas1 = document.getElementById('demo');
    const ctx1 = canvas1.getContext('2d');



    ctx1.fillStyle = 'blue';
    ctx1.fillRect(30, 35, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 35, 15, 15);

    ctx1.fillStyle = 'red';
    ctx1.fillRect(30, 55, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 55, 15, 15);

    ctx1.fillStyle = 'green';
    ctx1.fillRect(30, 75, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 75, 15, 15);

    ctx1.fillStyle = 'magenta';
    ctx1.fillRect(30, 95, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 95, 15, 15);

    ctx1.fillStyle = 'yellow';
    ctx1.fillRect(30, 153, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 153, 15, 15);

    ctx1.fillStyle = 'purple';
    ctx1.fillRect(30, 173, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 173, 15, 15);

    ctx1.fillStyle = 'orange';
    ctx1.fillRect(30, 193, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 193, 15, 15);

    ctx1.fillStyle = 'pink';
    ctx1.fillRect(30, 213, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 213, 15, 15);

    ctx1.fillStyle = 'cyan';
    ctx1.fillRect(30, 273, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 273, 15, 15);

    ctx1.fillStyle = 'maroon';
    ctx1.fillRect(30, 293, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 293, 15, 15);

    ctx1.fillStyle = 'grey';
    ctx1.fillRect(30, 313, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 313, 15, 15);

    ctx1.fillStyle = 'black';
    ctx1.fillRect(30, 333, 15, 15);
    ctx1.strokeStyle = 'white';
    ctx1.strokeRect(30, 333, 15, 15);




    ctx1.fillStyle = '#fff'
    ctx1.font = '15px Arial';
    ctx1.fillText(`Are Professor Beaty's participation quizzes funny?`, 35, 25,);
    ctx1.fillText(`Yes - Selected: ${data[0]} Times`, 50, 45);
    ctx1.fillText(`No - Selected: ${data[1]} Times`, 50, 65);
    ctx1.fillText(`Possibly - Selected: ${data[2]} Times`, 50, 85);
    ctx1.fillText(`Absolutely not - Selected: ${data[3]} Times`, 50, 105);

    ctx1.fillText(`What is your favorite color?`, 35, 145,);
    ctx1.fillText(`Green - Selected ${data[4]} Times`, 50, 165);
    ctx1.fillText(`It's Green - Selected ${data[5]} Times`, 50, 185);
    ctx1.fillText(`Definately not a color that isn't green - Selected ${data[6]} Times `, 50, 205);
    ctx1.fillText(`I thought it was something different but it's green - Selected ${data[7]} Times`, 50, 225);

    ctx1.fillText(`Are taxes bad?`, 35, 265,);
    ctx1.fillText(`Yes - Selected ${data[8]} Times`, 50, 285);
    ctx1.fillText(`No - Selected ${data[9]} Times`, 50, 305);
    ctx1.fillText(`They are theft - Selected ${data[10]} Times`, 50, 325);
    ctx1.fillText(`Due to the IRS, I am obligated to say no - Selected ${data[11]} Times`, 50, 345);
}





