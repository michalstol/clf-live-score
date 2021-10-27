import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

// import storageAPI from '../../helpers/storageAPI';

import fetchGamesAsync from '../asyncActions/fetchGamesAsync';

import FetchStatus from '../../types/fetchStatus';
import Game from '../../types/game';

// Initial state build on default values and data from localStorage
interface FeedState {
    status: FetchStatus;
    data: Game[] | null;
}

const initialState: FeedState = {
    status: 'idle',
    data: null,
};

// Slice
export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchGamesAsync.pending, state => {
                return { ...state, status: 'loading' };
            })
            .addCase(fetchGamesAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'idle',
                    data: [...action.payload],
                };
            })
            .addCase(fetchGamesAsync.rejected, state => {
                return { ...state, status: 'failed' };
            });
    },
});

// Selects
export const selectFeed = (state: RootState) => state.feed;

// Reducer
export default feedSlice.reducer;
