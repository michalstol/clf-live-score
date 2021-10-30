import GamePlayer from './gamePlayer';

export default interface GameTeam {
    variant: 'host' | 'guest';
    players: GamePlayer[];
}

interface GameTeams {
    host: GameTeam | null;
    guest: GameTeam | null;
    updatedAt: number; // for tracking updates
}

export type GameTeamsType = GameTeams;
