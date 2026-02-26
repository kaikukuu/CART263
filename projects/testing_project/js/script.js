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

    let dialogueData = null;

    //Converting a JSON Text to a js Object
    //from https://www.geeksforgeeks.org/javascript/read-json-file-using-javascript/
    function fetchJSONData() {
        fetch('/projects/testing_project/dialogue.json')
            .then(response => {
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                dialogueData = data;
                console.log("Dialogue data loaded:", data);
            })
            .catch(error => {
                console.error('Failed to fetch data:', error);
            });
    }
    fetchJSONData();

    //add an event listener to the button
    let button = document.getElementById("Button");
    button.addEventListener("click", function () {
        console.log("button clicked!");
        if (dialogueData && dialogueData["dialogue-text"] && dialogueData["dialogue-text"][0]) {
            // Display dialogue text on canvas
            context.fillStyle = "rgba(0, 0, 0, 0.7)";
            context.fillRect(50, 400, 400, 80);
            context.fillStyle = "white";
            context.font = "16px Roboto";
            context.fillText(dialogueData["dialogue-text"][0].name + ": " + dialogueData["dialogue-text"][0].t1, 60, 430);
        } else {
            console.log("Dialogue data not loaded yet!");
        }
    });
}

