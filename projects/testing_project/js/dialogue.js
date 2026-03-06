// Dialogue module - functions to be called from main script.js
let dialogueData = null;
let currentTrigger = 'intro'; // Default trigger
let currentDialogueIndex = 0;
let currentPartIndex = 0;

// Store previous dialogue state for returning after item collection
let previousDialogueState = null;

// Save current dialogue state
function saveDialogueState() {
    previousDialogueState = {
        trigger: currentTrigger,
        dialogueIndex: currentDialogueIndex,
        partIndex: currentPartIndex
    };
}

// Restore previous dialogue state
function restoreDialogueState() {
    if (previousDialogueState) {
        currentTrigger = previousDialogueState.trigger;
        currentDialogueIndex = previousDialogueState.dialogueIndex;
        currentPartIndex = previousDialogueState.partIndex;
        previousDialogueState = null;
    }
}

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

// Get current dialogue choices if available
function getCurrentDialogueChoices() {
    if (!dialogueData || !dialogueData[currentTrigger]) return null;
    const currentDialogue = dialogueData[currentTrigger][currentDialogueIndex];
    let choices = currentDialogue ? currentDialogue.next : null;

    // Filter out "ending" choice if not all items are collected
    if (choices && choices.includes('ending')) {
        if (typeof window.checkAllItemsCollected === 'function' && !window.checkAllItemsCollected()) {
            choices = choices.filter(choice => choice !== 'ending');
        }
    }

    return choices;
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

    // Check if current dialogue has choices - if so, check if items are collected first
    const choices = getCurrentDialogueChoices();
    if (choices && choices.length > 0) {
        // Check if all items in current location are collected before showing choices
        if (typeof window.checkItemsCollected === 'function') {
            const allItemsCollected = window.checkItemsCollected();
            if (!allItemsCollected) {
                // Don't show choices yet, items not collected
                return;
            }
        }
        // Items collected, choices can be shown
        return;
    }

    currentPartIndex++;
    const nextPartKey = `t${currentPartIndex + 1}`;
    if (!currentDialogue[nextPartKey]) {
        // No more parts, go to next dialogue
        currentDialogueIndex++;
        currentPartIndex = 0;
        if (currentDialogueIndex >= dialogueData[currentTrigger].length) {
            // End of dialogue section reached
            // if this was an item-specific trigger, return to previous location
            if (currentTrigger && currentTrigger.endsWith('_afterTrigger')) {
                restoreDialogueState();
            }
            // Don't reset dialogue index if we restored state - keep the exact position
            if (!previousDialogueState) {
                currentDialogueIndex = 0; // Only reset if not restoring state
            }

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

// Handle choice selection
function selectChoice(choiceIndex) {
    const choices = getCurrentDialogueChoices();
    if (!choices || choiceIndex < 0 || choiceIndex >= choices.length) return;

    const selectedTrigger = choices[choiceIndex];
    setDialogueTrigger(selectedTrigger);

    // Notify about the choice selection and trigger background changes
    if (typeof window.onDialogueChoiceSelected === 'function') {
        window.onDialogueChoiceSelected(selectedTrigger);
    }

    // Trigger background change for the new location
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
        }
    }
}

// Draw a dialogue box on the canvas
function drawDialogueBox(canvas, context, boxHeight = 150) {
    const text = getCurrentDialogueText();
    const choices = getCurrentDialogueChoices();

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
    let textY = boxY + padding + 20;
    const maxWidth = boxWidth - (padding * 2);
    const textX = boxX + padding;

    // Draw main dialogue text
    context.fillText(text, textX, textY, maxWidth);

    // Draw choices if available
    if (choices && choices.length > 0) {
        textY += 40; // Add space after main text

        // Draw choice instructions
        context.fillStyle = "yellow";
        context.font = "14px Roboto";
        context.fillText("Choose your path:", textX, textY);
        textY += 25;

        // Draw each choice
        context.fillStyle = "white";
        context.font = "16px Roboto";
        choices.forEach((choice, index) => {
            const choiceText = `${index === 0 ? '← Left:' : '→ Right:'} ${choice}`;
            context.fillText(choiceText, textX + 20, textY);
            textY += 25;
        });

        // Draw input hint
        textY += 10;
        context.fillStyle = "gray";
        context.font = "12px Roboto";
        context.fillText("Use ← → arrow keys to choose", textX, textY);
    }
}

// Setup dialogue keyboard input
function setupDialogueInput() {
    document.addEventListener("keydown", function (event) {
        const choices = getCurrentDialogueChoices();

        if (choices && choices.length > 0) {
            // Handle choice selection with arrow keys
            if (event.key === "ArrowLeft") {
                selectChoice(0); // Left choice (forest)
                console.log("Left arrow pressed! Selected:", choices[0]);
                event.preventDefault();
            } else if (event.key === "ArrowRight") {
                selectChoice(1); // Right choice (town)
                console.log("Right arrow pressed! Selected:", choices[1]);
                event.preventDefault();
            }
        } else {
            // Normal dialogue advancement with Enter
            if (event.key === "Enter") {
                // close media box if it's open
                if (typeof window.isMediaBoxOpen === 'function' && window.isMediaBoxOpen()) {
                    if (typeof window.closeMediaBox === 'function') {
                        window.closeMediaBox();
                    }
                } else {
                    // Otherwise advance dialogue
                    advanceDialogue();
                    console.log("Enter key pressed! Current dialogue:", getCurrentDialogueText());
                }
            }
        }
    });
}
