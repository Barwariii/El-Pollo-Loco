class MovableObject {
    x = 120;
    y = 190;
    img;
    height = 250;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.3;
    otherDirection = false;
    speedy = 0;
    acceleration = 2.5;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedy > 0) {
                this.y -= this.speedy;
                this.speedy -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 90;
    }


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('Image')  <img id="image" src>
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log('Moving right');

    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    
    jump() {
        this.speedy = 30;
    }
}