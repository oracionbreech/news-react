import { createSlice } from '@reduxjs/toolkit';

// Models
import { Article } from '../../models/articles';

export const articleSlice = createSlice(
  {
    name: 'article',
    initialState: [] as Article[],
    reducers: {
      updateArticles: (
        _state: Article[],
        action: { payload: Article[] }
      ) => {
        _state = action.payload;
        return _state;
      },
    },
  }
);

export const { updateArticles } =
  articleSlice.actions;
