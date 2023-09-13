'use client';

import React from 'react';
import { isFullBlock } from '@notionhq/client';
import BaseLayout from 'components/BaseLayout';
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

interface ArticleProps {
  article: (BlockObjectResponse | PartialBlockObjectResponse)[];
}

function breakLinesWithBr(textArray: RichTextItemResponse[]) {
  let text = '';
  if (Array.isArray(textArray)) {
    text = textArray[0].plain_text;
  }
  const texts = text.split('\n').map((item) => {
    return (
      <>
        {item}
        <br />
      </>
    );
  });
  return texts;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  React.useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll();
    };
    highlight();
  }, [article]);

  return (
    <BaseLayout>
      <div className="article-content-container">
        <div className="article-content">
          {article.map((item) => {
            if (!isFullBlock(item)) {
              return null;
            }
            if (item.type === 'paragraph') {
              const texts = breakLinesWithBr(item.paragraph.rich_text);
              return <p key={item.id}>{texts}</p>;
            } else if (item.type === 'heading_1') {
              const texts = breakLinesWithBr(item.heading_1.rich_text);
              return <h1 key={item.id}>{texts}</h1>;
            } else if (item.type === 'heading_2') {
              const texts = breakLinesWithBr(item.heading_2.rich_text);
              return <h2 key={item.id}>{texts}</h2>;
            } else if (item.type === 'heading_3') {
              const texts = breakLinesWithBr(item.heading_3.rich_text);
              return <h3 key={item.id}>{texts}</h3>;
            } else if (item.type === 'bulleted_list_item') {
              const texts = breakLinesWithBr(item.bulleted_list_item.rich_text);
              return <li key={item.id}>{texts}</li>;
            } else if (item.type === 'code') {
              let text = '';
              if (Array.isArray(item.code.rich_text)) {
                text = item.code.rich_text[0].plain_text.replace(/^\n/, '');
              }
              return (
                <pre key={item.id}>
                  <code className="language-js">{text}</code>
                </pre>
              );
            }
          })}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Article;
