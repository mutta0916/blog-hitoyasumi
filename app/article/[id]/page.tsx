import React from 'react';
import Article from './Article';
import { getArticles, getArticle } from 'BlogActions';

export async function generateStaticParams() {
  const result = await getArticles();
  return result.map((article) => ({
    id: article.id,
  }));
}

const Page = async ({ params }: { params: any }) => {
  const article = await getArticle(params.id);
  return <Article article={article} />;
};

export default Page;
