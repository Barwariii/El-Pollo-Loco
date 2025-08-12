/**
 * Represents the Endboss enemy in the game.
 * The Endboss has multiple states (walking, chasing, attacking, hurt, dead) 
 * and changes behavior depending on the player's position and actions.
 * @class Endboss
 * @extends MovableObject
 * @property {number} y - Vertical position on the canvas.
 * @property {boolean} isDead - Whether the Endboss is dead.
 * @property {{top:number,bottom:number,left:number,right:number}} offset - Collision offsets.
 * @property {string} state - Current state of the Endboss.
 * @property {number} lastAttackTime - Timestamp of the last attack.
 * @property {number} attackCooldown - Time in ms between attacks.
 * @property {object} world - Reference to the game world instance.
 */
class Endboss extends MovableObject {

    height = 450;
    width = 250;
    y = 10;
    energy = 50;
    speed = 15;
    isDead = false;
    offset = {
        top: 80,
        bottom: 80,
        left: 30,
        right: 60
    };

    /**
     * Possible states: 'walking', 'chasing', 'attacking', 'hurt', 'dead'
     * 2 seconds cooldown between attacks
     */
    state = 'walking';
    lastAttackTime = 0;
    attackCooldown = 2000;
    world;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Creates the Endboss instance, preloads sprites, sets initial position and state.
     * @param {object} world - The game world reference.
     * @constructor
     */
    constructor(world) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2550;
        this.world = world;
        this.state = 'alert';
        this.maxEnergy = this.energy;
    }


    /**
     * Draws the Endboss and its health bar (if alive).
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        super.draw(ctx);
        if (!this.isDead && this.energy > 0) {
            this.drawHealthBar(ctx);
        }
    }


    /**
     * Draws the health bar of the Endboss.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawHealthBar(ctx) {
        const w = 180, h = 14;
        const x = this.x + this.width / 2 - w / 2;
        const y = this.y + (this.height * 0.1);

        const pct = Math.max(0, Math.min(1, this.energy / this.maxEnergy));

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#222';
        ctx.strokeRect(x, y, w, h);
        ctx.fillStyle = '#555';
        ctx.fillRect(x, y, w, h);

        const p = pct * 100;
        const fill = p > 60 ? '#2ecc71' : p > 30 ? '#f1c40f' : '#e74c3c';

        ctx.fillStyle = fill;
        ctx.fillRect(x, y, w * pct, h);
    }


    /**
     * Called when the Endboss is added to the game world.
     * Starts its animation.
     * @param {object} world - The game world reference.
     */
    onAddedToWorld(world) {
        super.onAddedToWorld(world);
        this.animate();
    }


    /**
     * Starts the Endboss state animation loops and death check loop.
     */
    animate() {
        setInterval(() => {
            if (this.isDead) return;
            switch (this.state) {
                case 'walking': this.handleWalkingState(); break;
                case 'alert': this.handleAlertState(); break;
                case 'chasing': this.handleChasingState(); break;
                case 'attacking': this.handleAttackingState(); break;
                case 'hurt': this.handleHurtState(); break;
                case 'dead': this.handleDeadState(); break;
            }
        }, 100);

        setInterval(() => {
            if (this.energy <= 0 && !this.isDead) {
                this.playDeadAnimation();
            }
        }, 200);
    }


    /** Plays walking animation and chases the character. */
    handleWalkingState() {
        this.playAnimation(this.IMAGES_WALKING);
        this.chaseCharacter();
    }


    /** Plays alert animation until character is within activation range. */
    handleAlertState() {
        this.alertState();
    }


    /** Chases the character and checks for attack opportunities. */
    handleChasingState() {
        this.chaseCharacter();
        this.checkAttackOpportunity();
    }


    /** Plays attack animation. */
    handleAttackingState() {
        this.playAnimation(this.IMAGES_ATTACK);
    }


    /** Plays hurt animation, then switches back to chasing after a short delay. */
    handleHurtState() {
        this.playAnimation(this.IMAGES_HURT);
        setTimeout(() => {
            this.state = 'chasing';
        }, 500);
    }


    /** Plays death animation. */
    handleDeadState() {
        this.playAnimation(this.IMAGES_DEAD);
    }


    /**
     * Handles the alert state, switching to chasing if player is within range.
     */
    alertState() {
        const distanceToCharacter = Math.abs(this.x - this.world.character.x);
        const activationDistance = 500;

        if (distanceToCharacter <= activationDistance) {
            this.state = 'chasing';
        } else {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }


    /**
     * Moves toward the character if within range, otherwise remains walking.
     */
    chaseCharacter() {
        const distanceToCharacter = Math.abs(this.x - this.world.character.x);
        const activationDistance = 500;

        if (distanceToCharacter <= activationDistance) {
            if (this.x > this.world.character.x) {
                this.x -= this.speed;
                this.otherDirection = false;
            } else {
                this.x += this.speed;
                this.otherDirection = true;
            }
            this.state = 'chasing';
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.state = 'walking';
        }
    }


    /**
     * Checks if the Endboss can attack the character and performs attack logic.
     */
    checkAttackOpportunity() {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastAttackTime > this.attackCooldown && this.isColliding(this.world.character)) {
            this.state = 'attacking';
            this.lastAttackTime = currentTime;

            if (!this.world.character.isDead()) {
                this.world.character.energy -= 40;
                this.world.character.lastHit = currentTime;
                this.world.statusBarHealth.setPercentage(this.world.character.energy);

                if (this.world.character.isDead()) {
                    this.world.endState('lose');
                }
            }
            setTimeout(() => {
                this.state = 'chasing';
            }, 1000);
        }
    }


    /**
     * Plays the death animation frames and removes the Endboss afterward.
     */
    playDeadAnimation() {
        this.isDead = true;
        this.state = 'dead';

        let i = 0;
        const interval = setInterval(() => {
            if (i < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[i]];
                i++;
            } else {
                clearInterval(interval);
                this.removeEndboss();
            }
        }, 200);
    }


    /**
     * Removes the Endboss from the enemy list and triggers game win state.
     */
    removeEndboss() {
        const index = this.world.level.enemies.indexOf(this);
        if (index > -1) {
            this.world.level.enemies.splice(index, 1);
        }
        this.world.gameWin = true;
        this.world.endgame();
    }


    /**
     * Plays the death animation sequence only once.
     */
    playDeadOnce() {
        let i = 0;
        this.deadInterval = setInterval(() => {
            if (i < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[i]];
                i++;
            } else {
                clearInterval(this.deadInterval);
            }
        }, 200);
    }
}
