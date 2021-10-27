import { Timestamp } from '@firebase/firestore';

export type GameStatus = 'preparing' | 'ongoing' | 'finished';

export default interface Game {
    id: string | undefined;

    // basic
    createdAt: Timestamp | number;
    createdBy: string;
    status: GameStatus;
    startedAt: Timestamp | number;

    // teams
    host: string; // team's name
    guest: string; // team's name

    // result
    hostScore: number;
    guestScore: number;
}
