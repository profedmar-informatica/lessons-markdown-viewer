import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Callout from './Callout';
import CopyCodeButton from './CopyCodeButton';
import { cn } from '@/lib/utils';

// hljs não é mais importado diretamente aqui, pois rehypeHighlight o utiliza internamente
// O plugin highlightjs-line-numbers.js e seu useEffect foram removidos.

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  // O useEffect para hljs.highlightElement e hljs.lineNumbersBlock foi removido conforme solicitado.
  // A numeração de linhas agora será tratada via CSS puro.
  // O realce de sintaxe é feito pelo rehypeHighlight durante o processamento do Markdown.

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
            // children aqui é tipicamente um único elemento <code>
            const codeElement = React.Children.toArray(children)[0];

            if (React.isValidElement(codeElement) && codeElement.type === 'code') {
              const props = codeElement.props as { children?: string };
              if (typeof props.children === 'string') {
                codeContent = props.children;
              }
            }
            
            return (
              <div className="relative">
                <pre className="bg-[#252525] text-[#D4D4D4] rounded-lg overflow-hidden flex my-6 shadow-inner">
                  {/* O conteúdo 'children' já é o elemento <code> com o código realçado */}
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