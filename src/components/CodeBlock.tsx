import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import CopyCodeButton from './CopyCodeButton';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  // Gerar números de linha
  const lineNumbers = code.split('\n').map((_, index) => index + 1);

  return ( /* bg-[#252525]*/
    <div className="relative my-6 rounded-lg shadow-inner overflow-hidden border border-white/5 dark:border-white/10">
      <div className="flex  dark:bg-[#37373D] text-[#D4D4D4] font-mono text-[0.99em] leading-relaxed">
        {/* Coluna da esquerda para números de linha */}
        <div className="bg-[#1e1e1e] text-gray-500 min-w-[3.5rem] border-r border-white/5 py-2 px-4 text-right select-none flex-shrink-0">
          {lineNumbers.map((num) => (
            <div key={num} className="h-[1.25rem] leading-relaxed">
              {num}
            </div>
          ))}
        </div>
        {/* Coluna da direita para o código */}
        <div className="flex-1 py-2 px-4 overflow-x-auto">
          <code ref={codeRef} className={cn("bg-transparent", language ? `language-${language}` : '')} style={{ whiteSpace: 'pre' }}>
            {code}
          </code>
        </div>
      </div>
      <CopyCodeButton code={code} />
    </div>
  );
};

export default CodeBlock;