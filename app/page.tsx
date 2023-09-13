import React from 'react';
import ArticleList from 'components/ArticleList';
import BaseLayout from 'components/BaseLayout';
import { getArticles } from 'BlogActions';

const Page = async () => {
  const articles = await getArticles();
  return (
    <BaseLayout>
      <ArticleList articles={articles} />
    </BaseLayout>
  );
};

export default Page;
