class Character extends MovableObject {

    height = 350;
    y = 90;
    speed = 10;
    offset = {
        top: 140,
        bottom: 10,
        left: 4,
        right: 9,
    };
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
    walking_sound = new Audio('audio/running-on-sand-sound.FLAC')
    jumping_sound = new Audio('audio/jump.MP3')
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.walking_sound.volume = 1; // Set volume to 100%
        this.jumping_sound.volume = 0.1; // Set volume to 50%
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);


        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (this.world.keyboard.RIGHT && !this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if (this.world.keyboard.LEFT && !this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            // If no key is pressed (no movement)
            if ((!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) || this.isAboveGround()) {
                // Pauses the walking sound if no key is pressed or if character isAboveGround();
                this.walking_sound.pause();
                this.walking_sound.currentTime = 0;  // Resets the sound to the beginning
            }

            // console.log('thi.speedy', this.speedy);
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            }

            this.world.camera_x = -this.x + 100; // move camera with character
        }, 1000 / 30);

        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMING);
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walking animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

}