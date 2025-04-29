let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');

    // Add event listener to the start button
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        document.getElementById('start-screen').style.display = 'none'; // Hide the start screen
        startGame(); // Start the game
    });

    // Add event listener to the restart button
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
        document.getElementById('game-over-screen').style.display = 'none'; // Hide the game over screen
        restartGame(); // Restart the game
    });
}

function startGame() {
    world = new World(canvas, keyboard);
    console.log('Game started!');
}

function restartGame() {
    window.location.reload(); // Reload the page to restart the game
}

window.addEventListener("keydown", (event) => {
    console.log(event.keyCode);
    
    if(event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(event.keyCode == 38) {
        keyboard.UP = true;
    }

    if(event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(event.keyCode == 68) {
        keyboard.D = true;
    }
    // console.log(event);
    
});


window.addEventListener("keyup", (event) => {
    if(event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(event.keyCode == 38) {
        keyboard.UP = false;
    }

    if(event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(event.keyCode == 68) {
        keyboard.D = false;
    }
    // console.log(event);
    
});