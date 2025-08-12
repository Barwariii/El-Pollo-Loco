/**
 * Represents a game level, including all entities and environmental objects.
 * @class Level
 * @property {Character} character - The main playable character for the level.
 * @property {Array<MovableObject>} enemies - List of enemy objects in the level.
 * @property {Array<Cloud>} clouds - List of clouds in the level's background.
 * @property {Array<BackgroundObject>} backgroundObjects - List of background objects/layers.
 * @property {Array<Coins>} coins - List of collectible coins in the level.
 * @property {Array<Bottles>} bottles - List of collectible bottles in the level.
 */
class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2220;
    coins;
    bottles;

    /**
     * Creates a new level with the specified game elements.
     * @param {Character} characterPara - The main character in the level.
     * @param {Array<MovableObject>} enemiesPara - Array of enemies in the level.
     * @param {Array<Cloud>} cloudsPara - Array of clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjectsPara - Array of background objects in the level.
     * @param {Array<Coins>} coinsPara - Array of coins in the level.
     * @param {Array<Bottles>} bottlesPara - Array of bottles in the level.
     */
    constructor(enemiesPara, cloudsPara, backgroundObjectsPara, coinsPara, bottlesPara, characterPara) {
        this.character = characterPara;
        this.enemies = enemiesPara;
        this.clouds = cloudsPara;
        this.backgroundObjects = backgroundObjectsPara;
        this.coins = coinsPara;
        this.bottles = bottlesPara;
    }
}
