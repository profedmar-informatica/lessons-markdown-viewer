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
            let rawCode = '';
            // Extrai o conteúdo de texto puro do elemento <code> dentro de <pre>
            React.Children.forEach(children, (child) => {
              if (React.isValidElement(child) && child.type === 'code') {
                // Asserção de tipo para informar ao TypeScript que child.props tem a propriedade 'children'
                rawCode = String((child.props as { children: React.ReactNode }).children);
              }
            });

            const lines = rawCode.split('\n');
            // Remove a última linha vazia se existir (comum em blocos de código)
            if (lines.length > 0 && lines[lines.length - 1] === '') {
              lines.pop();
            }

            return (
              <div className="relative my-6"> {/* my-6 para espaçamento em torno dos blocos de código */}
                <div className="flex rounded-lg overflow-hidden border border-white/5 dark:border-white/10"> {/* Contêiner externo para borda e cantos arredondados */}
                  {/* Numeração de Linhas */}
                  <div className="line-numbers-container bg-[#282828] text-gray-500 text-right select-none py-4 pl-4 pr-3 text-[0.99em] leading-relaxed flex-shrink-0 border-r border-gray-700">
                    {lines.map((_, index) => (
                      <span key={index} className="block">
                        {index + 1}
                      </span>
                    ))}
                  </div>
                  {/* Conteúdo do Código */}
                  <div className="relative flex-1"> {/* Este div conterá o pre e o botão de copiar */}
                    <pre className="p-4 pr-12 bg-[#333333] text-[#D4D4D4] font-mono text-[0.99em] leading-relaxed overflow-x-auto h-full">
                      {children} {/* Este será o elemento <code> com o código realçado */}
                    </pre>
                    {rawCode && (
                      <CopyCodeButton code={rawCode} />
                    )}
                  </div>
                </div>
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