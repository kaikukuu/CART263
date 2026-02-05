window.onload = setup;
function setup() {
    console.log("events!")

    let button = document.getElementById("Button");
    button.addEventListener("click", function () {
        console.log("Button clicked!");
    });
}

