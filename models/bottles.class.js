class Bottles extends MovableObject {
    static count = 0;  // Static counter to position coins in sequence
    height = 80;
    width = 80;
    y = 360;
    x = 200;
    offset = {
        top: 70,
        bottom: 70,
        left: 25,
        right: 10,
    };

    IMAGES_BOTTOLS = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];

    bottle_sound = new Audio('audio/bottle-sound.mp3');

    constructor(baseOffset = 0) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTOLS);
        this.bottle_sound.volume = 1; // Set volume to 10%
        allSounds.push(this.bottle_sound);

        this.x = baseOffset + Math.floor(Math.random()* 500) + 200;

        // Increment the counter for the next coin
        Bottles.count++;
    }

}