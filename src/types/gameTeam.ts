import GamePlayer from './gamePlayer';

export default interface GameTeam {
    players: GamePlayer[];
    variant: 'host' | 'guest';
}

interface GameTeams {
    host: GameTeam | null;
    guest: GameTeam | null;
    updatedAt: number; // for tracking updates
}

export type GameTeamsType = GameTeams;
