import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { collection, doc, query, onSnapshot } from 'firebase/firestore';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { db } from '../../app/firebase';

import { updateLive, selectLive } from '../../redux/slices/liveSlice';
import { selectFeed } from '../../redux/slices/feedSlice';

import transformFirebaseDate from '../../helpers/transformFirebaseDate';

import GameTeam, { GameTeamsType } from '../../types/gameTeam';
import GenericObject from '../../types/genericObject';
import Game from '../../types/game';

export const testId = 'view--commentary';

export default function Commentary(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectLive)[id];
    const gameData = useAppSelector(selectFeed).data?.find(
        record => record.id === id
    );
    const [game, setGame] = useState(gameData);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'games', id), snapshot => {
            if (!snapshot.exists()) return;

            const snapData = snapshot.data() as Game;
            const transform = transformFirebaseDate(snapData);

            setGame({
                ...snapData,
                ...transform('createdAt'),
                ...transform('startedAt'),
                id,
            });
        });

        return unsubscribe;
    }, [dispatch, id]);

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
    }, [dispatch, id]);

    // temp to log the updates
    useEffect(() => {
        const { updatedAt } = data;

        if (!!updatedAt) console.log(`updatedAt : ${updatedAt} - ${id}`);
    }, [data, id]);

    return (
        <div>
            <h5>Commentary - id:{id}</h5>
            <pre>{JSON.stringify(!!game ? game : {}, null, 4)}</pre>
            <pre>{JSON.stringify(!!data ? data : {}, null, 4)}</pre>
        </div>
    );
}
