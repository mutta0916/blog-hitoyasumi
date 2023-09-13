'use client';

import { Layout } from 'antd';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

const ArticleList = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Header className="header">
        <Link className="header-link" href="/">
          お湯。のブログ
        </Link>
      </Header>
      <Content className="content">{children}</Content>
      <Footer className="footer"> ©2023 お湯。</Footer>
    </Layout>
  );
};

export default ArticleList;
