// Models
import { Article } from '../../models/articles';

// Services
import { newsAPI } from './newsapi';

const NEWS_API_KEY =
  process.env.REACT_APP_NEWS_API_KEY;

export const getTopArticles = async (
  pageSize: number
) => {
  const { data } = await newsAPI.get<{
    articles: Article[];
  }>(
    `/top-headlines?apiKey=${NEWS_API_KEY}&country=us&pageSize=${pageSize}`
  );

  return data;
};
