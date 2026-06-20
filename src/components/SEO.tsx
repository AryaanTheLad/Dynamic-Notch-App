import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
  robots?: string;
  children?: React.ReactNode;
}

export default function SEO({ 
  title, 
  description, 
  name = "Dynamic Notch", 
  type = "website",
  url,
  image = "https://dynamicnotch.tech/urlicon.png?v=2",
  robots = "index, follow",
  children
}: SEOProps) {
  const { pathname } = useLocation();
  const canonicalUrl = url || `https://dynamicnotch.tech${pathname === '/' ? '' : pathname}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name="robots" content={robots} />
      
      {/* Canonical link */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* For any structured data schemas like JSON-LD */}
      {children}
    </Helmet>
  );
}
