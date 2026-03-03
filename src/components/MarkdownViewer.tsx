import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Callout from './Callout';
import CopyCodeButton from './CopyCodeButton';
import { cn } from '@/lib/utils'; // Importar cn para classes condicionais

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className={cn(
      "prose prose-base lg:prose-lg max-w-[794px] mx-auto pt-16 pb-12 px-12 rounded-lg", // Updated scale and padding
      "bg-[#FDFDFD] border border-[#E0D8C7] shadow-[0_5px_15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)]", // Light mode surfaces
      "dark:bg-vscode-bg-global dark:border-vscode-border-sidebar dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]", // Dark mode surfaces
      "leading-relaxed", // Added line-height for body
      "[&_p]:text-slate-800 dark:[&_p]:text-vscode-text-lesson", // Updated p text color
      "[&_li]:text-slate-800 dark:[&_li]:text-vscode-text-lesson", // Updated li text color
      // H1 styles
      "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mb-8 dark:[&_h1]:text-vscode-text-heading",
      // H2 styles
      "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-slate-200 [&_h2]:dark:border-slate-800 [&_h2]:pb-2 dark:[&_h2]:text-vscode-text-heading",
      // Keep existing h3-h6 styles as they were not explicitly changed
      "[&_h3]:text-slate-900 dark:[&_h3]:text-vscode-text-heading",
      "[&_h4]:text-slate-900 dark:[&_h4]:text-vscode-text-heading",
      "[&_h5]:text-slate-900 dark:[&_h5]:text-vscode-text-heading",
      "[&_h6]:text-slate-900 dark:[&_h6]:text-vscode-text-heading"
    )}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          blockquote: ({ node, ...props }) => {
            const text = String(props.children);
            let type: 'tip' | 'warning' | 'exercise' | 'default' = 'default';
            if (text.startsWith('**Dica:**')) {
              type = 'tip';
            } else if (text.startsWith('**Atenção:**')) {
              type = 'warning';
            } else if (text.startsWith('**Exercício:**')) {
              type = 'exercise';
            }
            return <Callout type={type}>{props.children}</Callout>;
          },
          pre: ({ children }) => {
            let codeContent: string | undefined;
            const firstChild = React.Children.toArray(children)[0];

            if (React.isValidElement(firstChild)) {
              const props = firstChild.props as { children?: string };
              if (typeof props.children === 'string') {
                codeContent = props.children;
              }
            }
            
            return (
              <div className="relative">
                <pre className="rounded-lg p-4 pr-12 bg-gray-800 text-white overflow-x-auto">
                  {children}
                </pre>
                {codeContent && (
                  <CopyCodeButton code={codeContent} />
                )}
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;