import React from 'react';
import { useQuery } from 'react-query';
import md5 from 'md5';
import { useDispatch } from 'react-redux';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { isEmpty } from 'lodash';

// Services
import { getTopArticles } from '../services/newsapi/getTopArticles';
import { getNewsByKeyWord } from '../services/newsapi/getNewsByKeyword';

// Store
import { updateArticles } from '../store/articles/articleSlice';
import {
  Article,
  SortArticle,
} from '../models/articles';

export const useNews = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const search = new URLSearchParams(
    location.search
  ).get('query');

  // This should fire when user submits search textfiel
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

  // Handles when sort by changes
  const handleSortBySelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) =>
    setSortBy(
      e.target.value as SortArticle
    );

  const [news, setNews] =
    React.useState<Article[]>([]);

  const [sortBy, setSortBy] =
    React.useState<SortArticle>(
      'publishedAt'
    );

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
    refetch: initSearch,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery(
    'search',
    () =>
      getNewsByKeyWord(
        String(search),
        sortBy
      ),
    {
      onSuccess: onSuccess,
      enabled: false,
    }
  );

  React.useEffect(() => {
    setNews([]);
    if (
      search !== null &&
      !isEmpty(search)
    ) {
      console.log(sortBy);

      // TODO: search init here
      initSearch();
    } else {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortBy]);

  return {
    setSortBy,
    sortBy,
    news,
    isLoading:
      topArticlesLoading ||
      searchLoading,
    handleSubmitSearch,
    handleSortBySelect,
    error:
      topArticlesError || searchError,
  };
};
