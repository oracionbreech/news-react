// Pages
import Article from '../pages/Article';
import Home from '../pages/Home';

export const routes = [
  {
    path: '/',
    element: Home,
    name: 'home',
  },
  {
    path: '/article/:id',
    element: Article,
    name: 'article',
  },
];
