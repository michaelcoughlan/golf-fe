import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

import { Button, Input } from '@/components';
import { createGame } from '@/lib';
import { BasePlayer } from '@/types';

const CreateGame = () => {
    const labelClasses = 'font-bold text-slate-700 mb-1';

    const router = useRouter();

    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [numberHoles, setNumberHoles] = useState<number>(9);
    const [players, setPlayers] = useState<BasePlayer[]>([{ name: '', uid: '' }]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const isValid = validatePage();

        if (isValid !== isFormValid) {
            setIsFormValid(isValid);
        }
    }, [numberHoles, players, title])

    /**
     * Take the different form inputs and return whether or not the page
     * is valid
     *
     * @returns {boolean} if the form is valid
     *
     * @author Michael Coughlan
     */
    const validatePage = (): boolean => {
        if (!title || title.trim() === '') {
            return false;
        }

        if (numberHoles < 1 || numberHoles > 18) {
            return false;
        }

        let isValid: boolean = true;
        players.forEach((player: BasePlayer) => {
            if (!player.name || player.name.trim() === '') {
                isValid = false;
            }
        });

        return isValid;
    };

    /**
     * When a player's name is edited, update the local state variable
     *
     * @param {ChangeEvent<HTMLInputElement>} event the event from React
     * @param {number} index the element in the array we are changing
     * @returns {void} nothing
     *
     * @author Michael Coughlan
     */
    const handlePlayersChange = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const tempPlayers = [...players];
        tempPlayers[index].name = event.target.value;

        setPlayers(tempPlayers);
    };

    /**
     * Take the form inputs and pass it to the createGame function
     *
     * @returns {void} nothing
     *
     * @author Michael Coughlan
     */
    const handleSaveClick = async (): Promise<void> => {
        const createdGameId = await createGame({
            numberHoles,
            players,
            title,
        });

        router.push(`/games/${createdGameId}`);
    };

    return (
        <>
            <Head>
                <title>Squid Golf - Create Game</title>
                <meta property="og:title" content="Squid Golf - Create Game" key="title" />
            </Head>

            <div>
                <p>Please fill out the information below to create your game.</p>

                <div className="mt-4">
                    <p className={labelClasses}>Title</p>
                    <Input
                        additionalClasses="md:w-64"
                        id="create__title"
                        name="title"
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Add game title"
                        type="text"
                        value={title}
                    />
                </div>

                <div className="mt-4">
                    <p className={labelClasses}>Number of Holes</p>
                    <Input
                        additionalClasses="md:w-64"
                        id="create__number-holes"
                        name="numberHoles"
                        onChange={(event) => setNumberHoles(Number(event.target.value))}
                        placeholder="Type the number of holes"
                        type="number"
                        value={numberHoles}
                    />
                </div>

                <div className="mt-4">
                    <h2 className={labelClasses}>Players</h2>

                    {
                        players.map((player, index) => {
                            return (
                                <div key={`add-player__${index}`} className="mt-4">
                                    <Input
                                        additionalClasses="md:w-64"
                                        id="create__title"
                                        name="title"
                                        onChange={(event) => handlePlayersChange(event, index)}
                                        placeholder="Add player name"
                                        type="text"
                                        value={player.name}
                                    />
                                </div>
                            );
                        })
                    }

                    <div className="mt-4">
                        <Button
                            additionalClasses="bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
                            clickHandler={() => setPlayers([...players, { name: '', uid: '' }])}
                            text="Add new player"
                        />
                    </div>

                    <div className="mt-4">
                        <Button
                            clickHandler={handleSaveClick}
                            isDisabled={!isFormValid}
                            text="Save"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateGame;
