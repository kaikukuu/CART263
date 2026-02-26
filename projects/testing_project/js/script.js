window.onload = function () {
    console.log("events!")
    // get the canvas
    let canvas = document.getElementById("testCanvas");
    //get the context
    let context = canvas.getContext("2d");

    context.fillStyle = "rgba(255,0,0,255)";
    //add an image to the canvas
    let img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

    }
    img.src = "src/IMG_2103.jpg";

    //add an event listener to the button
    let button = document.getElementById("Button");
    button.addEventListener("click", function () {
        console.log("button clicked!");
        context.fillStyle = "rgba(0,255,0,255)";
        context.fillRect(canvas.width / 2, canvas.height / 2, 50, 50);
    });

    //Converting a JSON Text to a js Object
    //from https://www.geeksforgeeks.org/javascript/read-json-file-using-javascript/
    function fetchJSONData() {
        fetch('./src/json/dialogue.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Failed to fetch data:', error));
    }
    fetchJSONData();

}

