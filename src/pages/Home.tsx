import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import md5 from 'md5';
import { useDispatch } from 'react-redux';

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

// Store
import { updateArticles } from '../store/articles/articleSlice';

const Home = () => {
  usePageTitle('Home');

  const location = useLocation();

  const search = new URLSearchParams(
    location.search
  ).get('query');

  const dispatch = useDispatch();

  const { data, isLoading, error } =
    useQuery(
      'articles',
      getTopArticles,
      {
        onSuccess: (data) => {
          const hashed =
            data.articles.map(
              (article) => ({
                ...article,
                id: md5(article.title),
              })
            );
          dispatch(
            updateArticles(hashed)
          );
          data.articles = hashed;
        },
      }
    );

  if (isLoading) return <Loading />;

  if (error)
    return <h1>An error occurred</h1>;

  return (
    <div>
      {search !== null && (
        <div className='p-3'>
          <form>
            <label
              htmlFor='default-search'
              className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300'
            >
              Search
            </label>
            <div className='relative'>
              <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  ></path>
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                className='block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search news...'
                required
              />
              <button
                type='submit'
                className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}
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
