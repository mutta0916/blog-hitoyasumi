import { Client } from '@notionhq/client';
import type {
  QueryDatabaseResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getArticles() {
  const id = databaseId || '';

  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: id,
    filter: {
      property: 'publish',
      checkbox: {
        equals: true,
      },
    },
  });
  return response.results;
}

export async function getArticle(id: string) {
  const response: ListBlockChildrenResponse = await notion.blocks.children.list({
    block_id: id,
    page_size: 100,
  });
  return response.results;
}
