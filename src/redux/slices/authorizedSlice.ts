import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

import storageAPI from '../../helpers/storageAPI';

// Don't need to store all data from Firebase
export interface ShortUser {
    displayName: string | null;
    photoURL: string | null;
    uid: string;
}

export type UserType = ShortUser | null;
export type ConnectionType = boolean;
export type LoggedType = boolean;

interface UserState {
    user: UserType;
}

export interface AuthState extends UserState {
    connected: ConnectionType;
    logged: LoggedType;
}

export interface StrictAuthState {
    connected: ConnectionType;
    logged: LoggedType;
    user: ShortUser;
}

// Gets data from localStorage
const authFromStorage = storageAPI.get<UserState>('auth') || {};

// Initial state build on default values and data from localStorage
const initialState: AuthState = {
    ...{ user: null, connected: false, logged: false },
    user: authFromStorage?.user || null,
    logged: !!authFromStorage?.user,
};

// Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeUser: (state, { payload: user }: PayloadAction<UserType>) => {
            storageAPI.set('auth', {
                user,
            });

            return { ...state, user, logged: !!user };
        },
        changeConnection: (
            state,
            { payload: connected }: PayloadAction<ConnectionType>
        ) => {
            return { ...state, connected };
        },
    },
});

// Actions
export const { changeUser, changeConnection } = authSlice.actions;

// Selects
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectLogged = (state: RootState) => state.auth.logged;
export const selectConnection = (state: RootState) => state.auth.connected;

// Reducer
export default authSlice.reducer;
