import React from 'react';
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';

// Components
import Loading from '../components/Loading';
import ArticleCard from '../components/Home/ArticleCard';
import TopArticleCard from '../components/Home/TopArticleCard';

// Constants
import { sortByOptions } from '../constants/articles';

// Hooks
import { usePageTitle } from '../hooks/usePageTitle';
import { useNews } from '../hooks/useNews';

// Models
import { Article as IArticle } from '../models/articles';

const Home = () => {
  usePageTitle('Home');

  const location = useLocation();

  const search = new URLSearchParams(
    location.search
  ).get('query');

  const {
    news,
    error,
    isLoading,
    handleSubmitSearch,
    handleSortBySelect,
    loadMore,
  } = useNews();

  if (error)
    return <h1>An error occurred</h1>;

  return (
    <div className='w-full'>
      {search !== null && (
        <div className='p-3 flex'>
          <form
            onSubmit={
              handleSubmitSearch
            }
            className='w-3/6'
          >
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
                name='search'
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

          <div className='flex w-2/6 items-center ml-3'>
            <label
              htmlFor='countries'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
            >
              Sort
            </label>
            <select
              id='countries'
              className='ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={
                handleSortBySelect
              }
            >
              {sortByOptions.map(
                (sort) => (
                  <option
                    key={sort.value}
                    value={sort.value}
                  >
                    {sort.text}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      )}
      {!isEmpty(news) &&
        isEmpty(search) &&
        news && (
          <TopArticleCard
            article={
              news[0] as IArticle
            }
          />
        )}
      {!isEmpty(news) && (
        <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-3 lg:grid-cols-3 p-4'>
          {news
            .slice(
              !isEmpty(search) ? 0 : 1,
              news.length
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
      )}
      {isEmpty(news) &&
        !isLoading &&
        search === null && (
          <div className='w-full flex justify-center'>
            <h1 className='mt-10 text-xl'>
              Nothing to see here. :(
            </h1>
          </div>
        )}
      {isEmpty(news) &&
        !isLoading &&
        search !== null && (
          <div className='w-full flex justify-center'>
            <h1 className='mt-10 text-xl'>
              Found now news with the
              keyword {search}.
            </h1>
          </div>
        )}

      {isLoading && <Loading />}

      <div className='p-6 w-full'>
        <button
          type='button'
          onClick={loadMore}
          className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full'
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Home;
