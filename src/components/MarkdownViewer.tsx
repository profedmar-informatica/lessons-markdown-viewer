import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Callout from './Callout';
import CodeBlock from './CodeBlock';
import { cn } from '@/lib/utils';

interface MarkdownViewerProps {
  content: string;
  resolvedImageMap: Record<string, string>;
  currentCategory?: string;
  pageTitle: string; // New prop for the main page title
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = React.memo(({ content, resolvedImageMap, currentCategory, pageTitle }) => {
  const CustomImage = ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) return null;

    let finalSrc = src;

    // If the src is a relative path (e.g., './image.svg'), try to resolve it using the map
    if (src.startsWith('./') && currentCategory) {
      const imageKey = `${currentCategory}/${src.replace('./', '')}`;
      if (resolvedImageMap[imageKey]) {
        finalSrc = resolvedImageMap[imageKey];
      }
    } else if (src.startsWith('/')) { // Handle absolute paths from content root if any
      const imageKey = src.substring(1); // Remove leading slash
      if (resolvedImageMap[imageKey]) {
        finalSrc = resolvedImageMap[imageKey];
      }
    }
    // If it's an external URL or couldn't be resolved, use the original src

    return <img src={finalSrc} alt={alt || ''} className="markdown-image" />;
  };

  return (
    <div className={cn(
      "prose prose-base max-w-full mx-auto py-6 px-4 rounded-lg", // Responsive padding and max-width for mobile
      "lg:max-w-[894px] lg:pt-14 lg:pb-10 lg:px-10", // Desktop specific padding and max-width
      "bg-[var(--papel)] border border-[#E0D8C7] shadow-[0_5px_15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)]", // Light mode surfaces using var(--papel)
      "dark:border-vscode-border-sidebar dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]", // Dark mode surfaces
      "leading-relaxed", // Added line-height for body
      "[&_p]:text-[#374151] dark:[&_p]:text-vscode-text-lesson", // Updated p text color for light mode
      "[&_li]:text-[#374151] dark:[&_li]:text-vscode-text-lesson", // Updated li text color for light mode
      // H1 styles (now controlled by pageTitle prop)
      "[&_h1]:text-[1.75rem] [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mb-6 [&_h1]:text-[#374151] dark:[&_h1]:text-vscode-text-heading",
      // H2 styles
      "[&_h2]:text-[1.4rem] [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-slate-200 [&_h2]:dark:border-slate-800 [&_h2]:pb-2 [&_h2]:text-[#374151] dark:[&_h2]:text-vscode-text-heading",
      // Keep existing h3-h6 styles as they were not explicitly changed
      "[&_h3]:text-slate-900 dark:[&_h3]:text-vscode-text-heading",
      "[&_h4]:text-slate-900 dark:[&_h4]:text-vscode-text-heading",
      "[&_h5]:text-slate-900 dark:[&_h5]:text-vscode-text-heading",
      "[&_h6]:text-slate-900 dark:[&_h6]:text-vscode-text-heading"
    )}>
      {/* Render the main page title from frontmatter */}
      <h1 className="text-[1.75rem] font-bold tracking-tight mb-6 text-[#374151] dark:text-vscode-text-heading">
        {pageTitle}
      </h1>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[]}
        components={{
          // Override h1 to render nothing, as the main title is handled above
          h1: () => null, 
          blockquote: ({ children }) => {
            const text = String(children);
            let type: 'tip' | 'warning' | 'exercise' | 'default' = 'default';
            if (text.startsWith('**Dica:**')) {
              type = 'tip';
            } else if (text.startsWith('**Atenção:**')) {
              type = 'warning';
            } else if (text.startsWith('**Exercício:**')) {
              type = 'exercise';
            }
            return <Callout type={type}>{children}</Callout>;
          },
          pre: ({ children }) => <>{children}</>,
          code: ({ inline, className, children }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeContent = String(children);

            return !inline ? (
              <CodeBlock code={codeContent} language={match ? match[1] : ''} />
            ) : (
              <code className="bg-muted px-1 rounded text-pink-500 font-mono">
                {children}
              </code>
            );
          },
          img: CustomImage, // Use o componente de imagem customizado
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

export default MarkdownViewer;