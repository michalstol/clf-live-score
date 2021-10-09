export type PositionType = 'goalkeeper' | 'defender' | 'midfielder' | 'striker';

export default interface Player {
    id: string;
    name: string;
    position: PositionType;
}
