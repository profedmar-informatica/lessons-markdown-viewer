import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown'; // Importar Components
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Callout from './Callout';
import CodeBlock from './CodeBlock'; // Importar o novo CodeBlock
import { cn } from '@/lib/utils';
import { Node } from 'unist'; // Importar Node do unist para tipagem do AST

interface MarkdownViewerProps {
  content: string;
}

// Definir a interface para os props que o componente 'code' do ReactMarkdown recebe
interface CodeComponentProps extends React.HTMLAttributes<HTMLElement> {
  node?: Node; // O nó AST, opcional
  inline?: boolean; // Se é um bloco de código inline
  className?: string; // Classes CSS, incluindo 'language-xyz'
  children: React.ReactNode; // O conteúdo do código
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className={cn(
      "prose prose-base max-w-[894px] mx-auto pt-14 pb-10 px-10 rounded-lg", // Updated scale, padding, and max-width
      "bg-brand-paper-light border border-[#E0D8C7] shadow-[0_5px_15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)]", // Light mode surfaces
      "dark:bg-brand-paper-dark dark:border-vscode-border-sidebar dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]", // Dark mode surfaces
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
          // Usar o novo componente CodeBlock para renderizar blocos de código
          code({ node, inline, className, children, ...props }: CodeComponentProps) { // Usando a interface CodeComponentProps
            const match = /language-(\w+)/.exec(className || '');
            const codeContent = String(children).replace(/\n$/, ''); // Remove trailing newline

            return !inline && match ? (
              <CodeBlock code={codeContent} language={match[1]} />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
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