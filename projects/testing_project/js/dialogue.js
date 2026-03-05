// Dialogue module - functions to be called from main script.js
let dialogueData = null;
let currentTrigger = 'intro'; // Default trigger
let currentDialogueIndex = 0;
let currentPartIndex = 0;

// Fetch dialogue data from JSON
function fetchDialogueData() {
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

// Get current dialogue text
function getCurrentDialogueText() {
    if (!dialogueData || !dialogueData[currentTrigger]) return "Loading dialogue...";

    const currentDialogue = dialogueData[currentTrigger][currentDialogueIndex];
    if (!currentDialogue) return "End of dialogue.";

    const partKey = `t${currentPartIndex + 1}`;
    const text = currentDialogue[partKey];
    if (!text) return "End of dialogue.";

    return `${currentDialogue.name}: ${text}`;
}

// Get current dialogue background
function getCurrentDialogueBackground() {
    if (!dialogueData || !dialogueData[currentTrigger]) return null;
    const currentDialogue = dialogueData[currentTrigger][currentDialogueIndex];
    return currentDialogue ? currentDialogue.background : null;
}

// Get current dialogue foreground
function getCurrentDialogueForeground() {
    if (!dialogueData || !dialogueData[currentTrigger]) return null;
    const currentDialogue = dialogueData[currentTrigger][currentDialogueIndex];
    return currentDialogue ? currentDialogue.foreground : null;
}

// Get current dialogue foreground size (object with width/height) if provided
function getCurrentDialogueForegroundSize() {
    if (!dialogueData || !dialogueData[currentTrigger]) return null;
    const currentDialogue = dialogueData[currentTrigger][currentDialogueIndex];
    if (!currentDialogue) return null;
    if ('foregroundWidth' in currentDialogue || 'foregroundHeight' in currentDialogue) {
        return {
            width: currentDialogue.foregroundWidth || null,
            height: currentDialogue.foregroundHeight || null
        };
    }
    return null;
}

// Advance to next dialogue part
function advanceDialogue() {
    // Don't advance dialogue on first Enter press after video (just reveal background)
    if (typeof firstDialogueAdvance !== 'undefined' && firstDialogueAdvance) {
        if (typeof window.onDialogueAdvance === 'function') {
            window.onDialogueAdvance(currentDialogueIndex, currentPartIndex);
        }
        return;
    }

    if (!dialogueData || !dialogueData[currentTrigger]) return;

    const currentDialogue = dialogueData[currentTrigger][currentDialogueIndex];
    if (!currentDialogue) return;

    currentPartIndex++;
    const nextPartKey = `t${currentPartIndex + 1}`;
    if (!currentDialogue[nextPartKey]) {
        // No more parts, go to next dialogue
        currentDialogueIndex++;
        currentPartIndex = 0;
        if (currentDialogueIndex >= dialogueData[currentTrigger].length) {
            // End of dialogue section reached
            currentDialogueIndex = 0; // Loop back or handle end
            
            // Notify when intro dialogue completes
            if (currentTrigger === "intro" && typeof window.onIntroComplete === 'function') {
                window.onIntroComplete();
            }
        }
    }

    // Trigger background change at specific dialogue points
    if (typeof window.onDialogueAdvance === 'function') {
        window.onDialogueAdvance(currentDialogueIndex, currentPartIndex);
    }

    // Notify about background/foreground changes (and optional size)
    if (typeof window.onDialogueBackgroundChange === 'function') {
        const bg = getCurrentDialogueBackground();
        const fg = getCurrentDialogueForeground();
        const fgSize = getCurrentDialogueForegroundSize();
        if (bg || fg) {
            if (fgSize) {
                window.onDialogueBackgroundChange(bg, fg, fgSize);
            } else {
                window.onDialogueBackgroundChange(bg, fg);
            }
        } else if (fg === null) {
            // ensure foreground cleared when none provided
            window.onDialogueBackgroundChange(null, null);
        }
    }
}

// Set the current dialogue trigger
function setDialogueTrigger(trigger) {
    currentTrigger = trigger;
    currentDialogueIndex = 0;
    currentPartIndex = 0;
}

// Draw a dialogue box on the canvas
function drawDialogueBox(canvas, context, boxHeight = 150) {
    const text = getCurrentDialogueText();

    // Position in bottom third of canvas
    const boxWidth = canvas.width * 0.9;  // 90% of canvas width
    const boxX = (canvas.width - boxWidth) / 2;
    const boxY = canvas.height - boxHeight - 20;  // 20px from bottom

    // Draw semi-transparent background box
    context.fillStyle = "rgba(0, 0, 0, 0.7)";
    context.fillRect(boxX, boxY, boxWidth, boxHeight);

    // Draw border
    context.strokeStyle = "rgba(255, 255, 255, 0.5)";
    context.lineWidth = 2;
    context.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Draw text
    context.fillStyle = "white";
    context.font = "16px Roboto";
    const padding = 20;
    const textX = boxX + padding;
    const textY = boxY + padding + 20;
    const maxWidth = boxWidth - (padding * 2);

    // Simple text wrapping (optional - just draws the text as-is)
    context.fillText(text, textX, textY, maxWidth);
}

// Setup dialogue keyboard input
function setupDialogueInput() {
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            advanceDialogue();
            console.log("Enter key pressed! Current dialogue:", getCurrentDialogueText());
        }
    });
}
