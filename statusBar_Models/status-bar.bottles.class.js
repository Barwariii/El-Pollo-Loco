/**
 * Status bar for displaying the number of bottles collected by the player.
 * Extends the generic statusBar class to use bottle-specific images.
 * @class statusBarBottles
 * @extends statusBar
 * @property {number} percentage - Current fill percentage of the bottle status bar.
 */
class statusBarBottles extends statusBar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    bottlesPercentage = 0;

    /**
     * Creates a new bottle status bar instance with default position, size, and images loaded.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 180;
        this.height = 50;
        this.setBottlePercentage(0);
    }
}
