import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';

import { db } from '../../app/firebase';

import transformFirebaseDate from '../../helpers/transformFirebaseDate';

import Game, { GameStatus } from '../../types/game';

const fetchGamesAsync = createAsyncThunk(
    'feed/fetch',
    async (filter?: GameStatus) => {
        const data: Game[] = [];
        const filterBy: ['!=' | '==', GameStatus] = !!filter
            ? ['==', filter]
            : ['!=', 'preparing'];
        const snapshot = await getDocs(
            query(
                collection(db, `games`),
                where('status', filterBy[0], filterBy[1]),
                orderBy('status'),
                orderBy('startedAt', 'desc'),
                limit(10)
            )
        );

        if (snapshot.empty) return [];

        snapshot.forEach((doc): void => {
            const docData = doc.data() as Game;
            const transform = transformFirebaseDate(docData);

            data.push({
                ...docData,
                ...transform('createdAt'),
                ...transform('startedAt'),
                id: doc.id,
            });
        });

        return data;
    }
);

export default fetchGamesAsync;
