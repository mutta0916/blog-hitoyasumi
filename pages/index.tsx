import styles from '../styles/Home.module.css'
import { Client } from "@notionhq/client"
import { InferGetStaticPropsType } from 'next';

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID || ""

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ results }: Props) {
  return (
    <div className={styles.grid}>
      {results.map((result) => {
        const title = result.properties.title.title[0].plain_text
        const url = `/page?blockId=${result.id}`
        return (
          <a
            href={ url }
            className={styles.card}
          >
          <h2>{ title }</h2>
          </a>
        )
      })}
    </div>
  )
}

export async function getStaticProps() {
  const response = await notion.databases.query({
    database_id: databaseId
  })
  return {
    props: {
      results: response.results
    }
  }
}
