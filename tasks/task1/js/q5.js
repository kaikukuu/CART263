// USE VARIABLES / CONSTS WHENEVER POSSIBLE
// FOR THIS EXERCISE DO NOT USE A FOR LOOP - ONLY WHILE LOOP(S)
// Create a variable that will hold a number i.e.counter, set its value to 0
// Create an orange square(width, size and position do not matter)
// Use an object to hold the square's properties (w,h,x and y and color)
// Create a function called displaySquare() and in the body of the function implement the code to render the orange square.Call this function in the draw()
// Whenever the mouse is clicked inside the orange square increment the counter variable by 1
// Whenever the mouse is over the orange square: highlight the square to be lighter orange
// Create a helper function to check if the mouse is inside the square(i.e.checkCollisionWithSquare()), and have it return true if it is and false otherwise.USE this function for the mouse click / over functionalities.
// Create an ellipse and draw it with its center at the center of the screen
// make a variable called radius to hold the size of the ellipse
// Set the color of the ellipse to be white
// Create a variable called ellipseAlpha to hold the alpha value of the ellipse.
// Practise showing the ellipse at different sizes - change the radius(always with the same x and y)
// USE A SINGLE WHILE LOOP in the draw() to draw the same number of ellipse as that of the counter(if the counter is 1 - 1 ellipse, if the counter is 2: 2 ellipse etc...)
// Also in the while loop: each new circle should be slightly larger and make the alpha value larger(start the alpha small)
// Do not draw anything if the counter is greater than 10 or less than 1
// BONUS: make the logic for drawing a single circle into a custom function (i.e.drawCircle(x, y, radius, alpha))
// BONUS II: make another square(red) that when clicked will decrement the counter by 1 ...AND - when hovered over will be lighter red ... (make custom functions and objects as required)
// BONUS III: INSTEAD OF USING A WHILE LOOP FOR THE ELLIPSE(S) - USE A FOR LOOP...

"use strict";

let counter = 0;

let square = {
    x: 50,
    y: 50,
    w: 100,
    h: 100,
    r: 255,
    g: 165,
    b: 0,
};

let cercle = {
    x: 200,
    y: 200,
    radius: 10,
    r: 255,
    g: 255,
    b: 255,
};

let c;
let ellipseAlpha;
function setup() {
    console.log("go")
    createCanvas(400, 400);
    c = [cercle.r, cercle.g, cercle.b];

}



function draw() {
    background(0);
    ellipseAlpha = alpha(c);
    displaySquare();
    // let counterCopy = counter;
    while (counter >= 1 && counter <= 10) {
        drawEllipse();
        console.log(cercle.radius);
        // cercle.radius += 10;
        // ellipseAlpha += 25;
        // counter--;

    }
}
function displaySquare() {
    push();
    fill(square.r, square.g, square.b);
    rect(square.x, square.y, square.w, square.h);
    pop();
}
function drawEllipse() {
    push();
    stroke(255);
    fill(ellipseAlpha);
    ellipse(cercle.x, cercle.y, cercle.radius);

    pop();

}
function mouseClicked() {
    counter += 1;
    console.log(counter);
    cercle.radius += 10;
    ellipseAlpha += 25;


}
function mouseMoved() {
    if (checkCollisionWithSquare()) {
        square.r = 255;
        square.g = 200;
        square.b = 100;
    } else {
        square.r = 255;
        square.g = 165;
        square.b = 0;
    }
}
function checkCollisionWithSquare() {
    if (mouseX > square.x && mouseX < square.x + square.w &&
        mouseY > square.y && mouseY < square.y + square.h) {
        return true;
    } else {
        return false;
    }
}   