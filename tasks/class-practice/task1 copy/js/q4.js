// AGAIN USE VARIABLES / CONSTS WHENEVER POSSIBLE
// Create three rectangles: each one is the height of the canvas and 1 / 3 of the width of the canvas
// Position the first rectangle in the first third, the second in the second third and the third at the end of the canvas(three columns)
// Each rectangle should be a different blue color
// Then, IF / WHEN the mouse is over the 1st rectangle change the colour of the first rectangle to white
// Apply the same mouse behaviour to the other two rectangles
// Also: Implement the following; when /if the mouse is NOT over a given rectangle make sure that those rectangles go back to their original color
// For ALL parts: DO NOT USE ARRAYS
// You may use OBJECTS - but only for the color of the rectangles
"use strict";
let rect1 = {
    x: 0,
    y: 0,
    w: 400 / 3,
    h: 400,
    r: 0,
    g: 0,
    b: 255
};

let rect2 = {
    x: 400 / 3,
    y: 0,
    w: 400 / 3,
    h: 400,
    r: 0,
    g: 100,
    b: 255
};

let rect3 = {
    x: 400 / 3 * 2,
    y: 0,
    w: 400 / 3,
    h: 400,
    r: 0,
    g: 200,
    b: 255
};

function setup() {
    console.log("go")
    createCanvas(400, 400);


}

function draw() {
    background(255);
    drawRect();
}

function drawRect() {
    push();
    noStroke();
    fill(rect1.r, rect1.g, rect1.b);
    rect(rect1.x, rect1.y, rect1.w, rect1.h);
    pop();

    push();
    noStroke();
    fill(rect2.r, rect2.g, rect2.b);
    rect(rect2.x, rect2.y, rect2.w, rect2.h);
    pop();

    push();
    noStroke();
    fill(rect3.r, rect3.g, rect3.b);
    rect(rect3.x, rect3.y, rect3.w, rect3.h);
    pop();
}

function mouseMoved() {
    //rectangle 1
    if (mouseX > rect1.x && mouseX < rect1.x + rect1.w &&
        mouseY > rect1.y && mouseY < rect1.y + rect1.h) {
        rect1.r = 255;
        rect1.g = 255;
        rect1.b = 255;
    } else {
        rect1.r = 0;
        rect1.g = 0;
        rect1.b = 255;
    }

    //rectangle 2
    if (mouseX > rect2.x && mouseX < rect2.x + rect2.w &&
        mouseY > rect2.y && mouseY < rect2.y + rect2.h) {
        rect2.r = 255;
        rect2.g = 255;
        rect2.b = 255;
    } else {
        rect2.r = 0;
        rect2.g = 100;
        rect2.b = 255;
    }

    //rectangle 3
    if (mouseX > rect3.x && mouseX < rect3.x + rect3.w &&
        mouseY > rect3.y && mouseY < rect3.y + rect3.h) {
        rect3.r = 255;
        rect3.g = 255;
        rect3.b = 255;
    } else {
        rect3.r = 0;
        rect3.g = 200;
        rect3.b = 255;
    }
}
