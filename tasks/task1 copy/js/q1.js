//Create three ellipses
// Each ellipse must have a different color, size and position
// Only use variables for the x, y, width, height and color(r, g, b) for each ellipse.
// REUSE THE SAME variables for each ellipse
// DO NOT USE: objects, arrays, loops, animation, custom self created functions or the random function

"use strict";

//first ellipse
let x = 100;
let y = 100;
let w = 50;
let r = 255;
let g = 0;
let b = 0;
fill(r, g, b);

function setup() {
    console.log("go")
    createCanvas(400, 400);
    background(0);

    // ellipse(x, y, w, h);

    // //second ellipse
    // x = 200;
    // y = 150;
    // w = 80;
    // h = 40;
    // r = 0;
    // g = 255;
    // b = 0;
    // fill(r, g, b);
    // ellipse(x, y, w, h);

    // //third ellipse
    // x = 300;
    // y = 200;
    // w = 60;
    // h = 60;
    // r = 0;
    // g = 0;
    // b = 255;
    // fill(r, g, b);
    // ellipse(x, y, w, h);
}

function draw() {
    push();
    noStroke();
    fill(r, g, b + 200);
    ellipse(x, y, w);
    pop();

    push();
    noStroke();
    fill(r, g, b);
    ellipse(x - 40, y - 40, w - 20);
    pop();

    push();
    noStroke();
    fill(r, g, b + 204);
    ellipse(x - 75, y - 75, w - 30);
    pop();


}