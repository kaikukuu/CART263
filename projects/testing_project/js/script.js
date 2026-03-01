window.onload = function () {
    console.log("events!")
    // get the canvas
    let canvas = document.getElementById("testCanvas");
    //get the context
    let context = canvas.getContext("2d");

    //reference for using the canvas API: https://www.w3schools.com/jsref/api_canvas.asp

    context.fillStyle = "rgba(255,0,0,255)";

    let background_imgs = ["src/IMG_2102.jpg", "src/IMG_2103.jpg", "src/IMG_2113.jpg", "src/IMG_2114.jpg", "src/IMG_2125.jpg", "src/IMG_2126.jpg", "src/IMG_2150.jpg"];

    //add an image to the canvas in front of the backgrounds
    let foreground_imgs = ["src/IMG_2102.jpg"];

    let currentBackgroundIndex = 0;


    //function to change the background image based on the current index
    function changeBackground() {
        //background image setup
        let backgroundImg = new Image();
        backgroundImg.onload = function () {
            context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        }

        backgroundImg.src = background_imgs[currentBackgroundIndex];
    }

    function changeForeground() {
        let foregroundImg = new Image();
        foregroundImg.onload = function () {
            context.drawImage(foregroundImg, 0, 0, canvas.width, canvas.height);
        }
        foregroundImg.src = foreground_imgs[0];
    }

    //dialogue data setup
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

    //initial background and foreground setup
    changeBackground();
    changeForeground();

    //user input setup for chnaging the background image
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            currentBackgroundIndex = (currentBackgroundIndex + 1) % background_imgs.length;
            changeBackground();
        }
    });

    //user input setup for changing the dialogue text
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            console.log("Enter key pressed! Current dialogue data:", dialogueData);
        }
    });

    //video setup
    let video = document.getElementById("testVideo");
    video.src = "src/IMG_2102.mp4";
    video.load();
    video.play();

    //setup for transitioning effects between backgrounds and foregrounds
    let alpha = 0;
    let fadingIn = true;
    function fadeEffect() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.globalAlpha = 1.0;
        // Fade in the foreground image
        if (fadingIn) {
            alpha += 0.01;
        }
        // Stop fading in once the foreground image is fully visible
        if (alpha >= 1) {
            fadingIn = false;
        }
        // Fade out the foreground image after it has fully faded in
        if (!fadingIn && alpha > 0) {
            alpha -= 0.01;
        }
        requestAnimationFrame(fadeEffect);
    }
    fadeEffect();
}
