/**
 * Status bar for displaying the player's health.
 * Extends the generic statusBar class and initializes with health-specific images.
 * @class statusBarHealth
 * @extends statusBar
 */
class statusBarHealth extends statusBar {

    /**
     * Array of images representing different health levels (0% to 100% in steps of 20%).
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Current health percentage (default is 100%).
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates an instance of statusBarHealth.
     * Loads all health bar images and sets initial properties.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 65;
        this.width = 180;
        this.height = 50;
        this.setPercentage(100);
    }
}
