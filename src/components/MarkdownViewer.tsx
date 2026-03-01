import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Estilo padrão do highlight.js
import Callout from './Callout';
import CopyCodeButton from './CopyCodeButton';

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none p-8 bg-panel-white rounded-lg shadow-sm">
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

            // Verifica se o primeiro filho é um elemento React e tenta extrair o conteúdo do código
            if (React.isValidElement(firstChild)) {
              const props = firstChild.props as { children?: string }; // Faz um cast para um tipo com 'children' opcional
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