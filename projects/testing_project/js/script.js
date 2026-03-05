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

    // Define locations with items only (backgrounds are now dialogue-driven)
    let locations = [
        {
            items: [
                { x: 150, y: 200, width: 50, height: 50, smallImg: new Image(), zoomedImg: 'src/IMG_2102.jpg', collected: false },
                { x: 300, y: 150, width: 50, height: 50, smallImg: new Image(), zoomedImg: 'src/IMG_2103.jpg', collected: false }
            ],
            dialogueTrigger: "clearing"
        },
        {
            items: [
                { x: 200, y: 250, width: 50, height: 50, smallImg: new Image(), zoomedImg: 'src/IMG_2113.jpg', collected: false },
                { x: 350, y: 100, width: 50, height: 50, smallImg: new Image(), zoomedImg: 'src/IMG_2114.jpg', collected: false }
            ],
            dialogueTrigger: "forest"
        },
        {
            items: [
                { x: 100, y: 300, width: 50, height: 50, smallImg: new Image(), zoomedImg: 'src/IMG_2125.jpg', collected: false }
            ],
            dialogueTrigger: "alley"
        }
    ];

    // Load item images for all locations
    locations.forEach(location => {
        location.items.forEach((item, index) => {
            // Assign small images based on index 
            const smallImgs = ['src/IMG1.png', 'src/IMG2.png', 'src/IMG3.png', 'src/IMG4.png', 'src/IMG5.png'];
            item.smallImg.src = smallImgs[index % smallImgs.length];
        });
    });

    //add an image to the canvas in front of the backgrounds
    // array holds current foreground source; we'll clear it until dialogue specifies one
    // size for current foreground image (width, height)
    let currentForegroundSize = { width: null, height: null };
    let currentLocation = locations[0]; // Start with first location
    let items = currentLocation.items; // Reference to current location's items
    let showMediaBox = false;
    let mediaBoxImage = null;
    let mediaBoxWidth = 300;
    let mediaBoxHeight = 200;
    let gameState = 'start'; // 'start', 'video', 'dialogue'
    let video;
    let firstDialogueAdvance = true;

    // Callback for dialogue advances to trigger background changes
    window.onDialogueAdvance = function (dialogueIndex, partIndex) {        // First Enter press after video reveals the background
        if (gameState === 'dialogue' && firstDialogueAdvance) {
            backgroundVisible = true;
            firstDialogueAdvance = false;
            // Don't advance dialogue on first press, just reveal background
            return;
        }
        //TODO: add more specific triggers for dialogue events based on dialogue index and part index
        // Backgrounds are now dialogue-driven, specified in dialogue.json
        // Clear foreground if current dialogue doesn't specify one
        const currentDialogue = dialogueData && dialogueData[currentTrigger] ? dialogueData[currentTrigger][dialogueIndex] : null;
        if (currentDialogue && !currentDialogue.foreground) {
            currentForegroundImg = null;
        }
    };

    // Callback when dialogue specifies a background/foreground change
    window.onDialogueBackgroundChange = function (backgroundSrc, foregroundSrc) {
        if (backgroundSrc) {
            // Find location by matching dialogue trigger
            const newLocation = locations.find(loc => loc.dialogueTrigger === currentTrigger) || currentLocation;
            if (newLocation !== currentLocation) {
                currentLocation = newLocation;
                items = currentLocation.items;
                // Reset collected items when entering new location
                items.forEach(item => item.collected = false);
            }
            // Load background image directly from dialogue
            loadBackgroundImage(backgroundSrc);
            backgroundVisible = true; // Make background visible when dialogue specifies it
        }

        if (foregroundSrc) {
            currentForegroundImg = null; // clear old foreground
            // optionally dialogue may provide size via additional argument
            if (arguments.length > 2 && arguments[2]) {
                currentForegroundSize = Object.assign({}, arguments[2]);
            } else {
                currentForegroundSize = { width: null, height: null };
            }
            loadForegroundImage(foregroundSrc);
        } else {
            // clear if dialogue has no foreground for this entry
            currentForegroundImg = null;
            currentForegroundSize = { width: null, height: null };
        }
    };

    // Callback for when intro dialogue completes
    window.onIntroComplete = function () {
        gameState = 'video';
        video.play();
    };
    //user input setup
    document.addEventListener("keydown", function (event) {
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
        // Transition to the first location dialogue after video
        window.setDialogueTrigger("clearing");
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

            // Redraw background image if it's been revealed or set by dialogue
            if (backgroundVisible && currentBackgroundImg) {
                // Draw image maintaining aspect ratio, cropping to cover canvas
                const scale = Math.max(canvas.width / currentBackgroundImg.width, canvas.height / currentBackgroundImg.height);
                const scaledWidth = currentBackgroundImg.width * scale;
                const scaledHeight = currentBackgroundImg.height * scale;
                const x = (canvas.width - scaledWidth) / 2;
                const y = (canvas.height - scaledHeight) / 2;
                context.drawImage(currentBackgroundImg, x, y, scaledWidth, scaledHeight);
            }

            // Draw foreground image if available (over background, behind items)
            if (backgroundVisible && currentForegroundImg) {
                if (currentForegroundSize.width && currentForegroundSize.height) {
                    // draw centered using provided size
                    const fx = (canvas.width - currentForegroundSize.width) / 2;
                    const fy = (canvas.height - currentForegroundSize.height) / 2;
                    context.drawImage(currentForegroundImg, fx, fy, currentForegroundSize.width, currentForegroundSize.height);
                } else {
                    // default to cover canvas but maintain ratio
                    context.drawImage(currentForegroundImg, 0, 0, canvas.width, canvas.height);
                }
            }
            // Draw interactive items if background is visible
            if (backgroundVisible) {
                items.forEach(item => {
                    if (!item.collected && item.smallImg.complete) {
                        context.drawImage(item.smallImg, item.x, item.y, item.width, item.height);
                    }
                });
            }

            // Draw dialogue box every frame
            drawDialogueBox(canvas, context);

            // Draw media box if active
            if (showMediaBox && mediaBoxImage) {
                const boxWidth = mediaBoxWidth;
                const boxHeight = mediaBoxHeight;
                const boxX = (canvas.width - boxWidth) / 2;
                const boxY = canvas.height / 6; // Position in top third of canvas

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

    // Load background image directly from dialogue source
    function loadBackgroundImage(backgroundSrc) {
        if (backgroundSrc) {
            let backgroundImg = new Image();
            backgroundImg.onload = function () {
                currentBackgroundImg = backgroundImg;
            }
            backgroundImg.src = backgroundSrc;
        }
    }

    // Load foreground image from dialogue source
    function loadForegroundImage(foregroundSrc) {
        if (foregroundSrc) {
            let foregroundImg = new Image();
            foregroundImg.onload = function () {
                currentForegroundImg = foregroundImg;
            }
            foregroundImg.src = foregroundSrc;
        }
    }

    function drawMediaBox(imageSrc, boxWidth = 300, boxHeight = 200) {
        showMediaBox = true;
        mediaBoxWidth = boxWidth;
        mediaBoxHeight = boxHeight;
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
                gameState = 'dialogue';
                window.setDialogueTrigger("intro");
                currentDialogueIndex = 0;
                currentPartIndex = 0;
                firstDialogueAdvance = false; // Allow immediate dialogue advancement for intro
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
        } else if (gameState === 'dialogue' && backgroundVisible) {
            // Check for item clicks
            for (let item of items) {
                if (!item.collected && x >= item.x && x <= item.x + item.width &&
                    y >= item.y && y <= item.y + item.height) {
                    drawMediaBox(item.zoomedImg, 400, 300); // Larger box for zoomed view
                    item.collected = true;
                    // Find the location index to determine trigger
                    const locationIndex = locations.findIndex(loc => loc === currentLocation);
                    const locationNum = locationIndex >= 0 ? locationIndex + 1 : 1;
                    // Set trigger for location-specific dialogue after item collection
                    window.setDialogueTrigger(`location${locationNum}_afterTrigger`);
                    break;
                }
            }
        }
    });
}
