class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds = [
        new Cloud()
    ]

    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 80)
    ]
    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // hier werden wir auf canvas zeile 10 zugreifen
        this.draw();
    }



    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)


        // enemies for-loop
        this.addToMap(this.character);
        // this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        
        
        // this.enemies.forEach(enemy => {
        //     // this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        //     this.addToMap(enemy);
        // });


        // // clouds for-loop
        // this.clouds.forEach(cloud => {
        //     // this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        //     this.addToMap(cloud);
        // });


        // this.backgroundObjects.forEach((bgo)=> {
        //     this.addToMap(bgo);
        // })


        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.backgroundObjects);
        // darw() wird immer wieder aufgerufen
        let self = this; // wir haben da this in eine variable reingepackt da da bei aufrufen in requestAnimationFrame this wird nicht errkant
        requestAnimationFrame(function() {
            self.draw();
        });

    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        } )
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

}