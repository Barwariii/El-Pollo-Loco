class Cloud extends MovableObject {
    y = -5;
    // img\5_background\layers\4_clouds\1.png

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500;
        // this.y = 5;
        this.width = 500;
        this.height = 300;
    }
}