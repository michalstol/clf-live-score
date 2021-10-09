/**
 * Prefix gives custom name for all storage elements
 */
const prefix = 'clf-score-';

const storageAPI = {
    /**
     * Set method
     *
     * @param key: string
     * @param item: T
     */
    set: function <T>(key: string, item: T): void {
        localStorage.setItem(prefix + key, JSON.stringify(item));
    },
    /**
     * Get method
     *
     * @param key: string
     * @returns T
     */
    get: function <T>(key: string): T {
        const data = JSON.parse(localStorage.getItem(prefix + key) || '{}');

        return data;
    },
};

export default Object.freeze(storageAPI);
