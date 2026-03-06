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
//Converting a JSON Text to a js Object
//from https://www.geeksforgeeks.org/javascript/read-json-file-using-javascript/
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
            updateDialogueDisplay(); // Update DOM after data loads
        })
        .catch(error => {
            console.error('Failed to fetch data:', error);
        });
}

// DOM elements (will be initialized when dialogue system is set up)
let dialogueTextElement = null;
let dialogueChoicesElement = null;

// Initialize DOM references
function initDialogueDOM() {
    dialogueTextElement = document.getElementById('dialogue-text');
    dialogueChoicesElement = document.getElementById('dialogue-choices');
}

// Update dialogue display in DOM
function updateDialogueDisplay() {
    if (!dialogueTextElement) return;

    const text = getCurrentDialogueText();
    dialogueTextElement.textContent = text;

    // Update choices
    const choices = getCurrentDialogueChoices();
    if (choices && choices.length > 0) {
        showDialogueChoices(choices);
    } else {
        hideDialogueChoices();
    }
}

// Show dialogue choices as buttons
function showDialogueChoices(choices) {
    if (!dialogueChoicesElement) return;

    dialogueChoicesElement.innerHTML = ''; // Clear existing
    dialogueChoicesElement.style.display = 'flex';

    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.dataset.choice = choice;
        button.addEventListener('click', () => {
            selectChoice(index);
        });
        dialogueChoicesElement.appendChild(button);
    });
}

// Hide dialogue choices
function hideDialogueChoices() {
    if (!dialogueChoicesElement) return;
    dialogueChoicesElement.style.display = 'none';
    dialogueChoicesElement.innerHTML = '';
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

    // If current part has choices, don't advance until a choice is made
    // But first check if items are collected to determine if choices should be shown
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
            // if this was an item-specific dialogue, restore previous state to return to correct position
            if (currentTrigger && currentTrigger.endsWith('_afterTrigger')) {
                restoreDialogueState();
            }
            // Special case for intro dialogue to not reset to 0 when completed, allowing background to remain
            if (!previousDialogueState) {
                currentDialogueIndex = 0; // Only reset if not restoring state
            }

            // Notify when intro dialogue completes
            if (currentTrigger === "intro" && typeof window.onIntroComplete === 'function') {
                window.onIntroComplete();
            }
        }
    }

    // Trigger background change at specific dialogue points if defined in JSON
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

    // Update DOM display after dialogue advances
    updateDialogueDisplay();
}

// Set the current dialogue trigger
function setDialogueTrigger(trigger) {
    currentTrigger = trigger;
    currentDialogueIndex = 0;
    currentPartIndex = 0;
    updateDialogueDisplay();
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

    // Trigger background change for the new location if defined in JSON
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

// Setup dialogue keyboard input -> listen for Enter to advance dialogue and arrow keys to select choices
function setupDialogueInput() {
    // Initialize DOM element references
    initDialogueDOM();

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
