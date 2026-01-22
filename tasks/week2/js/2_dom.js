window.onload = setup
function setup() {
    console.log("running setup");

    // Note: document.getElementById() returns ONLY the 1st element it encounters in the DOM tree with the matching ID.Ensure that all your elements have unique ID's (if you are using them to access in js).
    console.log(document.getElementById("one"));

    // Note that - the document.querySelect() function ALWAYS returns the first match found.
    console.log(document.querySelector("#one"));

    // Note: Even if there is only one element with that tag name, Javascript will return a list(array) with one element in it.
    console.log(document.getElementsByTagName("div"));

    // And then since what is being returned is an array: we use array syntax to access:

    console.log(document.getElementsByTagName("div").length);

    console.log(document.getElementsByTagName("div")[0]);

    // If we want to NOT return an array - and for some reason only want to return the first match we could use document.querySelect() i.e.:

    console.log(document.querySelector("div"));

}
