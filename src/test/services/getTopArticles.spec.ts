// Services
import { getTopArticles } from '../../services/newsapi/getTopArticles';

test('should get all top headlines', async () => {
  const { articles } =
    await getTopArticles(5);

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
