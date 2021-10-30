import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

import storageAPI from '../../helpers/storageAPI';

import GenericObject from '../../types/genericObject';
import { GameTeamsType } from '../../types/gameTeam';

// Initial state build on default values and data from localStorage
type LiveState = GenericObject<GameTeamsType>;

const initialState: LiveState = storageAPI.get('live');

// Slice
export const liveSlice = createSlice({
    name: 'live',
    initialState,
    reducers: {
        updateLive: (state, { payload }: PayloadAction<LiveState>) => {
            const newState: LiveState = { ...state, ...payload };

            storageAPI.set('live', { ...newState });

            return { ...newState };
        },
    },
});

// Actions
export const { updateLive } = liveSlice.actions;

// Selects
export const selectLive = (state: RootState) => state.live;

// Reducer
export default liveSlice.reducer;
