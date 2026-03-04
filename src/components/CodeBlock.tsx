import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import CopyCodeButton from './CopyCodeButton';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  if (typeof code !== 'string') return null; // Verificação de segurança

  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  // Gerar números de linha
  const lineNumbers = code.split('\n').map((_, index) => index + 1);

  return (
    <div className="relative my-6 rounded-lg shadow-inner overflow-hidden border border-white/5 dark:border-white/10">
      <div className="flex bg-[#252525] text-[#D4D4D4]">
        {/* Coluna da esquerda para números de linha (Gutter) */}
        <div className="gutter-num bg-[#1e1e1e] text-gray-500 min-w-[3.5rem] border-r border-white/5 py-4 text-right select-none flex-shrink-0">
          {lineNumbers.map((num) => (
            <div key={num} className="gutter-row">
              {num}
            </div>
          ))}
        </div>
        {/* Coluna da direita para o código */}
        <div className="flex-1 py-4 overflow-x-auto overflow-y-hidden min-w-0"> {/* Adicionado overflow-y-hidden */}
          <code ref={codeRef} className={cn("bg-transparent code-row", language ? `language-${language}` : '')} style={{ whiteSpace: 'pre', display: 'block' }}>
            {code}
          </code>
        </div>
      </div>
      <CopyCodeButton code={code} />
    </div>
  );
};

export default CodeBlock;