import { Client } from "@notionhq/client"
import styles from '../styles/Page.module.css'

const notion = new Client({ auth: process.env.NOTION_KEY })

export default function Page({ results }) {
  return (
    <div className={styles.page}>
      {
        results.map((result, index) => {
        const text = result.paragraph.rich_text.length > 0 ? result.paragraph.rich_text[0].plain_text : ""
        return (
          <div key={index}>{ text }</div>
        )
        })}
    </div>
  )
}

export async function getServerSideProps(context) {
  const response = await notion.blocks.children.list({
    block_id: context.query.blockId,
    page_size: 50,
  })
  return {
    props: {
      results: response.results
    }
  }
}
