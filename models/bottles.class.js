/**
 * Represents a collectible bottle in the game.
 * Bottles can be placed with an optional offset and are tracked with a static counter.
 * @class Bottles
 * @extends MovableObject
 * @property {number} y - The vertical position of the bottle.
 * @property {number} x - The horizontal position of the bottle.
 * @property {{top:number,bottom:number,left:number,right:number}} offset - Collision detection offsets.
 * @property {static number} count - Static counter to track sequential positioning.
 */
class Bottles extends MovableObject {
    static count = 0;
    height = 80;
    width = 80;
    y = 360;
    x = 200;
    offset = {
        top: 10,
        bottom: 10,
        left: 35,
        right: 25,
    };

    IMAGES_BOTTOLS = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];

    bottle_sound = new Audio('audio/bottle-sound.mp3');

    /**
     * Creates a bottle object at a random position with an optional base offset.
     * @param {number} [baseOffset=0] - Horizontal offset to apply to the bottle's position.
     */
    constructor(baseOffset = 0) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTOLS);
        this.bottle_sound.volume = 1;
        allSounds.push(this.bottle_sound);

        this.x = baseOffset + Math.floor(Math.random() * 500) + 200;

        Bottles.count++;
    }
}
