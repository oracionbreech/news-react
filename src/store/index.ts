import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// Slices
import { articleSlice } from './articles/articleSlice';

const reducers = combineReducers({
  articles: articleSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducers =
  persistReducer(
    persistConfig,
    reducers
  );

export const store = configureStore({
  reducer: persistedReducers,
  devTools:
    process.env.NODE_ENV !==
    'production',
  middleware: [thunk],
});
