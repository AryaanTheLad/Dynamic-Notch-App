import SEO from './SEO';

interface ArticleSEOProps {
  title: string;
  description: string;
  authorName?: string;
  publishDate: string;
  /** Only when the post has actually been revised; defaults to the publish date. */
  modifiedDate?: string;
  url?: string;
}

/**
 * Title and description for an article route, plus the `- Dynamic Notch Blog` suffix.
 *
 * The `BlogPosting` JSON-LD for every article is emitted by `scripts/prerender.js`,
 * which enriches each entry with author, publisher, image, dateModified and
 * mainEntityOfPage from one place. It used to be built here as well, and the two copies
 * both ended up in the DOM, see the note in `SEO.tsx`. Schema now has exactly one
 * owner, and `publishDate` / `modifiedDate` / `authorName` stay in the signature so the
 * call sites keep documenting each post's real dates alongside its copy.
 */
export default function ArticleSEO({ title, description, url }: ArticleSEOProps) {
  return (
    <SEO
      title={`${title} - Dynamic Notch Blog`}
      description={description}
      type="article"
      url={url}
    />
  );
}
