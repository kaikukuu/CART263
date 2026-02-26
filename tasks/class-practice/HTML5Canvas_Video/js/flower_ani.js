window.onload = function () {
    // get the canvas
    let canvas = document.getElementById("testCanvas");
    //get the context
    let context = canvas.getContext("2d");

    function createFlower(xPos, yPos, radius, colors) {
        drawSinglePetal(xPos, yPos + 3 * radius / 2, radius, colors[0])
        drawSinglePetal(xPos, yPos - 3 * radius / 2, radius, colors[0])
        drawSinglePetal(xPos - 3 * radius / 2, yPos, radius, colors[0])
        drawSinglePetal(xPos + 3 * radius / 2, yPos, radius, colors[0])
        drawSinglePetal(xPos, yPos, radius, colors[1])
    };

    function drawSinglePetal(x, y, r, fillColor) {
        context.fillStyle = fillColor; // change the color we are using
        context.strokeStyle = fillColor; // change the color we are using
        context.beginPath();
        context.arc(x, y, r, startAngle, endAngle, true);
        context.fill(); // set the fill
        context.lineWidth = 2; //change stroke
        context.stroke();//set the stroke
        context.closePath();
    };
    //call function to create a flower
    let startAngle = 0;
    let endAngle = Math.PI * 2; //full rotation
    createFlower(canvas.width / 2, canvas.height / 2, 60, ["#ff0088ff", "rgb(187, 231, 254)"]);

    let r1 = 30;
    let counter = 0;

    requestAnimationFrame(animate);

    function animate() {
        //console.log("go")
        context.clearRect(0, 0, canvas.width, canvas.height);
        //we will make a scaling animation:
        //math.sin goes from [-1,1]*30 == -30,30
        //then if we add 30 to the min ==0 and to the max will be 60 :)
        let newSize = Math.sin(counter) * r1 + r1;
        createFlower(canvas.width / 2, canvas.height / 2, newSize, [
            "#ff0088ff",
            "#ce4990ff",
        ]);
        counter += 0.01;
        requestAnimationFrame(animate);
    }
    ;
}




