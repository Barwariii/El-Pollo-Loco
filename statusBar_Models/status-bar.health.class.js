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


}
