import Player from './player';
import PlayerAssist from './playerAssist';
import PlayerCard from './playerCard';
import PlayerGoal from './playerGoal';

export default interface GamePlayer extends Player {
    active: boolean;
    assist: PlayerAssist[];
    goals: PlayerGoal[];
    cards: PlayerCard[];
}
