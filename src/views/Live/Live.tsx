import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { collection, query, onSnapshot } from 'firebase/firestore';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { db } from '../../app/firebase';

import { updateLive, selectLive } from '../../redux/slices/liveSlice';

import GameTeam, { GameTeamsType } from '../../types/gameTeam';
import GenericObject from '../../types/genericObject';

export const testId = 'view--live';

export default function Live(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectLive)[id];

    // Connect with Firestore and update the live state
    useEffect(() => {
        const q = query(collection(db, `/games/${id}/stats`));
        const unsubscribe = onSnapshot(q, snapshot => {
            const gameObj: GameTeamsType = {
                host: null,
                guest: null,
                updatedAt: new Date().getTime(),
            };

            snapshot.forEach(doc => {
                const gameData = doc.data() as GameTeam;
                const { variant } = gameData;

                if (!!variant) gameObj[variant] = gameData;
            });

            const stateObj: GenericObject<GameTeamsType> = {};
            stateObj[id] = { ...gameObj };

            // update the live state after every update inside the firestore
            dispatch(updateLive(stateObj));
        });

        return unsubscribe;
    }, [dispatch]);

    // temp to log the updates
    useEffect(() => {
        const { updatedAt } = data;

        if (!!updatedAt) console.log(`updatedAt : ${updatedAt} - ${id}`);
    }, [data]);

    return (
        <div>
            <h5>Live - id:{id}</h5>
            <pre>{JSON.stringify(!!data ? data : {}, null, 4)}</pre>
        </div>
    );
}
