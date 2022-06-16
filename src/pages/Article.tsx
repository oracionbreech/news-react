import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Hooks
import { usePageTitle } from '../hooks/usePageTitle';

// Models
import { Article as IArticle } from '../models/articles';

const Article = () => {
  const articles = useSelector(
    (state: { articles: IArticle[] }) =>
      state.articles
  );

  const { id } = useParams();

  usePageTitle('Article');

  const article = articles.find(
    ({ id: articleID }) =>
      id === articleID
  );

  return <div>{article?.title}</div>;
};

export default Article;
