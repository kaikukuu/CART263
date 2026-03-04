window.onload = function () {
    console.log("events!")
    // get the canvas
    let canvas = document.getElementById("testCanvas");
    //get the context
    let context = canvas.getContext("2d");

    //reference for using the canvas API: https://www.w3schools.com/jsref/api_canvas.asp

    function resizeCanvas() {
        const ratio = 500 / 500;          // aspect ratio (1:1)
        const maxWidth = window.innerWidth * 0.9;  // 90% of viewport width
        const maxHeight = window.innerHeight * 0.9; // 90% of viewport height

        // Calculate size that fits in viewport while maintaining aspect ratio
        let w = maxWidth;
        let h = w / ratio;

        // If height exceeds viewport, scale down based on height instead
        if (h > maxHeight) {
            h = maxHeight;
            w = h * ratio;
        }

        canvas.width = w;
        canvas.height = h;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    context.fillStyle = "rgba(255,0,0,255)";

    // Initialize dialogue system
    fetchDialogueData();
    setupDialogueInput();

    let background_imgs = ["src/IMG_2102.jpg", "src/IMG_2103.jpg", "src/IMG_2113.jpg", "src/IMG_2114.jpg", "src/IMG_2125.jpg", "src/IMG_2126.jpg", "src/IMG_2150.jpg"];

    //add an image to the canvas in front of the backgrounds
    let foreground_imgs = ["src/IMG_2102.jpg"];

    let currentBackgroundIndex = 0;
    let currentBackgroundImg = null;

    //function to change the background image based on the current index
    function changeBackground() {
        //background image setup
        let backgroundImg = new Image();
        backgroundImg.onload = function () {
            currentBackgroundImg = backgroundImg;
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



    //video setup
    let video = document.getElementById("testVideo");
    if (video) {
        video.src = "src/IMG_2102.mp4";
        video.load();
        video.play();
    }

    //setup for transitioning effects between backgrounds and foregrounds
    let alpha = 0;
    let fadingIn = true;
    function fadeEffect() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.globalAlpha = 1.0;

        // Draw a solid color background for now
        context.fillStyle = "rgb(49, 49, 49)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Redraw background image if loaded
        if (currentBackgroundImg) {
            context.drawImage(currentBackgroundImg, 0, 0, canvas.width, canvas.height);
        }

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

        // Draw dialogue box every frame
        drawDialogueBox(canvas, context, "This is a dialogue box. It can display text for the player to read.");

        requestAnimationFrame(fadeEffect);
    }
    fadeEffect();

    function drawMediaBox(imageSrc, boxWidth = 300, boxHeight = 200) {
        const img = new Image();
        img.onload = function () {
            // Calculate center position
            const boxX = (canvas.width - boxWidth) / 2;
            const boxY = (canvas.height - boxHeight) / 2;

            // Draw semi-transparent background box
            context.fillStyle = "rgba(255, 255, 255, 0.75)";
            context.fillRect(boxX, boxY, boxWidth, boxHeight);

            // Draw border (optional)
            context.strokeStyle = "rgba(0, 0, 0, 0.3)";
            context.lineWidth = 2;
            context.strokeRect(boxX, boxY, boxWidth, boxHeight);

            // Calculate image dimensions to fit inside the box
            const padding = 20;
            const maxImgWidth = boxWidth - (padding * 2);
            const maxImgHeight = boxHeight - (padding * 2);
            let imgWidth = img.width;
            let imgHeight = img.height;

            // Scale image to fit, maintaining aspect ratio
            const ratio = Math.min(maxImgWidth / imgWidth, maxImgHeight / imgHeight);
            imgWidth *= ratio;
            imgHeight *= ratio;

            // Center image within the box
            const imgX = boxX + (boxWidth - imgWidth) / 2;
            const imgY = boxY + (boxHeight - imgHeight) / 2;

            // Draw the image
            context.drawImage(img, imgX, imgY, imgWidth, imgHeight);
        };
        img.src = imageSrc;
    }

    // Call it in response to a trigger
    document.addEventListener("keydown", function (event) {
        if (event.key === "m") {  // press 'm' to show media box
            drawMediaBox("src/IMG_2102.jpg", 300, 200);
        }
    });
}
