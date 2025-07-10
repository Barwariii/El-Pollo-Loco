function createLevel1() {

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

// Function to generate random enemies
function generateRandomEnemies() {
    const enemies = [];
    const enemyTypes = [smallChicken, normalChicken]; // List of enemy types without the final boss
    const numberOfEnemies = Math.floor(Math.random() * 10) + 5; // Random number of enemies (between 5 and 15)

    for (let i = 0; i < numberOfEnemies; i++) {
        const EnemyClass = enemyTypes[Math.floor(Math.random() * enemyTypes.length)]; // Random enemy type
        const xPosition = Math.floor(Math.random() * 3000) + 500; // Random X position (between 500 and 3500)
        const enemy = new EnemyClass();
        enemy.x = xPosition; // Set the random X position
        enemies.push(enemy);
    }

    // Add the final boss at the end of the level
    const endboss = new Endboss(); // Create the final boss
    endboss.x = 2600; // Set the final boss at a fixed position at the end of the level
    enemies.push(endboss);

    return enemies;
}

// Dynamically generate the enemies
const randomEnemies = generateRandomEnemies();



const level1 = new Level(
// let level1;
// function initLevel() {

// level1 = new Level(
    randomEnemies, // Use the dynamically generated enemies

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
    // coins = allCoins,
    // bottles = allBottles,
    allCoins,
    allBottles,
    allCoins.length, // Total coins
    allBottles.length // Total bottles
);

level1.totalCoins = level1.coins.length; // Set the total coins count in the level object
level1.totalBottles = level1.bottles.length; // Set the total bottles count the level object
return level1;
}


// console.log('Coins:', level1.coins); // Outputs the coins array
// console.log('Total Coins:', allCoins.length); // Debug log
// console.log('Bottles:', level1.bottles); // Outputs the bottles array
// console.log('Total Bottles:', allBottles.length); // Debug log
