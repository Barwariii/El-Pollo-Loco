class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new statusBar();
    statusBarHealth = new statusBarHealth();
    statusBarCoins = new statusBarCoins();
    statusBarBottles = new statusBarBottles();
    throwableobjects = [];



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // hier werden wir auf canvas zeile 10 zugreifen
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {

            // check Collisions();
            this.checkCollisions();
            this.checkThrowableObject();
        }, 200);
    }

    checkThrowableObject() { //throw bottle if D key pressd
        if(this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 140); //x = 60, y = 160
            this.throwableobjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach( (enemy) => {
            if(this.character.isColliding(enemy) ) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                // this.character.energy -= 5;
                console.log('Collision with Character, energy', this.character.energy);
            }
        })

        this.level.enemies.forEach( (enemy) => {
            if(this.character.isColliding(enemy) ) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                // this.character.energy -= 5;
                console.log('Collision with Character, energy', this.character.energy);
            }
        })
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0); // move camera to left with character


        // enemies for-loop
        this.addObjectsToMap(this.level.backgroundObjects);
        
        //* --------- Space for fixed objects ---------
        this.ctx.translate(-this.camera_x, 0); // Back
        // this.addToMap(this.statusBar);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0); // Forwards

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableobjects); // throwableobjects is a variable for throw bottles  

        this.ctx.translate(-this.camera_x, 0); // move camera to right agian with character

        let self = this; // wir haben da 'this' in eine variable reingepackt da bei aufrufen in requestAnimationFrame 'this' wird nicht errkant
        requestAnimationFrame(function () {
            self.draw();
        });

    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        // this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawRedFrame(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}