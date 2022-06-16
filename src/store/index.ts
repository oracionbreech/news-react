import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

// Slices
import { articleSlice } from './articles/articleSlice';

export const store = configureStore({
  reducer: combineReducers({
    articles: articleSlice.reducer,
  }),
});
