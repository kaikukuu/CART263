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
    // (setupDialogueInput will be called later once helper functions like
    // closeMediaBox/isMediaBoxOpen are defined)

    // Define locations as a simple mapping from dialogue triggers to items
    const locations = {
        "clearing": [
            { x: 150, y: 200, width: 50, height: 50, smallImg: 'src/imgs/CAP1.png', zoomedImg: 'src/imgs/CAP1.png', collected: false },
            { x: 300, y: 150, width: 50, height: 50, smallImg: 'src/imgs/CAP2.png', zoomedImg: 'src/imgs/CAP2.png', collected: false }
        ],
        "forest": [
            { x: 200, y: 250, width: 50, height: 50, smallImg: 'src/imgs/CAP1.png', zoomedImg: 'src/imgs/CAP1.png', collected: false },
            { x: 350, y: 100, width: 50, height: 50, smallImg: 'src/imgs/CAP2.png', zoomedImg: 'src/imgs/CAP2.png', collected: false }
        ],
        "alley": [
            { x: 100, y: 300, width: 50, height: 50, smallImg: 'src/imgs/CAP1.png', zoomedImg: 'src/imgs/CAP1.png', collected: false },
            { x: 250, y: 200, width: 50, height: 50, smallImg: 'src/imgs/CAP2.png', zoomedImg: 'src/imgs/CAP2.png', collected: false }
        ]
    };

    // Load item images for all locations
    Object.values(locations).forEach(locationItems => {
        locationItems.forEach((item) => {
            // Create Image objects from the string paths
            const smallImgObj = new Image();
            smallImgObj.src = item.smallImg;
            item.smallImg = smallImgObj;

            const zoomedImgObj = new Image();
            zoomedImgObj.src = item.zoomedImg;
            item.zoomedImg = zoomedImgObj;
        });
    });

    //add an image to the canvas in front of the backgrounds
    // array holds current foreground source; we'll clear it until dialogue specifies one
    // size for current foreground image (width, height)
    let currentBackgroundImg = null;
    let currentForegroundImg = null;
    let currentForegroundSize = { width: null, height: null };
    let backgroundVisible = false;
    let currentLocation = "clearing"; // Start with clearing location
    let items = locations[currentLocation]; // Reference to current location's items
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
    window.onDialogueBackgroundChange = function (backgroundSrc, foregroundSrc, foregroundSize) {
        if (backgroundSrc) {
            // Update location based on current dialogue trigger **only if it changed**
            if (locations[currentTrigger] && currentTrigger !== currentLocation) {
                currentLocation = currentTrigger;
                items = locations[currentTrigger];
                // Reset collected items when entering a different location
                items.forEach(item => item.collected = false);
            }
            // Load background image directly from dialogue
            loadBackgroundImage(backgroundSrc);
            backgroundVisible = true; // Make background visible when dialogue specifies it
        }

        if (foregroundSrc) {
            currentForegroundImg = null; // clear old foreground
            //optionally dialogue may provide size via third argument
            if (foregroundSize) {
                currentForegroundSize = Object.assign({}, foregroundSize);
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

    // Callback for when a dialogue choice is selected
    window.onDialogueChoiceSelected = function (selectedTrigger) {
        // Update location based on selected choice's trigger if it corresponds to a location and is different from current
        if (locations[selectedTrigger] && selectedTrigger !== currentLocation) {
            currentLocation = selectedTrigger;
            items = locations[currentLocation];
            // Reset collected state of items when changing location
            items.forEach(item => item.collected = false);
        }
    };

    // Function to check if all items in current location are collected
    window.checkItemsCollected = function () {
        return items.every(item => item.collected);
    };

    // Function to check if ALL items across ALL locations are collected
    window.checkAllItemsCollected = function () {
        return Object.values(locations).every(locationItems =>
            locationItems.every(item => item.collected)
        );
    };

    // Function to close the media box
    window.closeMediaBox = function () {
        const mediaBox = document.getElementById('media-box');
        if (mediaBox) {
            mediaBox.style.display = 'none';
        }
        showMediaBox = false;
        mediaBoxImage = null;
    };

    // Helper so other modules can check if media is visible
    window.isMediaBoxOpen = function () {
        return !!showMediaBox;
    };

    // Now that all helper functions are defined, we can setup dialogue input
    setupDialogueInput();

    // Setup media box close button
    const closeMediaBtn = document.getElementById('close-media');
    if (closeMediaBtn) {
        closeMediaBtn.addEventListener('click', window.closeMediaBox);
    }

    //video setup
    video = document.createElement('video');
    video.src = "src/onlyComet.mp4";
    video.preload = 'auto';
    video.playbackRate = 4; // Speed up the video (2x speed)
    video.addEventListener('ended', function () {
        gameState = 'dialogue';
        backgroundVisible = false;
        firstDialogueAdvance = true;
        // Transition to the first location dialogue after video
        window.setDialogueTrigger("clearing");
        currentDialogueIndex = 0;
        currentPartIndex = 0;
    });

    // setup for the main game loop using requestAnimationFrame to create a fade effect and handle drawing
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
            // Draw interactive items if background is visible and not in intro
            if (backgroundVisible && currentTrigger !== 'intro') {
                items.forEach(item => {
                    if (!item.collected && item.smallImg.complete) {
                        context.drawImage(item.smallImg, item.x, item.y, item.width, item.height);
                    }
                });
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

    // Function to display media box with given image source and size
    function drawMediaBox(imageOrSrc) {
        const mediaBox = document.getElementById('media-box');
        const mediaImage = document.getElementById('media-image');

        if (!mediaBox || !mediaImage) return;

        // Handle both Image objects and string paths for flexibility
        if (imageOrSrc instanceof Image) {
            mediaImage.src = imageOrSrc.src;
        } else {
            mediaImage.src = imageOrSrc;
        }

        mediaBox.style.display = 'block';
        showMediaBox = true; // Keep for compatibility
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
                // Show dialogue box
                const dialogueBox = document.getElementById('dialogue-box');
                if (dialogueBox) {
                    dialogueBox.style.display = 'block';
                }
                window.setDialogueTrigger("intro");
                currentDialogueIndex = 0;
                currentPartIndex = 0;
                firstDialogueAdvance = false; // Allow immediate dialogue advancement for intro
            }
        } else if (gameState === 'dialogue' && backgroundVisible) {
            // Check for item clicks
            for (let item of items) {
                if (!item.collected && x >= item.x && x <= item.x + item.width &&
                    y >= item.y && y <= item.y + item.height) {
                    drawMediaBox(item.zoomedImg, 400, 300); // Larger box for zoomed view
                    item.collected = true;
                    // Save current dialogue state before switching to afterTrigger dialogue
                    saveDialogueState();
                    // Set trigger for location-specific dialogue after item collection
                    window.setDialogueTrigger(`${currentLocation}_afterTrigger`);
                    break;
                }
            }
        }
    });
}
