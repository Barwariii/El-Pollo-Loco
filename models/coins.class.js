class Coins extends MovableObject {
    static count = 0;  // Static counter to position coins in sequence
    height = 120;
    width = 120;
    y = 120;
    x = 300;
    offset = {
        top: 40,
        bottom: 40,
        left: 2,
        right: 2,
    };

    IMAGES_Coins = [
        'img/8_coin/coin_1.png',
    ];


    constructor(baseOffset = 0) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_Coins);


        // this.x = 200 + Math.random() * 300;

        // Set each coin’s position based on the count
        // Set each coin’s x position based on the count
        this.x = baseOffset + Coins.count * (40);  // Adjust `10` to change spacing

        // Increment the counter for the next coin
        Coins.count++;
    }

}