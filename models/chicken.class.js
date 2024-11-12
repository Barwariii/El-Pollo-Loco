// class Chicken {
//     x;
//     y;


//     moveLeft(){

//     }
// }


class Chicken extends MovableObject {
    // jetzt Chicken hat alle eigenchaften die MovableObject hat


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;
    }
}