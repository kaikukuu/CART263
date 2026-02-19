// Use a nested for loop to draw a grid of evenly spaced circles.
// Make the grid work for a circle size that is a multiple of 5(up to 100) - just by changing one variable.
// Make ALL circles the SAME random color - only switches on page reload
// Have this random color CHANGE for ALL CIRCLES when the user presses on space bar

// On mouse click change CIRCLES the to SQUARES if they were CIRCLES..AND to CIRCLES if they were SQUARES

// BONUS: ON LOAD: make every EVEN row CIRCLES and every ODD row SQUARES.
// Switch circles / squares on mouse click(odd row SQUARES and even row CIRCLES)..and vice versa

"use strict";
// const CIRCLE= {
//     circle(50, 50, 25);
// }

let shapeSize = 50;            // multiple of 5, change ONLY this
let cols, rows;

let shapeColor;                // shared random color
let drawCircles = true;        // toggle circles / squares

function setup() {
    console.log("go")
    createCanvas(600, 600);
    cols = width / shapeSize;
    rows = height / shapeSize;
    shapeColor = color(random(255), random(255), random(255));
}

function draw() {
    background(0);
    noStroke();
    fill(shapeColor);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let x = col * shapeSize + shapeSize / 2;
            let y = row * shapeSize + shapeSize / 2;

            if (drawCircles) {
                ellipse(x, y, shapeSize * 0.8);
            } else {
                rectMode(CENTER);
                rect(x, y, shapeSize * 0.8, shapeSize * 0.8);
            }
}
    }
}

//interaction functions
function keyPressed() {
    if (key === ' ') {
        shapeColor = color(random(255), random(255), random(255));
    }
}

function mousePressed() {
    drawCircles = !drawCircles;
}