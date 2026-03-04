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

  // Divide o código em linhas para garantir que o mapeamento seja idêntico
  const lines = code.split('\n');

  return (
    <div className="relative my-6 rounded-lg shadow-inner overflow-hidden border border-white/5 dark:border-white/10 bg-[#252525]">
      <div className="flex font-mono text-[14px] leading-[1.5rem]"> 
        {/* IMPORTANTE: 
            1. Forçamos uma altura de linha fixa (leading-[1.5rem] = 24px) 
            2. Forçamos a mesma fonte em ambas as colunas
        */}
        
        {/* Coluna da Esquerda: Gutter (Números) */}
        <div 
          className="bg-[#1e1e1e] text-gray-500 min-w-[3.5rem] border-r border-white/5 py-4 text-right select-none flex-shrink-0"
          style={{ userSelect: 'none' }}
        >
          {lines.map((_, index) => (
            <div key={index} className="px-4">
              {index + 1}
            </div>
          ))}
        </div>

        {/* Coluna da Direita: Código */}
        <div className="flex-1 py-4 overflow-x-auto bg-[#252525]">
          <pre className="m-0 p-0 bg-transparent border-none">
            <code 
              ref={codeRef} 
              className={cn("bg-transparent px-4 block hljs", language ? `language-${language}` : '')}
              style={{ 
                whiteSpace: 'pre',
                fontFamily: 'inherit', // Força a mesma fonte da div pai
                lineHeight: 'inherit'  // Força a mesma altura de linha da div pai
              }}
            >
              {code}
            </code>
          </pre>
        </div>
      </div>
      
      {/* Botão de Cópia */}
      <div className="absolute top-2 right-2">
        <CopyCodeButton code={code} />
      </div>
    </div>
  );
};

export default CodeBlock;