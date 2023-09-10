import React from 'react';
import ArticleList from 'components/ArticleList';
import { Client } from '@notionhq/client';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function getArticles() {
  if (!databaseId) {
    return;
  }
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results;
}

const Page: React.FC = async () => {
  const articles = await getArticles();
  return <ArticleList articles={articles} />;
};

export default Page;
