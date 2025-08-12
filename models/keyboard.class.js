class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    dKeyhandled = false;

    wasDPressOnce() {
        if (this.D && !this.dKeyhandled) {
            this.dKeyhandled = true;
            return true;
        }
        return false;
    }
};

const keyboard = new Keyboard();

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        if (event.repeat) return;
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
        keyboard.dKeyhandled = false;
    }
});

/**
 * touch events for mobile controls
 */
// right button for mobile
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
});

// left button for mobile
document.addEventListener('DOMContentLoaded', () => {
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
});

// jump button for mobile
document.addEventListener('DOMContentLoaded', () => {
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
});

// throw button for mobile
document.addEventListener('DOMContentLoaded', () => {
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