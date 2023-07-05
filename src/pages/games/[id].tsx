import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';

import { Button, Hole } from '@/components';
import { deleteGame, fetchGame, fetchGames } from '@/lib';
import { BaseGame, Player } from '@/types';

import { Props } from './types';

const GameDetail = ({ game }: Props): ReactElement => {    
    const formattedDate: string = game.date.substring(0, game.date.indexOf('T')) ?? 'N/A';
    const router = useRouter();
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const handleDeleteClick = async () => {
        setIsDeleteLoading(true);

        try {
            await deleteGame(game.id)
            setIsDeleteLoading(false);
            router.push('/');
        } catch (error) {
            console.error('An error occurred during deletion.', error);
            setIsDeleteLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Squid Golf - Game {game.title}</title>
                <meta property="og:title" content={`Squid Golf - Game ${game.title}`} key="title" />
            </Head>

            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-2xl">{game.title}</h1>
                        <p className="text-gray-500">{formattedDate}</p>
                    </div>

                    <Button
                        additionalClasses="bg-red-500 h-[40px] hover:bg-red-300"
                        clickHandler={handleDeleteClick}
                        isDisabled={isDeleteLoading}
                        text={isDeleteLoading ? 'Loading...' : 'Delete'}
                    />
                </div>

                <h2 className="font-bold text-xl mt-4">Leaderboard</h2>
                {
                    game.players.map((player: Player, index: number) => {
                        return (
                            <div key={`total-scores__${index}`}>
                                <h3>
                                    <span className="font-bold">#{index + 1}: </span>
                                    {player.name} - {player.totalScore}
                                </h3>
                            </div>
                        );
                    })
                }

                <h2 className="font-bold text-xl mt-4">Holes</h2>
                {
                    Object.keys(game.holes).map((holeNumber: string, index: number) => {
                        return (
                            <Hole key={`hole-${holeNumber}__${index}`} holeData={game.holes[holeNumber]} holeNumber={holeNumber} />
                        );
                    })
                }
            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const games = await fetchGames();
    const paths = games.map((game: BaseGame) => ({ params: { id: game.id } }));

    return {
        fallback: 'blocking',
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const game = await fetchGame(context?.params?.id as string);

    return { props: { game } };
};

export default GameDetail;
