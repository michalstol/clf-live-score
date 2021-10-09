export type GoalType = 'action' | 'panelty' | 'own';

export default interface PlayerGoal {
    type: GoalType;
    assist: string | null; // player's id
    timestamp: number;
}
