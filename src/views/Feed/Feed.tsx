import React, { useEffect } from 'react';
import styled from 'styled-components';
import { List, ListItem, Paper, Typography } from '@mui/material';

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
        <Paper elevation={0}>
            <Typography variant="h5" gutterBottom component={Header}>
                Feed
            </Typography>

            <List>
                {data?.map(game => (
                    <ListItem key={game.id} button>
                        {game.host} ({game.hostScore} : {game.guestScore}){' '}
                        {game.guest}
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

const Header = styled.div`
    padding: 10px 10px 0;
`;
