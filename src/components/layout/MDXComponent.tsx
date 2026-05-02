import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/routing';
import React from 'react';

// Custom components to override default HTML elements for consistent UI-UX
const components = {
  a: (props: any) => {
    const href = props.href;
    if (href && href.startsWith('/')) {
      return <Link href={href} {...props} />;
    }
    if (href && href.startsWith('#')) {
      return <a {...props} />;
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
};

interface MDXComponentProps {
  source: string;
  className?: string;
  components?: MDXRemoteProps['components'];
}

export function MDXComponent({ source, className = '', components: additionalComponents }: MDXComponentProps) {
  // Base prose styling ensuring dark/light mode compatibility and beautiful typography
  const baseProseClasses = `
    prose dark:prose-invert prose-lg max-w-none text-foreground text-justify
    prose-headings:font-outfit prose-headings:text-foreground
    prose-p:text-justify
    prose-strong:text-foreground
    prose-a:text-electric-blue
    prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-foreground/10 prose-pre:backdrop-blur-xl
    prose-li:marker:text-electric-blue
    prose-code:text-electric-blue
    prose-blockquote:border-l-electric-blue
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className={`${baseProseClasses} ${className}`.trim()}>
      <MDXRemote 
        source={source} 
        components={{ ...components, ...additionalComponents }}
        options={{
          mdxOptions: {
            // remarkGfm adds support for standard GitHub Flavored Markdown (tables, strikethrough, tasklists)
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
          }
        }}
      />
    </div>
  );
}
