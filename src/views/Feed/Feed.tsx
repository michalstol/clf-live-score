import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import fetchGamesAsync from '../../redux/asyncActions/fetchGamesAsync';
import { selectAuth } from '../../redux/slices/authorizedSlice';
import { selectFeed } from '../../redux/slices/feedSlice';

export const testId = 'view--feed';

export default function Feed(): JSX.Element {
    const dispatch = useAppDispatch();
    const { logged } = useAppSelector(selectAuth);
    const { data } = useAppSelector(selectFeed);

    useEffect(() => {
        dispatch(fetchGamesAsync(logged ? ['!=', 'all'] : undefined));
    }, [dispatch, logged]);

    return (
        <div>
            <h5>Feed</h5>
            <Link to="/sign-in">Sign in</Link>

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
                        {logged && (
                            <>
                                {' '}
                                <Link to={`commentary/${game.id}`}>
                                    COMMENTARY
                                </Link>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
