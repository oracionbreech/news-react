import React from 'react';
import { useQuery } from 'react-query';
import md5 from 'md5';
import { useDispatch } from 'react-redux';

// Services
import { getTopArticles } from '../services/newsapi/getTopArticles';

// Store
import { updateArticles } from '../store/articles/articleSlice';
import { Article } from '../models/articles';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { isEmpty } from 'lodash';
import { getNewsByKeyWord } from '../services/newsapi/getNewsByKeyword';

export const useNews = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const search = new URLSearchParams(
    location.search
  ).get('query');

  const handleSubmitSearch = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const data = new FormData(
      e.currentTarget
    );

    navigate(
      `/?query=${data.get('search')}`,
      {
        replace: true,
      }
    );
  };

  const [news, setNews] =
    React.useState<Article[]>([]);

  const onSuccess = (data: {
    articles: Article[];
  }) => {
    const hashed = data.articles.map(
      (article) => ({
        ...article,
        id: md5(article.title),
      })
    );
    dispatch(updateArticles(hashed));
    setNews(hashed);
    data.articles = hashed;
  };

  const {
    isLoading: topArticlesLoading,
    error: topArticlesError,
    refetch,
  } = useQuery(
    'articles',
    getTopArticles,
    {
      onSuccess,
      enabled: false,
    }
  );

  const {
    data,
    refetch: initSearch,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery(
    'search',
    () =>
      getNewsByKeyWord(String(search)),
    {
      onSuccess: onSuccess,
      enabled: false,
    }
  );

  console.log(data);

  React.useEffect(() => {
    setNews([]);
    if (
      search !== null &&
      !isEmpty(search)
    ) {
      // TODO: search init here
      initSearch();
    } else {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return {
    news,
    isLoading:
      topArticlesLoading ||
      searchLoading,
    handleSubmitSearch,
    error:
      topArticlesError || searchError,
  };
};
