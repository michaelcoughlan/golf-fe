import { GameDetail, BaseGame, GamePayload } from '@/types';

const { BASE_URL } = process.env;
const headersConfig = {
    headers: {
        'Authorization': 'token', // todo - temporary
        'Content-Type': 'application/json',
    },
};

export const fetchGames = async (): Promise<BaseGame[]> => {
    const res = await fetch(`${BASE_URL}/games`, headersConfig);
    return await res.json();
};

export const fetchGame = async (id: string): Promise<GameDetail> => {
    const res = await fetch(`${BASE_URL}/games/${id}`, headersConfig);
    return await res.json();
};

export const createGame = async (game: GamePayload): Promise<string> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/games`, {
        ...headersConfig,
        body: JSON.stringify(game),
        method: 'POST',
    });

    return res.text();
};

export const deleteGame = async (id: string): Promise<void> => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/games/${id}`, {
        ...headersConfig,
        method: 'DELETE',
    });
}