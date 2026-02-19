// Create three rectangles(or squares)
// The color, size, initial positions of the three rectangles do not matter: but USE VARS / CONSTS whenever possible
// Then: update the position of the 1st rectangle whenever the mouse is clicked on the canvas
// And: update the position of the 2nd rectangle when spacebar is pressed
// Finally: update the position of the 3rd rectangle in the draw()(each frame).Only change the y position in one direction.Also: handle the bottom canvas bounds: if the rectangle is at the bottom, set it to the top of the canvas
// BONUS: every time the mouse moves on the canvas change the color of the 3rd rectangle with a new random color
// For ALL parts: DO NOT USE OBJECTS or ARRAYS
// You can use IF STATEMENTS
"use strict";
let rect1 = {
    x: 50,
    y: 50,
    w: 100,
    h: 100,
    r: 255,
    g: 0,
    b: 0
};

let rect2 = {
    x: 150,
    y: 150,
    w: 100,
    h: 100,
    r: 0,
    g: 255,
    b: 0
};

let rect3 = {
    x: 250,
    y: 250,
    w: 100,
    h: 100,
    r: 0,
    g: 0,
    b: 255
};

function setup() {
    console.log("go")
    createCanvas(400, 400);

}

function draw() {
    background(0);
    drawRect();



}

function drawRect() {
    push();
    fill(rect1.r, rect1.g, rect1.b);
    rect(rect1.x, rect1.y, rect1.w, rect1.h);
    pop();

    push();
    fill(rect2.r, rect2.g, rect2.b);
    rect(rect2.x, rect2.y, rect2.w, rect2.h);
    pop();

    push();
    fill(rect3.r, rect3.g, rect3.b);
    rect(rect3.x, rect3.y, rect3.w, rect3.h);
    pop();
    rect3.y += 1;

    if (rect3.y > height - 100) {
        rect3.y = 0;
    }

}

function mouseClicked() {
    rect1.y += 10;
    if (rect1.y > height - 100) {
        rect1.y = 0;
    }
}

function keyPressed(event) {
    if (keyCode == 32) {
        rect2.y += 10;
    }

    if (rect2.y > height - 100) {
        rect2.y = 0;
    }
}