import React from 'react';
import { useQuery } from 'react-query';
import Article from '../components/Home/Article';

// Components
import Loading from '../components/Loading';

// Services
import { getTopArticles } from '../services/newsapi/getTopArticles';

const Home = () => {
  const { data, isLoading, error } =
    useQuery(
      'articles',
      getTopArticles
    );

  if (isLoading) return <Loading />;

  if (error)
    return <h1>An error occurred</h1>;

  return (
    <div className='grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4'>
      {data &&
        data.articles &&
        data.articles.map((article) => {
          return (
            <Article
              key={article.title}
              article={article}
            />
          );
        })}
    </div>
  );
};

export default Home;
