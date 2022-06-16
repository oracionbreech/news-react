import React from 'react';
import { useParams } from 'react-router-dom';

const Article = () => {
  const { id } = useParams();

  console.log(id);

  return <div>Article</div>;
};

export default Article;
