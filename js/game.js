let canvas;
let world;
let keyboard = new Keyboard();

let backgroundMusic = new Audio('audio/background-music-quick-getaway-game.mp3');
backgroundMusic.loop = true; // Loop the background music
backgroundMusic.volume = 0.1; // Set volume to 10%

let isGameStarted = false; // Variable to track if the game has started

let fullscreen; // Variable for the fullscreen element

function init() {
    canvas = document.getElementById('canvas');
    document.getElementById('volume').addEventListener('click', muteBackgroundMusic);
    fullscreen = document.getElementById('fullScreen'); // Initialize the fullscreen variable here
    fullscreen.addEventListener('click', aktiveFullscreen);

    // Fullscreen-Icon ausblenden
    // document.getElementById('fullScreen').style.display = 'none';

    // Add event listener to the start button
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        document.getElementById('start-screen').style.display = 'none'; // Hide the start screen
        startGame(); // Start the game
    });

    // Add event listener to the restart button
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        document.getElementById('gameOverScreen').style.display = 'none'; // Hide the game over screen
        restartGame(); // Restart the game
    });

    // Gemeinsamer Event-Listener für alle Restart-Buttons
    document.querySelectorAll('.restartButton').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('gameOverScreen').style.display = 'none';
            document.getElementById('winScreen').style.display = 'none';
            restartGame();
        });
    });
}

function startGame() {
    isGameStarted = true; // Mark the game as started
    backgroundMusic.play(); // Start background music
    world = new World(canvas, keyboard);
    fullscreen.style.display = 'flex'; // Show the fullscreen button
    console.log('Game started!');
}

// function restartGame() {
//     window.location.reload(); // Reload the page to restart the game
// }

// ...existing code...

function restartGame() {
    // Stoppe alle Intervalle und Animationen der alten Welt (falls vorhanden)
    if (world) {
        if (typeof world.stopAllIntervals === 'function') world.stopAllIntervals();
        // Falls du später noch cancelAnimationFrame nutzt, auch das hier stoppen!
        if (world.ctx) {
            world.ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    // Welt und Status zurücksetzen
    world = new World(canvas, keyboard);

    // Statusleisten zurücksetzen
    world.statusBarHealth.setPercentage(100);
    world.statusBarCoins.setCoinsPercentage(0);
    world.statusBarBottles.setBottlePercentage(0);

    // Musik neu starten, falls gewünscht
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();

    // Start- und Endbildschirme ausblenden
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';

    isGameStarted = true;
}

// ...existing code...


function winGame() {
    // Stop background music
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    // Display the win screen
    const winScreen = document.getElementById('winScreen');
    winScreen.style.display = 'flex'; // Show the win screen

    // Hide other UI elements
    // document.getElementById('gameOverScreen').style.display = 'none';
    // document.getElementById('fullScreen').style.display = 'none';

    console.log('You won the game!');
}

// function muteBackgroundMusic() {
//     let volumeControl = document.getElementById('volume');
//     if (backgroundMusic.paused) {
//         backgroundMusic.play(); // Play the music if it's paused
//         volumeControl.src = './img/general_icons/volume_up_24dp.svg'; // Change button text to "Mute"
//     } else {
//         backgroundMusic.pause(); // Pause the music if it's playing
//         volumeControl.src = './img/general_icons/no_sound_24dp.svg'; // Change button text to "Unmute"
//     }
// }

function muteBackgroundMusic() {
    let volumeControl = document.getElementById('volume').querySelector('img');
    if (backgroundMusic.paused) {
        // backgroundMusic.play(); // Play the music if it's paused
        if (isGameStarted) {
            backgroundMusic.play(); // Play the music only if the game has started
        }
        volumeControl.src = 'img/general_icons/volume_up_24dp.svg'; // Change icon to "volume up"
    } else {
        backgroundMusic.pause(); // Pause the music if it's playing
        volumeControl.src = 'img/general_icons/no_sound_24dp.svg'; // Change icon to "no sound"
        localStorage.setItem('musicMuted', 'true'); // <-- speichern
    }
}


function aktiveFullscreen() {
    let fullscreen = document.getElementById('fullScreen').querySelector('img');
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
        fullscreen.src = 'img/general_icons/fullscreen.svg'; // Ändert das Icon zurück zu "fullscreen"
        // fullscreen.src = 'img/general_icons/fullscreen_exit_24dp.svg'; // Change icon to "exit fullscreen"
    } else {
        document.exitFullscreen(); // Beendet den Vollbildmodus
        fullscreen.src = 'img/general_icons/fullscreen_exit_24dp.svg'; // Change icon to "exit fullscreen"
        // fullscreen.src = 'img/general_icons/fullscreen.svg'; // Ändert das Icon zurück zu "fullscreen"
    }
}


window.addEventListener("keydown", (event) => {
    console.log(event.keyCode);

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
        keyboard.D = true;
    }
    // console.log(event);

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
    }
    // console.log(event);

});