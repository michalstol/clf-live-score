import { Timestamp } from '@firebase/firestore';

export type GameStatus = 'preparing' | 'ongoing' | 'finished';

export default interface Game {
    // basic
    createdAt: Timestamp;
    createdBy: string;
    status: GameStatus;

    // teams
    host: string; // team's name
    guest: string; // team's name

    // result
    hostScore: number;
    guestScore: number;
}
