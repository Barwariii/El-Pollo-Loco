class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2220;

    constructor(enemiesPara, cloudsPara, backgroundObjectsPara) {
        this.enemies = enemiesPara;
        this.clouds = cloudsPara;
        this.backgroundObjects = backgroundObjectsPara;
    }
}