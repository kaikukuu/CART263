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

    let background_imgs = ["src/IMG_2102.jpg", "src/IMG_2103.jpg", "src/IMG_2113.jpg", "src/IMG_2114.jpg", "src/IMG_2125.jpg", "src/IMG_2126.jpg", "src/IMG_2150.jpg", "src/IMG_2124.jpg", "src/IMG1.png", "src/IMG2.png", "src/IMG3.png", "src/IMG4.png", "src/IMG5.png"];

    //add an image to the canvas in front of the backgrounds
    let foreground_imgs = ["src/IMG_2102.jpg"];

    let currentBackgroundIndex = 0;
    let currentBackgroundImg = null;
    let showMediaBox = false;
    let mediaBoxImage = null;
    let gameState = 'start'; // 'start', 'video', 'dialogue'
    let video;
    let backgroundVisible = false;
    let firstDialogueAdvance = true;

    // Callback for dialogue advances to trigger background changes
    window.onDialogueAdvance = function (dialogueIndex, partIndex) {        // First Enter press after video reveals the background
        if (gameState === 'dialogue' && firstDialogueAdvance) {
            backgroundVisible = true;
            firstDialogueAdvance = false;
            // Don't advance dialogue on first press, just reveal background
            return;
        }
        //TODO: add more specific triggers for background changes based on dialogue index and part index
        // Example: change background after first dialogue (index 1, part 0)
        if (dialogueIndex === 1 && partIndex === 0) {
            currentBackgroundIndex = (currentBackgroundIndex + 1) % background_imgs.length;
            changeBackground();
        }
    };

    //function to change the background image based on the current index
    function changeBackground() {
        //background image setup
        let backgroundImg = new Image();
        backgroundImg.onload = function () {
            currentBackgroundImg = backgroundImg;
            // Draw image maintaining aspect ratio, cropping to cover canvas
            const scale = Math.max(canvas.width / backgroundImg.width, canvas.height / backgroundImg.height);
            const scaledWidth = backgroundImg.width * scale;
            const scaledHeight = backgroundImg.height * scale;
            const x = (canvas.width - scaledWidth) / 2;
            const y = (canvas.height - scaledHeight) / 2;
            context.drawImage(backgroundImg, x, y, scaledWidth, scaledHeight);
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
        if (event.key === "Escape") {
            showMediaBox = false;
            mediaBoxImage = null;
        }
    });



    //video setup
    video = document.createElement('video');
    video.src = "src/cometStart.mp4";
    video.preload = 'auto';
    video.playbackRate = 2; // Speed up the video (2x speed)
    video.addEventListener('ended', function () {
        gameState = 'dialogue';
        backgroundVisible = false;
        firstDialogueAdvance = true;
        // Reset dialogue to intro
        currentDialogueIndex = 0;
        currentPartIndex = 0;
    });

    //setup for transitioning effects between backgrounds and foregrounds
    function fadeEffect() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.globalAlpha = 1.0;

        if (gameState === 'start') {
            // Draw start screen
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "white";
            context.font = "24px Roboto";
            context.textAlign = "center";
            context.fillText("today I met a shooting star", canvas.width / 2, canvas.height / 2 - 50);
            // Draw start button
            context.fillStyle = "rgba(255, 255, 255, 0.8)";
            context.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 25, 100, 50);
            context.fillStyle = "black";
            context.fillText("Start", canvas.width / 2, canvas.height / 2 + 5);
            context.textAlign = "left";
        } else if (gameState === 'video') {
            // Draw video
            if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
            }

            // Draw clickable area indicator
            context.fillStyle = "rgba(255, 255, 255, 0.3)";
            context.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
            context.strokeStyle = "rgba(255, 255, 255, 0.8)";
            context.lineWidth = 2;
            context.strokeRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
            context.fillStyle = "white";
            context.font = "14px Roboto";
            context.fillText("Click me!", canvas.width / 2 - 30, canvas.height / 2 + 5);
        } else if (gameState === 'dialogue') {
            // Draw a solid color background for now
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Redraw background image only if it's been revealed
            if (backgroundVisible && currentBackgroundImg) {
                // Draw image maintaining aspect ratio, cropping to cover canvas
                const scale = Math.max(canvas.width / currentBackgroundImg.width, canvas.height / currentBackgroundImg.height);
                const scaledWidth = currentBackgroundImg.width * scale;
                const scaledHeight = currentBackgroundImg.height * scale;
                const x = (canvas.width - scaledWidth) / 2;
                const y = (canvas.height - scaledHeight) / 2;
                context.drawImage(currentBackgroundImg, x, y, scaledWidth, scaledHeight);
            }

            // Draw dialogue box every frame
            drawDialogueBox(canvas, context);

            // Draw media box if active
            if (showMediaBox && mediaBoxImage) {
                const boxWidth = 300;
                const boxHeight = 200;
                const boxX = (canvas.width - boxWidth) / 2;
                const boxY = (canvas.height - boxHeight) / 2;

                // Draw semi-transparent background box
                context.fillStyle = "rgba(255, 255, 255, 0.75)";
                context.fillRect(boxX, boxY, boxWidth, boxHeight);

                // Draw border
                context.strokeStyle = "rgba(0, 0, 0, 0.3)";
                context.lineWidth = 2;
                context.strokeRect(boxX, boxY, boxWidth, boxHeight);

                // Calculate image dimensions to fit inside the box
                const padding = 20;
                const maxImgWidth = boxWidth - (padding * 2);
                const maxImgHeight = boxHeight - (padding * 2);
                let imgWidth = mediaBoxImage.width;
                let imgHeight = mediaBoxImage.height;

                // Scale image to fit, maintaining aspect ratio
                const ratio = Math.min(maxImgWidth / imgWidth, maxImgHeight / imgHeight);
                imgWidth *= ratio;
                imgHeight *= ratio;

                // Center image within the box
                const imgX = boxX + (boxWidth - imgWidth) / 2;
                const imgY = boxY + (boxHeight - imgHeight) / 2;

                // Draw the image
                context.drawImage(mediaBoxImage, imgX, imgY, imgWidth, imgHeight);
            }
        }

        requestAnimationFrame(fadeEffect);
    }
    fadeEffect();

    function drawMediaBox(imageSrc, boxWidth = 300, boxHeight = 200) {
        showMediaBox = true;
        const img = new Image();
        img.onload = function () {
            mediaBoxImage = img;
        };
        img.src = imageSrc;
    }

    // Canvas click listener for interactive elements
    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (gameState === 'start') {
            // Check if click is on start button (center area)
            const buttonX = canvas.width / 2 - 50;
            const buttonY = canvas.height / 2 - 25;
            const buttonWidth = 100;
            const buttonHeight = 50;
            if (x >= buttonX && x <= buttonX + buttonWidth &&
                y >= buttonY && y <= buttonY + buttonHeight) {
                gameState = 'video';
                video.play();
            }
        } else if (gameState === 'video') {
            // Clickable area for media box
            const clickableX = canvas.width / 2 - 50;
            const clickableY = canvas.height / 2 - 50;
            const clickableWidth = 100;
            const clickableHeight = 100;
            if (x >= clickableX && x <= clickableX + clickableWidth &&
                y >= clickableY && y <= clickableY + clickableHeight) {
                drawMediaBox("src/IMG_2102.jpg", 300, 200);
                // Set trigger for conditional dialogue
                window.setDialogueTrigger("afterTrigger");
            }
        }
    });
}
