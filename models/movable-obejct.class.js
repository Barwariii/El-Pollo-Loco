class MovableObject {
    x = 120;
    y = 150;
    img;
    height = 250;
    width = 100;


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('Image')  <img id="image" src>
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
        
    }


    moveLeft(){
        
    }
}