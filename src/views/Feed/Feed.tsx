import React, { useEffect } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import fetchGamesAsync from '../../redux/asyncActions/fetchGamesAsync';

export const testId = 'view--feed';

let singletonInstance = false;

function fetchGames(dispatch: AppDispatch) {
    if (singletonInstance) return;

    dispatch(fetchGamesAsync());
    singletonInstance = true;
}

export default function Feed(): JSX.Element {
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchGames(dispatch);
    }, [dispatch]);

    return <>Feed</>;
}
