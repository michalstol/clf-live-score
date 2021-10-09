import { Timestamp } from 'firebase/firestore';

import convertTimestamp from './convertTimestamp';

/**
 * Transform Firebase Date inside a specific object
 * Using closure to minimize work
 *
 * @param data: T
 * @returns (key: keyof T) => {[key: string]: number;}
 */
export default function transformFirebaseDate<T extends Object>(
    data: T
): (key: keyof T) => {
    [key: string]: number;
} {
    return function (key) {
        if (!data.hasOwnProperty(key)) return {};

        return {
            [key]: convertTimestamp(data[key] as unknown as Timestamp),
        };
    };
}
