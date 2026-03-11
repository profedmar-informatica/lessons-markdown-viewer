import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import CopyCodeButton from './CopyCodeButton';
import { cn } from '@/lib/utils';
import type { LanguageFn } from 'highlight.js'; // Importar LanguageFn

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = React.memo(({ code, language }) => {
  if (typeof code !== 'string') return null; // Verificação de segurança

  const codeRef = useRef<HTMLElement>(null);
  const [registered, setRegistered] = useState(false);

  const finalCode = code;

  useEffect(() => {
    const registerPortugol = async () => {
      const portugolAliases = ['portugol', 'algoritmo', 'pt-br'];
      if (language && portugolAliases.includes(language) && !hljs.getLanguage('portugol')) {
        try {
          const portugolModule = await import('@/utils/highlight-languages/portugol');
          const portugolLang: LanguageFn = portugolModule.default;
          hljs.registerLanguage('portugol', portugolLang);
          setRegistered(true);
        } catch (error) {
          console.error('Failed to load Portugol language for highlight.js', error);
          setRegistered(true); // Continue even if registration fails, highlight.js will try auto-detect
        }
      } else if (language && hljs.getLanguage(language)) {
        setRegistered(true); // Language already registered or is a standard one
      } else if (!language) {
        setRegistered(true); // No specific language, let highlight.js auto-detect or use plaintext
      } else {
        setRegistered(true); // For any other language not specifically handled here
      }
    };

    registerPortugol();
  }, [language]);

  useEffect(() => {
    if (codeRef.current && registered) {
      hljs.highlightElement(codeRef.current);
    }
  }, [finalCode, language, registered]);

  // Gerar números de linha
  const lineNumbers = finalCode.split('\n').map((_, index) => index + 1);

  return (
    <div className="relative my-6 rounded-lg shadow-inner overflow-hidden border border-white/5 dark:border-white/10">
      <div className="flex bg-[#252525] text-[#D4D4D4]">
        {/* Coluna da esquerda para números de linha (Gutter) */}
        {/* Removido 'py-4' para garantir alinhamento 1:1 */}
        <div className="gutter-num bg-[#1e1e1e] text-gray-500 min-w-[3.5rem] border-r border-white/5 text-right select-none flex-shrink-0">
          {lineNumbers.map((num) => (
            <div key={num} className="gutter-row">
              {num}
            </div>
          ))}
        </div>
        {/* Coluna da direita para o código */}
        {/* Removido 'py-4' para garantir alinhamento 1:1 */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden min-w-0">
          <code ref={codeRef} className={cn("bg-transparent code-row", language ? `language-${language}` : '')} style={{ whiteSpace: 'pre', display: 'block' }}>
            {finalCode}
          </code>
        </div>
      </div>
      <CopyCodeButton code={finalCode} />
    </div>
  );
});

export default CodeBlock;