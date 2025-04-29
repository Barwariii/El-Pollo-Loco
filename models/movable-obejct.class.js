class MovableObject extends DrawableObject {
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 10;
    lastHit = 0;
    coins = 0; // Initialize coins property
    bottles = 0; // Initialize bottles property


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall
            return true;
        } else {
            return this.y < 90;
        }
    }


    // character.isColliding(chikcen);  Kollisionsberechnung
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }


    collectCoin() {
        this.coins += 1;
        console.log('Coins collected:', this.coins); // Debug log
        if (this.world) {
            console.log('Total Coins in Level:', this.world.level.totalCoins); // Debug log
            const totalCoins = this.world.level.totalCoins || 1; // Fallback to 1
            // const percentage = (this.coins / totalCoins) * 100;
            const coinsPercentage = Math.min(100, Math.round((this.coins / totalCoins) * 100));

            console.log('Calculated coinsPercentage:', coinsPercentage); // Debug log
            this.world.statusBarCoins.setCoinsPercentage(coinsPercentage);
        } else {
            console.log('World is not defined!');
        }
    }


    collectBottle() {
        this.bottles += 1;
        console.log('Bottles collected:', this.bottles); // Debug log
        if (this.world) {
            console.log('Total bottles in Level:', this.world.level.totalBottles); // Debug log
            const totalBottles = this.world.level.totalBottles || 1; // Fallback to 1
            const bottlesPercentage = Math.min(100, Math.round((this.bottles / totalBottles) * 100));
            console.log('Calculated bottlesPercentage:', bottlesPercentage); // Debug log
            this.world.statusBarBottles.setBottlePercentage(bottlesPercentage);
        } else {
            console.log('World is not defined!');
        }
    }

    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
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
        return this.energy <= 0;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
    }
}