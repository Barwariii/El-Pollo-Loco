/**
 * Represents the player's keyboard input state.
 * Handles detection for arrow keys, space (jump), and D (throw) key.
 * Also includes logic for handling mobile touch controls.
 * @class Keyboard
 * @property {boolean} LEFT - Whether the left arrow key is pressed.
 * @property {boolean} RIGHT - Whether the right arrow key is pressed.
 * @property {boolean} UP - Whether the up arrow key is pressed.
 * @property {boolean} DOWN - Whether the down arrow key is pressed.
 * @property {boolean} SPACE - Whether the spacebar is pressed.
 * @property {boolean} D - Whether the 'D' key is pressed.
 * @property {boolean} dKeyhandled - Whether the 'D' key press has already been handled once.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    dKeyhandled = false;

    /**
     * Checks if the D key was pressed once without repeat.
     * @returns {boolean} True if D was pressed once, false otherwise.
     */
    wasDPressOnce() {
        if (this.D && !this.dKeyhandled) {
            this.dKeyhandled = true;
            return true;
        }
        return false;
    }
}

const keyboard = new Keyboard();

/**
 * Listen for keydown events and update keyboard flags for desktop controls.
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) keyboard.SPACE = true;
    if (event.keyCode == 68) {
        if (event.repeat) return;
        keyboard.D = true;
    }
});


/**
 * Listen for keyup events and reset keyboard flags when a key is released.
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 68) {
        keyboard.D = false;
        keyboard.dKeyhandled = false;
    }
});


/**
 * Sets up mobile touch controls for game actions.
 */
document.addEventListener('DOMContentLoaded', () => {

    const rightBtn = document.getElementById('rightBtnMobile');
    if (rightBtn) {
        rightBtn.addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.RIGHT = true;
        });
        rightBtn.addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.RIGHT = false;
        });
    }

    const lefttBtn = document.getElementById('leftBtnMobile');
    if (lefttBtn) {
        lefttBtn.addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.LEFT = true;
        });
        lefttBtn.addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.LEFT = false;
        });
    }

    const jumptBtn = document.getElementById('jumpBtnMobile');
    if (jumptBtn) {
        jumptBtn.addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.SPACE = true;
        });
        jumptBtn.addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.SPACE = false;
        });
    }

    const throwtBtn = document.getElementById('throwBtnMobile');
    if (throwtBtn) {
        throwtBtn.addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.D = true;
        });
        throwtBtn.addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.D = false;
            keyboard.dKeyhandled = false;
        });
    }
});
