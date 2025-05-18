class UrlShortener {
    constructor() {
        // Define the character set for the short URLs (base62)
        this.chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.base = this.chars.length;
    }

    /**
     * Generates a unique short code for a URL
     * @param {string} longUrl - The URL to shorten
     * @param {number} length - Desired length of the short code (default: 6)
     * @returns {string} The shortened URL code
     */
    shorten(longUrl, length = 12) {
        return this.generateCode(length);
    }

    /**
     * Generates a random code of specified length
     * @param {number} length - Desired length of the code
     * @returns {string} Generated code
     */
    generateCode(length) {
        let code = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * this.base);
            code += this.chars[randomIndex];
        }
        return code;
    }
}

module.exports = {UrlShortener};