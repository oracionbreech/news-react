import { createSlice } from '@reduxjs/toolkit';
import { Article } from '../../models/articles';

export const articleSlice = createSlice(
  {
    name: 'articles',
    initialState: [] as Article[],
    reducers: {
      updateArticles: (state: any) => {
        console.log(state);
      },
    },
  }
);
