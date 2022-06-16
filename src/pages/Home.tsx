import React from 'react';
import { useQuery } from 'react-query';

// Components
import Loading from '../components/Loading';
import Article from '../components/Home/Article';
import TopArticle from '../components/Home/TopArticle';
// Hooks
import { usePageTitle } from '../hooks/usePageTitle';

// Services
import { getTopArticles } from '../services/newsapi/getTopArticles';
import { Article as IArticle } from '../models/articles';

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
        <TopArticle
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
                <Article
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
