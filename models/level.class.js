class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2220;
    coins;
    bottles;

    constructor(enemiesPara, cloudsPara, backgroundObjectsPara, coinsPara, bottlesPara, characterPara) {
        this.character = characterPara;
        this.enemies = enemiesPara;
        this.clouds = cloudsPara;
        this.backgroundObjects = backgroundObjectsPara;
        this.coins = coinsPara;
        this.bottles = bottlesPara;
    }
}