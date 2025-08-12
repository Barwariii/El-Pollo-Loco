let canvas;
let world;
let allSounds = [];

let backgroundMusic = new Audio('audio/background-music-quick-getaway-game.mp3');
backgroundMusic.loop = true; // Loop the background music
backgroundMusic.volume = 0.05; // Set volume to 10%
allSounds.push(backgroundMusic);

let isGameStarted = false; // Variable to track if the game has started
let fullscreen; // Variable for the fullscreen element


function init() {
    canvas = document.getElementById('canvas');
    document.getElementById('volume').addEventListener('click', muteBackgroundMusic);
    fullscreen = document.getElementById('fullScreen'); // Initialize the fullscreen variable here
    fullscreen.addEventListener('click', aktiveFullscreen);


    /**
     * Load music status and icon from localStorage.
     */
    const musicMuted = localStorage.getItem('musicMuted') === 'true';
    allSounds.forEach(snd => snd.muted = musicMuted);
    backgroundMusic.muted = musicMuted;
    const volumeControl = document.getElementById('volume').querySelector('img');
    if (musicMuted) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        volumeControl.src = 'img/general_icons/no_sound_24dp.svg';
    } else {
        volumeControl.src = 'img/general_icons/volume_up_24dp.svg';
    }


    /**
     * Add event listener to the start button
     */
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        document.getElementById('start-screen').style.display = 'none'; // Hide the start screen
        startGame(); // Start the game
    });


    /**
     * Add event listener to the restart button
     */
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        document.getElementById('gameOverScreen').style.display = 'none'; // Hide the game over screen
        restartGame(); // Restart the game
    });


    /**
     * event listener for restart and new game buttons.
     */
  document.getElementById('newGameButton')
    .addEventListener('click', () => {
      document.getElementById('gameOverScreen').style.display = 'none';
      restartGame();
    });

  // زر Restart في Win Screen
  document.getElementById('restartButton')
    .addEventListener('click', () => {
      document.getElementById('winScreen').style.display = 'none';
      restartGame();
    });
}


function startGame() {
    isGameStarted = true; // Mark the game as started
    document.querySelector('.mobile-controls').classList.remove('hidden-controls');
    if (localStorage.getItem('musicMuted') !== 'true') {
        backgroundMusic.play();
    }
    world = new World(canvas, keyboard);
    document.querySelector('.mobile-controls').classList.remove('hidden-controls');
    fullscreen.style.display = 'flex'; // Show the fullscreen button
}


function restartGame() {
    // Stop all intervals and animations of the old world (if any)
    document.querySelector('.mobile-controls').classList.add('hidden-controls');
    if (world) {
        if (typeof world.stopAllIntervals === 'function') world.stopAllIntervals();
        // If you use cancelAnimationFrame later, stop that here as well!
        if (world.ctx) {
            world.ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    backgroundMusic.currentTime = 0;
    // Only play music if not muted.
    if (localStorage.getItem('musicMuted') !== 'true') {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }

    // Reset world and status.
    world = new World(canvas, keyboard);
    document.querySelector('.mobile-controls').classList.remove('hidden-controls');

    // Reset status bars.
    world.statusBarHealth.setPercentage(100);
    world.statusBarCoins.setCoinsPercentage(0);
    world.statusBarBottles.setBottlePercentage(0);

    // Hide start and end screens.
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';

    isGameStarted = true;
}


function winGame() {
    if (!world) return;
    
    // Mark win state
    // world.gameWin = true;

    // // Handle endgame cleanup and UI
    // world.endgame();
    world.endState('win');
    

    // Reset music
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}


function muteBackgroundMusic() {
    let volumeControl = document.getElementById('volume').querySelector('img');

    if (backgroundMusic.muted) {
        // Unmute
        backgroundMusic.muted = false;

        if (isGameStarted) {
            backgroundMusic.play();
        }

        if (world && world.character) {
            allSounds.forEach(sound => sound.muted = false);
        }

        volumeControl.src = 'img/general_icons/volume_up_24dp.svg';
        localStorage.setItem('musicMuted', 'false');
    } else {
        // Mute
        backgroundMusic.muted = true;
        backgroundMusic.pause();

        if (world && world.character) {
            allSounds.forEach(sound => sound.muted = true);
        }

        // Update the volume control icon
        volumeControl.src = 'img/general_icons/no_sound_24dp.svg';
        localStorage.setItem('musicMuted', 'true');
    }
}


function aktiveFullscreen() {
    let fullscreen = document.getElementById('fullScreen').querySelector('img');

    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
        fullscreen.src = 'img/general_icons/fullscreen.svg'; // Change the icon back to "fullscreen".
    } else {
        document.exitFullscreen(); // Exit fullscreen mode.
        fullscreen.src = 'img/general_icons/fullscreen_exit_24dp.svg'; // Change icon to "exit fullscreen"
    }
}


/**
 * Directions overlay hiddden by clicking the button.
 */
function hideDirections() {
    const directionsOverlay = document.getElementById('directionsOverlay');
    directionsOverlay.style.display = 'none'; // Hide the overlay
}


/**
 * Directions overlay shown by clicking the button
 */
function showDirections() {
    const directionsOverlay = document.getElementById('directionsOverlay');
    directionsOverlay.style.display = 'flex'; // Show the overlay
}