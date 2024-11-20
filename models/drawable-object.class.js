class DrawableObject {
    x = 120;
    y = 190;
    img;
    height = 250;
    width = 100;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('Image')  <img id="image" src>
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof smallChicken || this instanceof normalChicken) {
            //* Blue rectangle
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawRedFrame(ctx) {
        if (this instanceof Coins || this instanceof smallChicken || this instanceof normalChicken || this instanceof Character || this instanceof Bottles) {
            const xPos = this.x + this.offset.left;
            const yPos = this.y + this.offset.top;
            const width = this.width - this.offset.left - this.offset.right;
            const height = this.height - this.offset.top - this.offset.bottom;

            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(xPos, yPos, width, height);
            ctx.stroke();
        }
    }


loadImages(arr) {
    arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
}
    
}