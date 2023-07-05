import { ReactElement, useState } from 'react';

import { Button, Input } from '@/components';
import { Score } from '@/types';

import { Props } from './types';

const Hole = ({ holeData, holeNumber }: Props): ReactElement => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const renderScoreOrInput = (holeScore: Score, index: number) => {
        if (isEditMode) {
            return (
                <Input
                    additionalClasses=""
                    id={`${holeNumber}-edit__${index}`}
                    name={`${holeNumber}-edit__${index}`}
                    onChange={() => null}
                    placeholder={`${holeScore.score ? holeScore.score : '0'}`}
                    type="number"
                    value={''}
                />
            );
        }

        return <p>{holeScore.score ?? 'N/A'}</p>;
    };

    return (
        <div className="border-2 rounded mt-4 pr-4 pb-4 pl-4">
            <div className="flex items-center justify-between border-b-2 pt-4 pb-4">
                <h3 className="font-bold">Hole #{holeNumber}</h3>
                <Button clickHandler={() => setIsEditMode(!isEditMode)} text={isEditMode ? 'Save' : 'Edit'} />
            </div>

            {
                holeData.map((holeScore: Score, index: number) => {
                    return (
                        <div key={`${holeNumber}-score__${index}`} className="flex items-center justify-between mt-4" >
                            <p>{holeScore.name}</p>
                            {renderScoreOrInput(holeScore, index)}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Hole;
