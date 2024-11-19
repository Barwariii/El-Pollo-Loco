class statusBarHealth extends statusBar {

    // health statusbar images
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];


    percentage = 100;
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 65;
        this.width = 180;
        this.height = 50;
        this.setPercentage(100);
    }



    // percentage = 100;
    // constructor() {
    //     super();
    //     this.loadImages(this.IMAGES);
    //     this.x = 40;
    //     this.y = 0;
    //     this.width = 180;
    //     this.height = 50;
    //     this.setPercentage(100);
    // }


    // setpercentage(50);
    // setPercentage(percentagePara) {
    //     this.percentage = percentagePara; // => 0 .... 5
    //     let imagePath = this.IMAGES[this.reolsveImageIndex()];
    //     this.img = this.imageCache[imagePath];
    // }

    //     reolsveImageIndex() {
    //         if (this.percentage == 100) {
    //             return 5;
    //         } else if (this.percentage > 80) {
    //             return 4;
    //         } else if (this.percentage > 60) {
    //             return 3;
    //         } else if (this.percentage > 40) {
    //             return 2;
    //         } else if (this.percentage > 20) {
    //             return 1;
    //         } else {
    //             return 0;
    //         }
    //     }
}
