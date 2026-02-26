window.onload = function () {
    // get the canvas
    let canvas = document.getElementById("testCanvas");
    //get the context
    let context = canvas.getContext("2d");

    let rectSize = 50
    //a draw a rect:
    context.fillStyle = "rgba(255,0,0,255)";
    // draw a rect
    context.fillRect(canvas.width / 2, canvas.height / 2, rectSize, rectSize);
    // cut out a rect inside
    context.clearRect(canvas.width / 2 + rectSize / 4, canvas.height / 2 + rectSize / 4, rectSize / 2, rectSize / 2);

    let xPos = canvas.width / 3;
    let yPos = canvas.height / 2;
    let radius = 40;
    let startAngle = 0;
    let endAngle = Math.PI * 2; //full rotation

    context.beginPath();
    context.arc(xPos, yPos, radius, startAngle, endAngle, true);
    context.fill(); // set the fill
    context.lineWidth = 2; //change stroke
    context.stroke();//set the stroke
    context.closePath();

    //SECOND
    context.strokeStyle = "#0000FF"; // change the color we are using
    context.beginPath();
    context.arc(xPos + 200, yPos, radius, startAngle, endAngle, true);
    context.fill(); // set the fill
    context.lineWidth = 2; //change stroke
    context.stroke();//set the stroke
    context.closePath();

    // AN IRREGULAR SHAPE
    let lineLength = 100;
    let x1 = canvas.width / 2;
    let y1 = canvas.height / 2;
    let x2 = x1 + lineLength;
    let y2 = y1 - lineLength;
    let x3 = x1 - lineLength;

    context.beginPath(); //start a path
    context.moveTo(x1, y1); //where to start drawing
    context.lineTo(x2, y1); //lineTo(where to go from last...)
    context.lineTo(x2, y2); //lineTo(where to go from last...)
    context.lineTo(x3, y2); //lineTo(where to go from last...)
    context.lineTo(x1, y1); //lineTo(where to go from last...)
    context.strokeStyle = "#FFFFFF"; // change the color we are using
    context.fillStyle = "#bb25d5ff"
    context.lineWidth = 2;
    context.stroke();
    context.fill();
    context.closePath(); //end a path ...

};