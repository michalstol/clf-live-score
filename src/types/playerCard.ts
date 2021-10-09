export type CardType = 'yellow' | 'red';

export default interface PlayerCard {
    type: CardType;
    timestamp: number;
}
