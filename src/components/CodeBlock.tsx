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

  // 1. Dividimos o código em linhas para contar e mapear
  const lines = code.split('\n');
  
  // 2. Definimos uma constante de altura de linha para garantir o 1:1
  // 'leading-6' no Tailwind é exatamente 24px.
  const lineHeightClass = "leading-6"; 

  return (
    <div className="relative my-6 rounded-lg shadow-2xl overflow-hidden border border-white/10 bg-[#252525]">
      <div className="flex bg-[#252525] font-mono text-[13px] antialiased">
        
        {/* COLUNA DE NÚMEROS (GUTTER) */}
        <div 
          className={cn(
            "bg-[#1e1e1e] text-gray-500 min-w-[3.5rem] border-r border-white/5 py-4 text-right select-none flex-shrink-0",
            lineHeightClass
          )}
        >
          {lines.map((_, i) => (
            <div key={i} className="px-4">
              {i + 1}
            </div>
          ))}
        </div>

        {/* COLUNA DE CÓDIGO */}
        <div className={cn("flex-1 py-4 overflow-x-auto min-w-0", lineHeightClass)}>
          <pre className="m-0 p-0 bg-transparent overflow-visible">
            <code 
              ref={codeRef} 
              className={cn(
                "block bg-transparent px-4 hljs", 
                language ? `language-${language}` : '',
                lineHeightClass
              )}
              style={{ 
                whiteSpace: 'pre',
                fontFamily: 'inherit' // Garante que highlight.js não mude a fonte
              }}
            >
              {code}
            </code>
          </pre>
        </div>
      </div>

      <div className="absolute top-2 right-2 z-10">
        <CopyCodeButton code={code} />
      </div>
    </div>
  );
};

export default CodeBlock;