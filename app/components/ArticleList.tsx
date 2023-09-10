'use client';

import React from 'react';
import { Layout, List } from 'antd';
import { CalendarTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import defaultImage from '../../public/programing.jpg';
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { isFullPageOrDatabase } from '@notionhq/client';

const { Header, Content, Footer } = Layout;

interface ArticleListProps {
  articles?: (
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  )[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <Layout>
      <Header className="header">
        <Link className="header-link" href="/">
          お湯。のブログ
        </Link>
      </Header>
      <Content className="content">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 5,
          }}
          dataSource={articles}
          renderItem={(item) => {
            if (!isFullPageOrDatabase(item)) {
              return null;
            }
            let title = '';
            if (item.properties.title.type === 'title') {
              if (Array.isArray(item.properties.title.title)) {
                console.log(item.properties.title.title[0]);
                title = item.properties.title.title[0].plain_text;
              }
            }
            const updateDate = new Date(item.last_edited_time);
            const year = updateDate.getFullYear();
            const month = updateDate.getMonth() + 1;
            const day = updateDate.getDate();
            return (
              <List.Item key={item.id} extra={<Image width={272} alt="logo" src={defaultImage} />}>
                <List.Item.Meta
                  title={<Link href={`/article/${item.id}`}>{title}</Link>}
                  description={
                    <>
                      <CalendarTwoTone twoToneColor="#ffd803" className="carender-icon" />
                      {`${year}年${month}月${day}日`}
                    </>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Content>
      <Footer className="footer"> ©2023 お湯。</Footer>
    </Layout>
  );
};

export default ArticleList;
