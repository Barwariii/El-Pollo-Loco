class MovableObject {
    x = 120;
    y = 190;
    img;
    height = 250;
    width = 100;
    imageCache = [];


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('Image')  <img id="image" src>
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.scr = path;
            this.imageCache[path] = path;
        });

    }

    moveRight() {
        console.log('Moving right');
        
    }


    moveLeft(){
        
    }
}