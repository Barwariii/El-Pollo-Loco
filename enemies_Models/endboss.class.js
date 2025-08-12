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
     * Store the world object
     */
    state = 'walking';
    lastAttackTime = 0;
    attackCooldown = 2000; // 
    world;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]
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

    constructor(world) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2550;
        this.world = world;
        this.state = 'alert';
        this.maxEnergy = this.energy;
    }

    draw(ctx) {
        super.draw(ctx);
        if (!this.isDead && this.energy > 0) {
            this.drawHealthBar(ctx);
        }
    }

    drawHealthBar(ctx) {
        const w = 180, h = 14;
        const x = this.x + this.width / 2 - w / 2;
        const y = this.y + (this.height * 0.1);

        const pct = Math.max(0, Math.min(1, this.energy / this.maxEnergy));

        /** Frame + background */
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#222';
        ctx.strokeRect(x, y, w, h);
        ctx.fillStyle = '#555';
        ctx.fillRect(x, y, w, h);

        /** Color based on remaining HP and Filling */
        const p = pct * 100;
        const fill = p > 60 ? '#2ecc71' : p > 30 ? '#f1c40f' : '#e74c3c';

        ctx.fillStyle = fill;
        ctx.fillRect(x, y, w * pct, h);
    }

    /**
     * Override the onAddedToWorld method
     * @param {*} world 
     * Call the parent class method from MovableObject
     * Start the animation of the Endboss when added to the world
     */
    onAddedToWorld(world) {
        super.onAddedToWorld(world);
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.isDead) return;
            switch (this.state) {
                case 'walking':
                    this.handleWalkingState();
                    break;
                case 'alert':
                    this.handleAlertState();
                    break;
                case 'chasing':
                    this.handleChasingState();
                    break;
                case 'attacking':
                    this.handleAttackingState();
                    break;
                case 'hurt':
                    this.handleHurtState();
                    break;
                case 'dead':
                    this.handleDeadState();
                    break;
            }
        }, 100);

        setInterval(() => {
            if (this.energy <= 0 && !this.isDead) {
                this.playDeadAnimation();
            }
        }, 200);
    }


    /** Sub-functions for the states. */
    handleWalkingState() {
        this.playAnimation(this.IMAGES_WALKING);
        this.chaseCharacter();
    }

    handleAlertState() {
        this.alertState();
    }

    handleChasingState() {
        this.chaseCharacter();
        this.checkAttackOpportunity();
    }

    handleAttackingState() {
        this.playAnimation(this.IMAGES_ATTACK);
    }

    handleHurtState() {
        this.playAnimation(this.IMAGES_HURT);
        setTimeout(() => {
            this.state = 'chasing';
        }, 500);
    }

    handleDeadState() {
        this.playAnimation(this.IMAGES_DEAD);
    }



    /** Method to handle the alert state of the Endboss */
    alertState() {
        const distanceToCharacter = Math.abs(this.x - this.world.character.x); /** Calculate the distance to the player */
        const activationDistance = 500; /** Distance at which the Endboss becomes active */

        if (distanceToCharacter <= activationDistance) {
            this.state = 'chasing'; /** Switch to the "chasing" state */
        } else {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }


    /** Method to handle the chasing behavior of the Endboss */
    chaseCharacter() {
        const distanceToCharacter = Math.abs(this.x - this.world.character.x);
        const activationDistance = 500;

        if (distanceToCharacter <= activationDistance) {
            if (this.x > this.world.character.x) {
                this.x -= this.speed; /** Move left */
                this.otherDirection = false;
            } else {
                this.x += this.speed; /** Move right */
                this.otherDirection = true;
            }
            this.state = 'chasing';
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.state = 'walking'; /** Endboss remains in the "walking" state */
        }
    }


    /** Method to check if the Endboss can attack the character */
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
                    this.endState('lose');
                    // this.world.gameOver = true;
                    // this.world.endgame();
                }
            }
            setTimeout(() => {
                this.state = 'chasing';
            }, 1000);
        }
    }


    playDeadAnimation() {
        this.isDead = true;
        this.state = 'dead';

        /** Start index for the animation. */
        let i = 0;
        const interval = setInterval(() => {
            if (i < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[i]]; /** Load the next frame of the animation. */
                i++;
            } else {
                clearInterval(interval); /** Stop the animation when all frames have been played. */
                this.removeEndboss();
            }
        }, 200);
    }


    /** Method to remove the end boss from the game. */
    removeEndboss() {
        const index = this.world.level.enemies.indexOf(this); /** Find the index of the end boss in the enemies list. */
        if (index > -1) {
            this.world.level.enemies.splice(index, 1); /** Remove the end boss from the list. */
        }
        this.world.gameWin = true;
        this.world.endgame();
    }


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