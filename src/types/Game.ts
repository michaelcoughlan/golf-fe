import { BasePlayer, Hole, Player } from './';

export interface BaseGame {
    date: string;
    id: string;
    title: string;
}

export interface GameDetail extends BaseGame {
    holes: Hole;
    players: Player[];
}

export interface GamePayload {
    numberHoles: number;
    players: BasePlayer[];
    title: string;
}
