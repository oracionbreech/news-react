import { configureStore } from '@reduxjs/toolkit';
import { articleSlice } from './articles/articleSlice';

export const store = configureStore({
  reducer: {
    articles: articleSlice.reducer,
  },
});
