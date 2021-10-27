import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
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
                    <ListItem key={game.id} component={GameRecord} button>
                        <TeamGroup>
                            <TeamName>{game.host}</TeamName>
                            <TeamName>{game.guest}</TeamName>
                        </TeamGroup>

                        <Score>
                            {game.hostScore}:{game.guestScore}
                        </Score>

                        <Live>LIVE</Live>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

const Header = styled.div`
    padding: 10px 10px 0;
`;

const GameRecord = styled.li`
    display: flex;
    align-items: center;
`;

const TeamGroup = styled.div`
    font-size: 0.9em;
    flex: 1 1 auto;
`;

const TeamName = styled.div``;

const Score = styled.div`
    flex: 0 0 auto;
`;

interface LiveProps {
    isLive?: boolean;
}

const Live = styled.div`
    padding: 3px 4px;
    font-size: 0.7em;
    line-height: 1;
    border: 1px solid currentColor;
    flex: 0 0 auto;

    ${(props: LiveProps) =>
        props.isLive
            ? css`
                  color: #fff;
                  background-color: #f00;
                  border-color: #f00;
              `
            : css`
                  opacity: 0.5;
                  pointer-events: none;
              `}
`;
