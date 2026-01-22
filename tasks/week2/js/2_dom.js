window.onload = setup
function setup() {
    console.log("running setup");

    // // Note: document.getElementById() returns ONLY the 1st element it encounters in the DOM tree with the matching ID.Ensure that all your elements have unique ID's (if you are using them to access in js).
    // console.log(document.getElementById("one"));

    // // Note that - the document.querySelect() function ALWAYS returns the first match found.
    // console.log(document.querySelector("#one"));

    // // Note: Even if there is only one element with that tag name, Javascript will return a list(array) with one element in it.
    // console.log(document.getElementsByTagName("div"));

    // // And then since what is being returned is an array: we use array syntax to access:

    // console.log(document.getElementsByTagName("div").length);

    // console.log(document.getElementsByTagName("div")[0]);

    // // If we want to NOT return an array - and for some reason only want to return the first match we could use document.querySelect() i.e.:

    // console.log(document.querySelector("div"));

    console.log(document.querySelectorAll("div"));
    console.log(document.querySelectorAll("div").length);
    console.log(document.querySelectorAll("div")[0]);

    console.log(document.getElementsByClassName("square_shape"));
    console.log(document.getElementsByClassName("square_shape").length);
    console.log(document.getElementsByClassName("square_shape")[0]);

    // And again if we want to NOT return an array - and for some reason only want to return the first match we could use document.querySelect() i.e.:

    console.log(document.querySelector(".square_shape"));

    //generic class selector that returns ALL matches:
    console.log(document.querySelectorAll(".square_shape"));
    console.log(document.querySelectorAll(".square_shape").length);
    console.log(document.querySelectorAll(".square_shape")[0])

    // innerHTML holds a ref to the HTML container within an element allowing us to easily access or change it:
    console.log(document.getElementById("two").innerHTML);
    // textContent holds a ref to the TEXT content within an element allowing us to easily access or change it:
    console.log(document.getElementById("two").textContent);
    //(note on above: In summary: the textContent property outputs text/plain while .innerHTML outputs text/html. * Output of type text/plain is not parsed by the browser and results in the full content displaying. * Output of the type text/html tells the browser to parse it before displaying it.)


    



}
