import React from 'react';
import { useQuery } from 'react-query';
// Components
import Loading from '../components/Loading';
import ArticleCard from '../components/Home/ArticleCard';
import TopArticleCard from '../components/Home/TopArticleCard';

// Hooks
import { usePageTitle } from '../hooks/usePageTitle';

// Models
import { Article as IArticle } from '../models/articles';

// Services
import { getTopArticles } from '../services/newsapi/getTopArticles';

const Home = () => {
  usePageTitle('Home');
  const { data, isLoading, error } =
    useQuery(
      'articles',
      getTopArticles
    );

  if (isLoading) return <Loading />;

  if (error)
    return <h1>An error occurred</h1>;

  return (
    <div>
      {data && data.articles && (
        <TopArticleCard
          article={
            data.articles[0] as IArticle
          }
        />
      )}
      <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-3 lg:grid-cols-3 p-4'>
        {data &&
          data.articles &&
          data.articles
            .slice(
              1,
              data.articles.length
            )
            .map((article) => {
              return (
                <ArticleCard
                  key={article.title}
                  article={article}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Home;
