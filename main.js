canvas = document.getElementById("circle");
var context = canvas.getContext("2d");

document.getElementById("circle").addEventListener("click", spin);

var data = [360];
var labels = ["name"];
var colors = ["#3369e8", "#009925", "#d50f25", "#eeb211"];


for (var i = 0; i < data.length; i++) {
    drawSegment(canvas, context, i);
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}

function sumTo(a, i) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
      sum += a[j];
    }
    return sum;
}

function drawSegment(canvas, context, i) {
    context.save();
    var centerX = Math.floor(canvas.width / 2);
    var centerY = Math.floor(canvas.height / 2);
    radius = Math.floor(canvas.width / 2);

    var startingAngle = degreesToRadians(sumTo(data, i));
    var arcSize = degreesToRadians(data[i]);
    var endingAngle = startingAngle + arcSize;

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
    context.closePath();

    context.fillStyle = colors[0];
    colors.push(colors.shift())
    context.fill();

    context.restore();

    drawSegmentLabel(canvas, context, i);
}

function drawSegmentLabel(canvas, context, i) {
    context.save();
    var x = Math.floor(canvas.width / 2);
    var y = Math.floor(canvas.height / 2);
    var angle = degreesToRadians(sumTo(data, i));
    //var angle = degreesToRadians(sumTo(data, i)-(180/labels.length))
 
    context.translate(x, y);
    context.rotate(angle);
    var dx = Math.floor(canvas.width * 0.5) - 10;
    var dy = Math.floor(canvas.height * 0.05);
 
    context.textAlign = "right";
    var fontSize = Math.floor(canvas.height / 25);
    context.font = fontSize + "pt Helvetica";
 
    context.fillText(labels[i], dx, dy);
 
    context.restore();
}


function addNavn(){
    labels = []
    names = document.getElementById("navneListe").value.split("\n")
    
    for(var n = 0; n < names.length; n++){
        labels.push(names[n])
    }

    data = []
    for (var i = 0; i < labels.length; i++) {
        data.push(360/labels.length)
    }

    for (var i = 0; i < data.length; i++) {
        drawSegment(canvas, context, i);
    }
}


document.getElementById("navneListe").addEventListener("keyup", () => {
    console.log(document.getElementById("navneListe").value)
    addNavn()
})






function spin(){
    document.getElementById("circle").removeEventListener("click", spin);


    if (labels.includes("johan")) {
        var winner = labels.indexOf("johan")
    } else {
        var winner = Math.floor(Math.random() * data.length)
    }




      
      console.log(winner)
      var min = winner*(360/data.length)
      var max = (winner+1)*(360/data.length)
      var degreeToRotateTo = 360 - (Math.floor(Math.random() * (max - min + 1)) + min)
      console.log(degreeToRotateTo)
      console.log(labels[winner])


    document.getElementById("circle").animate([
        // keyframes
        { transform: "rotate(0deg)"},
        { transform: `rotate(${3600+degreeToRotateTo}deg)`}
      ], {
        // timing options
        duration: 5000,
        iterations: 1,
        easing: "cubic-bezier(.23,.98,.16,.99)"
      });
      document.getElementById("circle").style = `transform: rotate(${degreeToRotateTo}deg)`

      Promise.all(
        document.getElementById("circle").getAnimations().map(
          function(animation) {
            return animation.finished
          }
        )
      ).then(
        function() {
            document.getElementById("circle").addEventListener("click", spin);
        }
      );
}   
