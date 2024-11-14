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


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('Image')  <img id="image" src>
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path; //! da hate ich ein fehler und zwar bei src hatte ich scr geschrieben 
            this.imageCache[path] = img;
        });
    }


    playAnimation(images){
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
}