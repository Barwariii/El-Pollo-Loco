/**
 * Represents the main controllable character in the game.
 * Handles movement, jumping, animations, sounds, and interactions with the game world.
 * @class Character
 * @extends MovableObject
 * @property {number} y - The vertical starting position of the character.
 * @property {{top:number,bottom:number,left:number,right:number}} offset - Collision detection offsets.
 * @property {boolean} killEnemyOnJump - Whether the character can kill enemies by jumping on them.
 * @property {World} world - Reference to the game world instance.
 */
class Character extends MovableObject {

    height = 350;
    y = 90;
    speed = 10;
    energy = 120;
    offset = {
        top: 140,
        bottom: 10,
        left: 4,
        right: 9,
    };
    killEnemyOnJump = true;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    world;
    walking_sound = new Audio('audio/running-on-sand-sound.FLAC');
    jumping_sound = new Audio('audio/jump.MP3');

    /**
     * Creates the character, loads all animations and sounds, and initializes movement/animation loops.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.walking_sound.volume = 1;
        this.jumping_sound.volume = 0.1;
        allSounds.push(this.walking_sound, this.jumping_sound);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_LONG_IDLE);

        const muted = localStorage.getItem('musicMuted') === 'true';
        this.walking_sound.muted = muted;
        this.jumping_sound.muted = muted;

        this.applyGravity();
        this.animate();
    }

    lastMoveTime = Date.now();


    /**
     * Starts movement and animation loops.
     */
    animate() {
        this.startMovementLoop();
        this.startAnimationLoop();
    }


    /**
     * Starts the movement loop (30 FPS).
     */
    startMovementLoop() {
        this.movementInterval = setInterval(() => this.stepMovement(), 1000 / 30);
    }


    /**
     * Executes one movement step based on keyboard input.
     */
    stepMovement() {
        let moved = false;
        if (this.handleRight()) moved = true;
        if (this.handleLeft()) moved = true;
        this.handleNoMovement();
        if (this.handleJump()) moved = true;

        if (moved) this.lastMoveTime = Date.now();
        this.world.camera_x = -this.x + 100;
    }


    /**
     * Starts the animation loop (20 FPS).
     */
    startAnimationLoop() {
        this.animationInterval = setInterval(() => this.stepAnimation(), 50);
    }


    /**
     * Executes one animation step based on character state.
     */
    stepAnimation() {
        const now = Date.now();
        const { idle, longIdle } = this.computeIdleFlags();

        if (this.isDead()) this.playDeadAnimation();
        else if (this.isHurt()) this.playHurtAnimation();
        else if (this.isAboveGround()) this.playJumpingAnimation();
        else if (longIdle && now - this.lastMoveTime > 2000) this.playLongIdleAnimation();
        else if (idle && now - this.lastMoveTime > 100) this.playIdleAnimation();
        else if (!idle) this.playWalkingAnimation();
    }


    /**
     * Computes whether the character is idle or long idle.
     * @returns {{idle: boolean, longIdle: boolean}}
     */
    computeIdleFlags() {
        const idle = !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
        const longIdle = idle && !this.world.keyboard.SPACE;
        return { idle, longIdle };
    }


    /**
     * Handles right movement input.
     * @returns {boolean} True if movement occurred.
     */
    handleRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (!this.isAboveGround()) {
                this.walking_sound.play();
            }
            return true;
        }
        return false;
    }


    /**
     * Handles left movement input.
     * @returns {boolean} True if movement occurred.
     */
    handleLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if (!this.isAboveGround()) {
                this.walking_sound.play();
            }
            return true;
        }
        return false;
    }


    /**
     * Handles stopping walking sound when no movement input or character is in air.
     */
    handleNoMovement() {
        if ((!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) || this.isAboveGround()) {
            this.walking_sound.pause();
            this.walking_sound.currentTime = 0;
        }
    }


    /**
     * Handles jump input.
     * @returns {boolean} True if jump occurred.
     */
    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jumping_sound.play();
            return true;
        }
        return false;
    }


    /** Plays dead animation. */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    /** Plays hurt animation. */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }

    /** Plays jumping animation. */
    playJumpingAnimation() {
        this.playAnimation(this.IMAGES_JUMING);
    }

    /** Plays walking animation. */
    playWalkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /** Plays idle animation. */
    playIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    /** Plays long idle animation. */
    playLongIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }
}
