// Models
import { SortArticle } from '../../models/articles';

// Services
import { getNewsByKeyWord } from '../../services/newsapi/getNewsByKeyword';

test('should search news by keyword', async () => {
  const keyword = 'bitcoin';
  const sortBy: SortArticle =
    'popularity';

  const { articles } =
    await getNewsByKeyWord(
      keyword,
      sortBy
    );
  expect(
    articles.length
  ).toBeGreaterThan(0);
  expect(articles).not.toBeUndefined();
  expect(articles[0]).toHaveProperty(
    'author'
  );
  expect(articles[0]).toHaveProperty(
    'title'
  );
  expect(articles[0]).toHaveProperty(
    'content'
  );
});

test('should search news by keyword but with an invalid keyword', async () => {
  const keyword = 'asg1231g';
  const sortBy: SortArticle =
    'popularity';

  const { articles } =
    await getNewsByKeyWord(
      keyword,
      sortBy
    );
  expect(articles.length).toBe(0);
});
