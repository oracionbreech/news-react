import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

// Hooks
import { usePageTitle } from '../hooks/usePageTitle';

// Models
import { Article as IArticle } from '../models/articles';

const Article = () => {
  const articles = useSelector(
    (state: { articles: IArticle[] }) =>
      state.articles
  );

  console.log(articles);

  const { id } = useParams();

  usePageTitle('Article');

  const article = articles.find(
    ({ id: articleID }) =>
      id === articleID
  );

  return (
    <div className='sm:p-2 md:p-2 p-2 cursor-pointer mb-3 w-full h-400px bg-white shadow-sm dark:bg-gray-800 md:text-red-400'>
      <div className='h-5/6'>
        <div className='w-full justify-center flex mb-3'>
          <img
            className='md:rounded-t-lg md:w-full w-12/12'
            src={article?.urlToImage}
            alt=''
          />
        </div>
        <span>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {article?.title}
          </h5>
        </span>
        <p className='font-normal text-gray-700 dark:text-gray-400'>
          {article?.description}
        </p>

        <p className='mt-3 font-light text-gray-700 dark:text-gray-400'>
          {parse(
            String(article?.content)
          )}
        </p>
      </div>
      <a
        href={article?.url}
        target='_blank'
        className='mt-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        rel='noreferrer'
      >
        See Full Read
        <svg
          className='ml-2 -mr-1 w-4 h-4'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
            clipRule='evenodd'
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default Article;
