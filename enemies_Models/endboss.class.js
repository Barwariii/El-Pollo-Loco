class Endboss extends MovableObject {


    height = 450;
    width = 250;
    y = 10;
    energy = 50;
    isDead = false;

    state = 'walking'; // Possible states: 'walking', 'chasing', 'attacking', 'hurt', 'dead'
    lastAttackTime = 0;
    attackCooldown = 2000; // 2 seconds cooldown between attacks
    world; // Add a property to store the world object


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
        this.world = world; // Store the world object
        this.state = 'alert'; // Start in alert state
        console.log('World assigned to Endboss:', this.world); // Debug log
        // this.animate();
    }

    // Override the onAddedToWorld method
    onAddedToWorld(world) {
        super.onAddedToWorld(world);  // Call the parent class method from MovableObject
        this.animate();  // Start the animation of the Endboss when added to the world
    }


    animate() {
        setInterval(() => {
            if (this.isDead) return; // Wenn tot, keine weitere Animation

            switch (this.state) {
                case 'walking':
                    this.playAnimation(this.IMAGES_WALKING);
                    this.chaseCharacter(); // method for the walking state
                    break;

                case 'alert':
                    this.alertState(); // method for the alert state
                    break;


                case 'chasing':
                    this.chaseCharacter(); // method for the chasing state
                    this.checkAttackOpportunity(); // Check if the Endboss can attack
                    break;

                case 'attacking':
                    this.playAnimation(this.IMAGES_ATTACK); // Play attack animation
                    break;

                case 'hurt':
                    this.playAnimation(this.IMAGES_HURT);
                    setTimeout(() => {
                        this.state = 'chasing';
                    }, 500);
                    break;

                // case 'dead':
                //     this.playAnimation(this.IMAGES_DEAD);
                //     break;
            }
        }, 100);

        setInterval(() => {
            if (this.energy <= 0 && !this.isDead) {
                this.playDeadAnimation();
            }
        }, 200);
    }


    // Method to handle the alert state of the Endboss
    alertState() {
        const distanceToCharacter = Math.abs(this.x - this.world.character.x); // Calculate the distance to the player
        const activationDistance = 500; // Distance at which the Endboss becomes active

        if (distanceToCharacter <= activationDistance) {
            console.log('Character is close. Endboss is now chasing.');
            this.state = 'chasing'; // Switch to the "chasing" state
        } else {
            console.log('Endboss is in alert state.');
            this.playAnimation(this.IMAGES_ALERT); // Play the alert animation
        }
    }


    // Method to handle the chasing behavior of the Endboss
    chaseCharacter() {
        const distanceToCharacter = Math.abs(this.x - this.world.character.x); // Calculate the distance to the player
        const activationDistance = 500; // Distance at which the Endboss becomes active

        if (distanceToCharacter <= activationDistance) {
            if (this.x > this.world.character.x) {
                this.x -= 10; // Move left
                this.otherDirection = false;
            } else {
                this.x += 10; // Move right
                this.otherDirection = true;
            }
            console.log('Character position:', this.world.character.x);
            this.state = 'chasing';
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            // console.log('Character is too far. Endboss is idle.');
            console.log('Endboss is chasing the character.');
            this.state = 'walking'; // Endboss remains in the "walking" state
        }
    }


    // Method to check if the Endboss can attack the character
    checkAttackOpportunity() {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastAttackTime > this.attackCooldown && this.isColliding(this.world.character)) {
            this.state = 'attacking';
            this.lastAttackTime = currentTime;
            setTimeout(() => {
                this.state = 'chasing';
            }, 1000); // Attack duration
        }
    }

    // // Method to play the dead animation and trigger game win logic
    // playDeadAnimation() {
    //     this.isDead = true; // Set the isDead property to true
    //     this.state = 'dead'; // <- Das ist entscheidend!
    //     this.playDeadOnce(); // Nur einmal Animation abspielen

    //     // Trigger win logic after the death animation
    // setTimeout(() => {
    //     winGame(); // Call the winGame function
    // }, this.IMAGES_DEAD.length * 200); // Wait for the death animation to finish
    // }

    // // Method to check if the Endboss is dead
    // hit() {
    //     if (this.state !== 'dead') {
    //         this.energy -= 10;
    //         this.state = 'hurt';
    //         if (this.energy <= 0) {
    //             this.playDeadAnimation();
    //         }
    //     }
    // }

    playDeadAnimation() {
        this.isDead = true; // Markiere den Endboss als tot
        this.state = 'dead'; // Setze den Zustand auf "dead"
    
        let i = 0; // Startindex für die Animation
        const interval = setInterval(() => {
            if (i < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[i]]; // Lade das nächste Bild der Animation
                i++;
            } else {
                clearInterval(interval); // Stoppe die Animation, wenn alle Bilder abgespielt wurden
                this.removeEndboss(); // Entferne den Endboss aus dem Spiel
            }
        }, 200); // Zeitintervall zwischen den Bildern (200ms)
    }
    
    // Methode, um den Endboss aus dem Spiel zu entfernen
    removeEndboss() {
        const index = this.world.level.enemies.indexOf(this); // Finde den Index des Endbosses in der Gegnerliste
        if (index > -1) {
            this.world.level.enemies.splice(index, 1); // Entferne den Endboss aus der Liste
        }
        this.world.gameWin = true; // Setze das Spiel als gewonnen
        this.world.endgame(); // Rufe die Endgame-Funktion auf, um das Spiel zu beenden
        // winGame(); // Rufe die winGame()-Funktion auf, um den Sieg zu registrieren
    }

    // playDeadOnce() {
    //     let i = 0;
    //     let interval = setInterval(() => {
    //         this.img = this.imageCache[this.IMAGES_DEAD[i]];
    //         i++;
    //         if (i >= this.IMAGES_DEAD.length) {
    //             clearInterval(interval);
    //         }
    //     }, 200);
    // }

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