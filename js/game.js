let canvas;
let world;
let allSounds = [];

let backgroundMusic = new Audio('audio/background-music-quick-getaway-game.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.05;
allSounds.push(backgroundMusic);

let isGameStarted = false; // Variable to track if the game has started
let fullscreen;


/**
 * Initializes the game by setting up canvas, UI elements, music state, and event listeners.
 * Loads saved music preferences from localStorage.
 */
function init() {
    canvas = document.getElementById('canvas');
    document.getElementById('volume').addEventListener('click', muteBackgroundMusic);
    fullscreen = document.getElementById('fullScreen');
    fullscreen.addEventListener('click', aktiveFullscreen);

    // Load music status and icon from localStorage.
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

    // Start button
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        document.getElementById('start-screen').style.display = 'none';
        startGame();
    });

    // Restart button (Game Over)
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        document.getElementById('gameOverScreen').style.display = 'none';
        restartGame();
    });

    // Restart and new game buttons
    document.getElementById('newGameButton')
        .addEventListener('click', () => {
            document.getElementById('gameOverScreen').style.display = 'none';
            restartGame();
        });

    // Restart button in Win Screen
    document.getElementById('restartButton')
        .addEventListener('click', () => {
            document.getElementById('winScreen').style.display = 'none';
            restartGame();
        });
}


/**
 * Starts the game by creating a new World instance and showing UI controls.
 */
function startGame() {
    isGameStarted = true;
    document.querySelector('.mobile-controls').classList.remove('hidden-controls');
    if (localStorage.getItem('musicMuted') !== 'true') {
        backgroundMusic.play();
    }
    world = new World(canvas, keyboard);
    document.querySelector('.mobile-controls').classList.remove('hidden-controls');
    fullscreen.style.display = 'flex';
}


/**
 * Restarts the game by resetting world state, UI, and sounds.
 */
function restartGame() {
    document.querySelector('.mobile-controls').classList.add('hidden-controls');
    if (world) {
        if (typeof world.stopAllIntervals === 'function') world.stopAllIntervals();
        if (world.ctx) {
            world.ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    backgroundMusic.currentTime = 0;
    if (localStorage.getItem('musicMuted') !== 'true') {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }

    world = new World(canvas, keyboard);
    document.querySelector('.mobile-controls').classList.remove('hidden-controls');

    world.statusBarHealth.setPercentage(100);
    world.statusBarCoins.setCoinsPercentage(0);
    world.statusBarBottles.setBottlePercentage(0);

    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';

    isGameStarted = true;
}


/**
 * Handles winning the game by ending the state and stopping the music.
 */
function winGame() {
    if (!world) return;
    world.endState('win');

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}


/**
 * Toggles background music mute/unmute and updates the volume icon and localStorage setting.
 */
function muteBackgroundMusic() {
    let volumeControl = document.getElementById('volume').querySelector('img');

    if (backgroundMusic.muted) {
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
        backgroundMusic.muted = true;
        backgroundMusic.pause();
        if (world && world.character) {
            allSounds.forEach(sound => sound.muted = true);
        }
        volumeControl.src = 'img/general_icons/no_sound_24dp.svg';
        localStorage.setItem('musicMuted', 'true');
    }
}


/**
 * Toggles fullscreen mode for the canvas and updates the fullscreen icon.
 */
function aktiveFullscreen() {
    let fullscreen = document.getElementById('fullScreen').querySelector('img');

    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
        fullscreen.src = 'img/general_icons/fullscreen.svg';
    } else {
        document.exitFullscreen();
        fullscreen.src = 'img/general_icons/fullscreen_exit_24dp.svg';
    }
}


/**
 * Hides the directions overlay.
 */
function hideDirections() {
    const directionsOverlay = document.getElementById('directionsOverlay');
    directionsOverlay.style.display = 'none';
}


/**
 * Shows the directions overlay.
 */
function showDirections() {
    const directionsOverlay = document.getElementById('directionsOverlay');
    directionsOverlay.style.display = 'flex';
}
