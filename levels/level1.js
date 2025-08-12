/**
 * Creates and returns Level 1 of the game.
 * This function dynamically generates enemies, coins, bottles, and background objects.
 * @returns {Level} level1 - The generated level object.
 */
function createLevel1() {

    //! coins section
    Coins.count = 0;
    const firstSetOfCoins = [
        new Coins(600),
        new Coins(600),
        new Coins(600)
    ];

    Coins.count = 0;
    const secondSetOfCoins = [
        new Coins(1300),
        new Coins(1300),
        new Coins(1300)
    ];

    const allCoins = [
        ...firstSetOfCoins,
        ...secondSetOfCoins
    ];


    //! salsa bottles section
    Bottles.count = 0;
    const firstSetOfBottles = [
        new Bottles(500),
        new Bottles(550)
    ];

    Bottles.count = 0;
    const secondSetOfBottles = [
        new Bottles(800)
    ];

    Bottles.count = 0;
    const thirdSetOfBottles = [
        new Bottles(1200)
    ];

    const fourthSetOfBottles = [
        new Bottles(1400),
        new Bottles(1450)
    ];

    const allBottles = [
        ...firstSetOfBottles,
        ...secondSetOfBottles,
        ...thirdSetOfBottles,
        ...fourthSetOfBottles
    ];


    /**
     * Generates a random set of enemies for the level, plus a final boss.
     * @returns {Array<MovableObject>} enemies - Array of enemy objects including final boss.
     */
    function generateRandomEnemies() {
        const enemies = [];
        const enemyTypes = [smallChicken, normalChicken];
        const numberOfEnemies = Math.floor(Math.random() * 10) + 5;

        for (let i = 0; i < numberOfEnemies; i++) {
            const EnemyClass = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
            const xPosition = Math.floor(Math.random() * 3000) + 500;
            const enemy = new EnemyClass();
            enemy.x = xPosition;
            enemies.push(enemy);
        }

        const endboss = new Endboss();
        endboss.x = 2600;
        enemies.push(endboss);

        return enemies;
    }


    const randomEnemies = generateRandomEnemies();


    /**
     * Creates the Level object with all generated entities and background layers.
     */
    const level1 = new Level(
        randomEnemies,
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
        allCoins,
        allBottles,
        allCoins.length,
        allBottles.length
    );

    level1.totalCoins = level1.coins.length;
    level1.totalBottles = level1.bottles.length;
    return level1;
}
