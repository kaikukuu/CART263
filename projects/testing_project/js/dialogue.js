// Dialogue module - functions to be called from main script.js
let dialogueData = null;
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
    if (!dialogueData || !dialogueData["dialogue-text"]) return "Loading dialogue...";

    const currentDialogue = dialogueData["dialogue-text"][currentDialogueIndex];
    if (!currentDialogue) return "End of dialogue.";

    const partKey = `t${currentPartIndex + 1}`;
    const text = currentDialogue[partKey];
    if (!text) return "End of dialogue.";

    return `${currentDialogue.name}: ${text}`;
}

// Advance to next dialogue part
function advanceDialogue() {
    if (!dialogueData || !dialogueData["dialogue-text"]) return;

    const currentDialogue = dialogueData["dialogue-text"][currentDialogueIndex];
    if (!currentDialogue) return;

    currentPartIndex++;
    const nextPartKey = `t${currentPartIndex + 1}`;
    if (!currentDialogue[nextPartKey]) {
        // No more parts, go to next dialogue
        currentDialogueIndex++;
        currentPartIndex = 0;
        if (currentDialogueIndex >= dialogueData["dialogue-text"].length) {
            currentDialogueIndex = 0; // Loop back or handle end
        }
    }

    // Trigger background change at specific dialogue points
    if (typeof window.onDialogueAdvance === 'function') {
        window.onDialogueAdvance(currentDialogueIndex, currentPartIndex);
    }
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
