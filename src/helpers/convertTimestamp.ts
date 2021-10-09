import { Timestamp } from 'firebase/firestore';

/**
 * Conver an firebase Timestamp object into simple microtimestamp.
 * Microtimestamp is important for Date API
 *
 * @param timestamp Timestamp
 * @returns number
 */
export default function convertTimestamp(timestamp: Timestamp): number {
    return timestamp.seconds * 1000;
}
