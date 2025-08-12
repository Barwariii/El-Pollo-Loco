/**
 * Status bar for displaying the number of coins collected by the player.
 * Extends the generic statusBar class to use coin-specific images.
 * @class statusBarCoins
 * @extends statusBar
 * @property {number} coinsPercentage - Current fill percentage of the coin status bar.
 */
class statusBarCoins extends statusBar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    coinsPercentage = 0;

    /**
     * Creates a new coin status bar instance with default position, size, and images loaded.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 35;
        this.width = 180;
        this.height = 50;
        this.setCoinsPercentage(0);
    }
}
