import styles from '../styles/Home.module.css'
import { Client } from "@notionhq/client"
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID || ""

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Pages({ results }: Props) {
  console.log(results)
  return (
    <div>
      {
        results.map((result) => {
        const text = result.paragraph.rich_text.length > 0 ? result.paragraph.rich_text[0].plain_text : ""
        console.log(text)
        return (
          <div>
            <div>{ text }</div>
          </div>
        )
      })}
    </div>
  )
}

export async function getStaticProps() {
  // const router = useRouter();
  // console.log(router.query);
  // const blockId = router.query.blockId || ""
  const response = await notion.blocks.children.list({
    block_id: "",
    page_size: 50,
  })
  return {
    props: {
      results: response.results
    }
  }
}
