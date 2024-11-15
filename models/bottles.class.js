class Bottles extends MovableObject {
    static count = 0;  // Static counter to position coins in sequence
    height = 80;
    width = 80;
    y = 360;
    x = 200;


    IMAGES_BOTTOLS = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];


    constructor(baseOffset = 0) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTOLS);


        this.x = baseOffset + Math.floor(Math.random()* 500) + 200;

        // Set each coin’s position based on the count
        // Set each coin’s x position based on the count
        // this.x = baseOffset + Bottles.count * (300);  // Adjust `10` to change spacing

        // Increment the counter for the next coin
        Bottles.count++;
    }

}