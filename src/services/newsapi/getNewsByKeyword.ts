// Models
import { Article } from '../../models/articles';

// Services
import { newsAPI } from './newsapi';

const NEWS_API_KEY =
  process.env.REACT_APP_NEWS_API_KEY;

export const getNewsByKeyWord = async (
  search: string,
  sortBy: string
) => {
  const { data } = await newsAPI.get<{
    articles: Article[];
  }>(
    `/everything?q=${search}&apiKey=${NEWS_API_KEY}&sortBy=${sortBy}`
  );

  return data;
};
