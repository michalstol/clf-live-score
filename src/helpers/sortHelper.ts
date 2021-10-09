enum Direction {
    'ASC' = 1,
    'DESC' = -1,
}

/**
 * Sort function
 * Is handling numbers and strings
 * Gets T as a type of sorting object
 *
 * @param sortBy: keyof T
 * @param direction: Direction = 'DESC'
 * @returns number
 */
export default function sort<T>(
    sortBy: keyof T,
    direction: keyof typeof Direction = 'DESC'
): (x: T, y: T) => number {
    return function (x, y) {
        // Check if x and y are objects
        if (!Object.keys(x).length || !Object.keys(y).length) return 0;

        const xVal = x[sortBy];
        const yVal = y[sortBy];
        const delta = Direction[direction];

        if (typeof xVal === 'number' && typeof yVal === 'number')
            return (xVal - yVal) * delta;
        if (typeof xVal === 'string' && typeof yVal === 'string')
            return xVal.toLowerCase().localeCompare(yVal.toLowerCase()) * delta;

        return 0;
    };
}
