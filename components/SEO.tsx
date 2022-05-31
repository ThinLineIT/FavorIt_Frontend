import Head from 'next/head';
import siteMetadata from 'database/sitemap';

const SEO = () => {
  return (
    <Head>
      {/* Default SEO */}
      <title>{siteMetadata.title}</title>

      {/* 파비콘 */}
      <link rel="icon" href="/assets/images/favicon.png" type="image/png" />
      <link rel="icon" href="/favicon-32x32.png" type="image/png" />

      {/* 로봇 방문 허용 */}
      <meta name="robots" content="follow, index" />

      {/* 사이트 이름 */}
      <meta property="og:site_name" content={siteMetadata.sitename} />

      {/* 사이트 url */}
      <meta property="og:url" content={siteMetadata.siteUrl} />

      {/* 사이트 국가(?) */}
      <meta property="og:locale" content={siteMetadata.locale} />

      {/* 사이트 목적 타입 */}
      <meta property="og:type" content={siteMetadata.type} />

      {/* 게시글 제목 */}
      <meta property="og:title" content={siteMetadata.title} />
      <meta name="twitter:title" content={siteMetadata.title} />

      {/* 게시글 설명 */}
      <meta property="og:description" content={siteMetadata.description} />
      <meta property="twitter:description" content={siteMetadata.description} />

      {/* 썸네일 이미지 */}
      <meta property="og:image" content={siteMetadata.image} />
      <meta name="twitter:image" content={siteMetadata.image} />

      {/* 썸네일 표시 방법  */}
      <meta name="twitter:card" content="summary_large_image" />

      {/* Open Graph */}
      <meta name="description" content={siteMetadata.description} />
      <meta name="keywords" content={siteMetadata.keywords} />
      <meta name="author" content={siteMetadata.author} />
      <meta name="reply-to" content={siteMetadata.email} />
      <link rel="canonical" href={siteMetadata.siteUrl} />
    </Head>
  );
};

export default SEO;
