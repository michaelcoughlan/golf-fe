import Link from 'next/link';
import { Button } from '@/components';

import { Props } from './types';

const GameCard = ({ game }: Props) => {
    const formattedDate: string = game.date.substring(0, game.date.indexOf('T')) ?? 'N/A';

    return (
        <div className="flex justify-between border border-2 rounded p-4 duration-300 hover:border-gray-700">
            <div>
                <h2 className="font-bold">{game.title}</h2>
                <p className="text-gray-500">{formattedDate}</p>
            </div>

            <Link href={`/games/${game.id}`}>
                <Button text="View" />
            </Link>
        </div>
    )
};

export default GameCard;
