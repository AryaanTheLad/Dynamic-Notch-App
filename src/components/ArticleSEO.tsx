import SEO from './SEO';

interface ArticleSEOProps {
  title: string;
  description: string;
  authorName?: string;
  publishDate: string;
  url?: string;
}

export default function ArticleSEO({
  title,
  description,
  authorName = "Aryaan",
  publishDate,
  url
}: ArticleSEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "datePublished": publishDate
  };

  return (
    <SEO 
      title={`${title} - Dynamic Notch Blog`} 
      description={description}
      type="article"
      url={url}
    >
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </SEO>
  );
}
