class MovableObject extends DrawableObject {
    speed = 0.3;
    otherDirection = false;
    speedy = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


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


    // character.isColliding(chikcen);  Kollisionsberechnung
    isColliding(mo) {
        return this.x +this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
        // return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
        //     (this.Y + this.offsetY + this.height) >= obj.Y &&
        //     (this.Y + this.offsetY) <= (obj.Y + obj.height); //&&
            // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    hit () {
        this.energy -= 5;
        if(this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Diffrence in ms
        timepassed = timepassed / 1000; //Defrence in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log('Moving right');
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedy = 30;
    }
}