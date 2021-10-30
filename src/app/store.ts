import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authorizedSlice';
import feedReducer from '../redux/slices/feedSlice';
import liveReducer from '../redux/slices/liveSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        feed: feedReducer,
        live: liveReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
