export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  description: string;
  author: string;
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
