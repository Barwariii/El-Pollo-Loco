class statusBar extends DrawableObject {

    // health statusbar images
    IMAGES = [];


    // percentage = 100;
    // constructor() {
    //     super();
    //     this.loadImages(this.IMAGES);
    //     this.x = 40;
    //     this.y = 0;
    //     this.width = 180;
    //     this.height = 50;
    //     this.setPercentage(100);
    // }
    

    // setpercentage(50);
    setPercentage(percentagePara) {
        console.log('setPercentage called with:', percentagePara); // Debug log
        this.percentage = percentagePara; // => 0 .... 5
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        console.log('Resolving image index for percentage:', this.percentage); // Debug log
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    setCoinsPercentage(coinPercentagePara) {
        console.log('setCoinsPercentage called with:', coinPercentagePara); // Debug log
        this.coinsPercentage = coinPercentagePara; // => 0 .... 5
        let imagePath = this.IMAGES[this.resolveCoinsImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveCoinsImageIndex() {
        console.log('Resolving coins image index for coinsPercentage:', this.coinsPercentage); // Debug log
        if (this.coinsPercentage == 100) {
            return 5;
        } else if (this.coinsPercentage > 80) {
            return 4;
        } else if (this.coinsPercentage > 60) {
            return 3;
        } else if (this.coinsPercentage > 40) {
            return 2;
        } else if (this.coinsPercentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }


    setBottlePercentage(bottlePercentagePara) {
        console.log('setBottlePercentage called with:', bottlePercentagePara); // Debug log
        this.bottlePercentage = bottlePercentagePara; // => 0 .... 5
        let imagePath = this.IMAGES[this.resolveBottleImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveBottleImageIndex() {
        console.log('Resolving bottle image index for bottlePercentage:', this.bottlePercentage); // Debug log
        if (this.bottlePercentage == 100) {
            return 5;
        } else if (this.bottlePercentage > 80) {
            return 4;
        } else if (this.bottlePercentage > 60) {
            return 3;
        } else if (this.bottlePercentage > 40) {
            return 2;
        } else if (this.bottlePercentage > 10) {
            return 1;
        } else {
            return 0;
        }
    }
}
