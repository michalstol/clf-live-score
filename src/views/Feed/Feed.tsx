import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';

import fetchGamesAsync from '../../redux/asyncActions/fetchGamesAsync';
import { selectFeed } from '../../redux/slices/feedSlice';

export const testId = 'view--feed';

let singletonInstance = false;

function fetchGames(dispatch: AppDispatch) {
    if (singletonInstance) return;

    dispatch(fetchGamesAsync());
    singletonInstance = true;
}

export default function Feed(): JSX.Element {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(selectFeed);

    useEffect(() => {
        fetchGames(dispatch);
    }, [dispatch]);

    return (
        <div>
            <h5>Feed</h5>

            <ul>
                {data?.map(game => (
                    <li key={game.id}>
                        <div>
                            {game.host} ({game.hostScore}:{game.guestScore}){' '}
                            {game.guest}
                        </div>

                        {/* For future */}
                        {/* <Button component={Link} to="/open-collective"> */}
                        <Link
                            to={`/live/${game.id}`}
                            // style={{
                            //     pointerEvents:
                            //         game.status !== 'preparing'
                            //             ? 'none'
                            //             : 'all',
                            // }}
                        >
                            LIVE
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
