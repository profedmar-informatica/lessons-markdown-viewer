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
      "prose prose-base max-w-[894px] mx-auto pt-14 pb-10 px-10 rounded-lg", // Updated scale, padding, and max-width
      "bg-paper-light-beige border border-[#E0D8C7] shadow-[0_5px_15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)]", // Light mode surfaces
      "dark:bg-vscode-bg-global dark:border-vscode-border-sidebar dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]", // Dark mode surfaces
      "leading-relaxed", // Added line-height for body
      "[&_p]:text-[#374151] dark:[&_p]:text-vscode-text-lesson", // Updated p text color for light mode
      "[&_li]:text-[#374151] dark:[&_li]:text-vscode-text-lesson", // Updated li text color for light mode
      // H1 styles
      "[&_h1]:text-[1.75rem] [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mb-6 [&_h1]:text-[#374151] dark:[&_h1]:text-vscode-text-heading",
      // H2 styles
      "[&_h2]:text-[1.4rem] [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-slate-200 [&_h2]:dark:border-slate-800 [&_h2]:pb-2 [&_h2]:text-[#374151] dark:[&_h2]:text-vscode-text-heading",
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

            // Extract raw code content from the <code> element
            if (React.isValidElement(firstChild) && firstChild.type === 'code') {
              const props = firstChild.props as { children?: string };
              if (typeof props.children === 'string') {
                codeContent = props.children;
              }
            }
            
            // Handle cases where codeContent might be empty or just whitespace
            const lines = codeContent ? codeContent.split('\n') : [''];
            // If the last line is empty due to a trailing newline, don't count it as a separate line for numbering
            const actualLines = lines.length > 1 && lines[lines.length - 1] === '' ? lines.slice(0, -1) : lines;
            const lineNumbers = Array.from({ length: actualLines.length }, (_, i) => i + 1);

            return (
              <div className="relative">
                <pre className="rounded-lg p-4 pr-12 bg-[#1E1E1E] text-[#D4D4D4] font-mono text-[0.99em] leading-relaxed border border-white/5 dark:border-white/10 overflow-x-auto dark:bg-[#333333]">
                  <div className="flex">
                    {/* Line Numbers */}
                    <div className="flex flex-col text-right pr-4 select-none text-gray-500 dark:text-gray-400 border-r border-gray-700/50 dark:border-gray-500/50 mr-4 text-[0.99em] leading-relaxed">
                      {lineNumbers.map((num) => (
                        <span key={num} className="block">
                          {num}
                        </span>
                      ))}
                    </div>
                    {/* Code Content */}
                    <div className="flex-1">
                      {children} {/* This will render the <code> element with highlighted content */}
                    </div>
                  </div>
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