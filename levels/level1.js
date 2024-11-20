//! coins section
// Reset the counter for the first set of coins
Coins.count = 0;

// Create the first set of coins (no offset)
const firstSetOfCoins = [
    new Coins(600),
    new Coins(600),
    new Coins(600)
];

// Reset the counter again for the second set of coins
Coins.count = 0;

// Create the second set of coins with a 500px offset
const secondSetOfCoins = [
    new Coins(1300),  // Pass 500px offset to start this set further right
    new Coins(1300),
    new Coins(1300)
];

// Combine both sets into a single array
const allCoins = [
    ...firstSetOfCoins,
    ...secondSetOfCoins
];

//! salsa bottles section
// Reset the counter for the first set of Bottles
Bottles.count = 0;

// Create the first set of Bottles (no offset)
const firstSetOfBottles = [
    new Bottles(500),
    new Bottles(550)
];

// Reset the counter again for the second set of Bottles
Bottles.count = 0;

// Create the second set of Bottles with a 500px offset
const secondSetOfBottles = [
    new Bottles(800)  // Pass 500px offset to start this set further right
];

Bottles.count = 0;

// Create the second set of Bottles with a 500px offset
const thirdSetOfBottles = [
    new Bottles(1200)  // Pass 500px offset to start this set further right
];


// Bottles.count = 0;

// Create the second set of Bottles with a 500px offset
const fourthSetOfBottles = [
    new Bottles(1400),  // Pass 500px offset to start this set further right
    new Bottles(1450)  // Pass 500px offset to start this set further right
];

// Combine both sets into a single array
const allBottles = [
    ...firstSetOfBottles,
    ...secondSetOfBottles,
    ...thirdSetOfBottles,
    ...fourthSetOfBottles
];



const level1 = new Level(
    [
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new normalChicken(),
        new normalChicken(),
        new normalChicken(),
        new Endboss()
    ],
    [
        new Cloud(),
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

    ],


    coins = allCoins,
    bottles = allBottles

);

console.log('Coins:', level1.coins); // Gibt das Coins-Array aus
console.log('Bottles:', level1.bottles); // Gibt das Bottles-Array aus