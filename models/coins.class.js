/**
 * Represents a collectible coin in the game.
 * Coins are placed in sequence and tracked with a static counter.
 * @class Coins
 * @extends MovableObject
 * @property {number} y - Vertical position of the coin.
 * @property {number} x - Horizontal position of the coin.
 * @property {{top:number,bottom:number,left:number,right:number}} offset - Collision detection offsets.
 * @property {static number} count - Static counter to track sequential placement.
 */
class Coins extends MovableObject {
    static count = 0;
    height = 120;
    width = 120;
    y = 120;
    x = 300;
    offset = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40,
    };

    IMAGES_Coins = [
        'img/8_coin/coin_1.png',
    ];

    /**
     * Creates a coin at a position determined by the static count and optional base offset.
     * @param {number} [baseOffset=0] - Horizontal offset to apply to the coin's position.
     */
    constructor(baseOffset = 0) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_Coins);

        this.x = baseOffset + Coins.count * 40;

        Coins.count++;
    }
}
