class World {

    character = new Character();
    // coins = [
    //     new Coins(),
    //     new Coins(),
    //     new Coins()
    // ];
    // enemies = level1.enemies;
    // clouds = level1.clouds;
    // backgroundObjects = level1.backgroundObjects;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new statusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // hier werden wir auf canvas zeile 10 zugreifen
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach( (enemy) => {
                if(this.character.isColliding(enemy) ) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    // this.character.energy -= 5;
                    console.log('Collision with Character, energy', this.character.energy);
                }
            })
        }, 200);
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0); // move camera to left with character


        // enemies for-loop
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); // Forwards
        //* --------- Space for fixed objects ---------
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0); // move camera to right agian with character

        let self = this; // wir haben da this in eine variable reingepackt da da bei aufrufen in requestAnimationFrame this wird nicht errkant
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
            // this.ctx.save();
            // this.ctx.translate(mo.width, 0);
            // this.ctx.scale(-1, 1);
            // mo.x = mo.x * -1;
        }
        // this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        //* Blue rectangle
        // this.ctx.beginPath();
        // this.ctx.lineWidth = '5';
        // this.ctx.strokeStyle = 'blue';
        // this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        // this.ctx.stroke();

        if (mo.otherDirection) {
            this.flipImageBack(mo);
            // mo.x = mo.x * -1;
            // this.ctx.restore();
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