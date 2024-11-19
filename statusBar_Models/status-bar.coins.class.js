class statusBarCoins extends statusBar{

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];


    percentage = 0;
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 35;
        this.width = 180;
        this.height = 50;
        this.setPercentage(0);
    }
    

    // setpercentage(50);
    // setPercentage(percentagePara) {
    //     this.percentage = percentagePara; // => 0 .... 5
    //     let imagePath = this.IMAGES_COINS[this.reolsveImageIndex()];
    //     this.img = this.imageCache[imagePath];
    // }

    // reolsveImageIndex() {
    //     if (this.percentage == 100) {
    //         return 5;
    //     } else if (this.percentage > 80) {
    //         return 4;
    //     } else if (this.percentage > 60) {
    //         return 3;
    //     } else if (this.percentage > 40) {
    //         return 2;
    //     } else if (this.percentage > 20) {
    //         return 1;
    //     } else {
    //         return 0;
    //     }
    // }
}



















