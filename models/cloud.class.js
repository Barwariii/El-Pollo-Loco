class Cloud extends MovableObject {
    y = -5;
    width = 500;
    height = 300;

    // img\5_background\layers\4_clouds\1.png

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();

    }


    animate() {
        this.moveLeft();
        // setInterval(() => {
        //     this.x -= this.speed;
        // }, 1000 / 60);
    }

}