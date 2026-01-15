// REDO Task 1 but create and use a custom function with the following signature:
// function drawEllipse(x, y, w, h, r, g, b) { //body}
//     Then: in the setup() make three calls to drawEllipse(...)

"use strict";

function setup() {
    console.log("go")
    drawEllipse(50, 50, 80, 40, 255, 0, 0);
    drawEllipse(200, 100, 60, 60, 0, 255, 0);
    drawEllipse(350, 150, 100, 50, 0, 0, 255);
}

function drawEllipse(x, y, w, h, r, g, b) {
    fill(r, g, b);
    ellipse(x, y, w, h);
}