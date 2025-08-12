class statusBar extends DrawableObject {

    /**
     * health statusbar images
     */
    IMAGES = [];

    /**
     * setpercentage(50);
     */
    setPercentage(percentagePara) {
        this.percentage = percentagePara; // => 0 .... 5
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
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
        this.coinsPercentage = coinPercentagePara; // => 0 .... 5
        let imagePath = this.IMAGES[this.resolveCoinsImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveCoinsImageIndex() {
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
        this.bottlePercentage = bottlePercentagePara; // => 0 .... 5
        let imagePath = this.IMAGES[this.resolveBottleImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveBottleImageIndex() {
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
