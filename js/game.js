let canvas;
let ctx;
// let character = new Character();

// let enemies = [
//     new Chicken(),
//     new Chicken(),
//     new Chicken(),
// ];

let world = new World();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    console.log('My charechter is', world.character);
    

    // character.src = '../img/2_character_pepe/2_walk/W-21.png';


    // ctx.drawImage(character, 20, 20, 50, 120);
}