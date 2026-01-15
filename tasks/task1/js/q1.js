//Create three ellipses
// Each ellipse must have a different color, size and position
// Only use variables for the x, y, width, height and color(r, g, b) for each ellipse.
// REUSE THE SAME variables for each ellipse
// DO NOT USE: objects, arrays, loops, animation, custom self created functions or the random function

"use strict";

function setup() {
    console.log("go")
    createCanvas(400, 400);

    //first ellipse
    let x = 100;
    let y = 100;
    let w = 50;
    let h = 80;
    let r = 255;
    let g = 0;
    let b = 0;
    fill(r, g, b);
    ellipse(x, y, w, h);

    //second ellipse
    x = 200;
    y = 150;
    w = 80;
    h = 40;
    r = 0;
    g = 255;
    b = 0;
    fill(r, g, b);
    ellipse(x, y, w, h);

    //third ellipse
    x = 300;
    y = 200;
    w = 60;
    h = 60;
    r = 0;
    g = 0;
    b = 255;
    fill(r, g, b);
    ellipse(x, y, w, h);
}

function draw() {

}