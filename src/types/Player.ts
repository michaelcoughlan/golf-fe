export interface BasePlayer {
    name: string;
    uid?: string;
}

export interface Player extends BasePlayer {
    scorecardIndex: number;
    totalScore: number;
}
