class statusBar extends DrawableObject {
    IMAGES = [];

    /**
     * Generic helper to resolve the image index for any percentage.
     * @param {number} value - The percentage value (0–100).
     * @param {number[]} thresholds - Optional custom thresholds.
     * @returns {number} Index of the image in the IMAGES array.
     */
    resolveImageIndexFor(value, thresholds = [20, 40, 60, 80, 100]) {
        if (value >= thresholds[4]) return 5;
        if (value > thresholds[3]) return 4;
        if (value > thresholds[2]) return 3;
        if (value > thresholds[1]) return 2;
        if (value > thresholds[0]) return 1;
        return 0;
    }


    /**
     * Set the current health/standard percentage and update the displayed image.
     * @param {number} percentagePara - The new percentage value.
     */
    setPercentage(percentagePara) {
        this.percentage = percentagePara;
        let imagePath = this.IMAGES[this.resolveImageIndexFor(this.percentage)];
        this.img = this.imageCache[imagePath];
    }


    /**
     * Set the coins percentage and update the corresponding image.
     * @param {number} coinPercentagePara - The new coin percentage value.
     */
    setCoinsPercentage(coinPercentagePara) {
        this.coinsPercentage = coinPercentagePara;
        let imagePath = this.IMAGES[this.resolveImageIndexFor(this.coinsPercentage)];
        this.img = this.imageCache[imagePath];
    }


    /**
     * Set the bottle percentage and update the displayed image.
     * Uses different threshold values for bottles.
     * @param {number} bottlePercentagePara - The new bottle percentage.
     */
    setBottlePercentage(bottlePercentagePara) {
        this.bottlePercentage = bottlePercentagePara;
        let imagePath = this.IMAGES[this.resolveImageIndexFor(this.bottlePercentage, [10, 40, 60, 80, 100])];
        this.img = this.imageCache[imagePath];
    }
}
