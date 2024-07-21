'use client';

import React, { useEffect } from 'react';
import { isFullBlock } from '@notionhq/client';
import BaseLayout from 'components/BaseLayout';
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { isFullPage } from '@notionhq/client';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import Image from 'next/image';
import { Row, Col } from 'antd';

interface ArticleProps {
  article: (BlockObjectResponse | PartialBlockObjectResponse)[];
  articleProperty: GetPageResponse;
}

function breakLinesWithBr(textArray: RichTextItemResponse[]) {
  let text = '';
  if (Array.isArray(textArray) && textArray.length > 0) {
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

const Article: React.FC<ArticleProps> = ({ article, articleProperty }) => {
  let title = '';
  if (
    isFullPage(articleProperty) &&
    articleProperty.properties &&
    articleProperty.properties.title.type === 'title'
  ) {
    if (Array.isArray(articleProperty.properties.title.title)) {
      title = articleProperty.properties.title.title[0].plain_text;
    }
  }

  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll();
    };
    highlight();
  }, [article]);

  return (
    <BaseLayout>
      <Row justify="center">
        <Col span={17}>
          <h1>{title}</h1>
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
              } else if (item.type === 'image') {
                const texts = breakLinesWithBr(item.image.caption);
                return (
                  <div key={item.id} className="article-image-container">
                    <div>
                      <Image
                        alt="image"
                        fill
                        src={item.image.type === 'file' ? item.image.file.url : ''}
                        className="article-image"
                      />
                    </div>
                    <span>{texts}</span>
                  </div>
                );
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
        </Col>
      </Row>
    </BaseLayout>
  );
};

export default Article;
