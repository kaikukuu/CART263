// REDO Task 1 but create and use a custom function with the following signature:
// function drawEllipse(x, y, w, h, r, g, b) { //body}
//     Then: in the setup() make three calls to drawEllipse(...)

"use strict";

//first ellipse
// let ellipse = {
//     X: 100,
//     y: 100,
//     w: 50,
//     r: 255,
//     g: 0,
//     b: 0
// };

function setup() {
    console.log("go")
    createCanvas(400, 400);
    background(0);

}

function draw() {
    drawEllipse(25, 25, 30, 30, 255, 0, 0);
    drawEllipse(60, 60, 40, 40, 0, 255, 0);
    drawEllipse(100, 100, 50, 50, 0, 0, 255);
    // push();
    // noStroke();
    // fill(r, g, b + 200);
    // ellipse(x, y, w);
    // pop();

    // push();
    // noStroke();
    // fill(r, g, b);
    // ellipse(x - 40, y - 40, w - 20);
    // pop();

    // push();
    // noStroke();
    // fill(r, g, b + 204);
    // ellipse(x - 75, y - 75, w - 30);
    // pop();


}

function drawEllipse(x, y, w, h, r, g, b) {
    fill(r, g, b);
    ellipse(x, y, w, h);
}