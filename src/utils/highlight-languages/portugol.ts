import type { HLJSApi, LanguageFn } from 'highlight.js';

const portugol: LanguageFn = (hljs: HLJSApi) => {
  // Regex para identificadores que suportam caracteres acentuados e usam word boundaries
  const ACCENTED_IDENTIFIER_RE = /\b[a-zA-ZÀ-ÿ_][a-zA-Z0-9À-ÿ_]*\b/;

  const KEYWORDS = {
    keyword:
      'se senao entao escolha caso interrompa para enquanto faca pare retorne funcao inicio fimalgoritmo ' +
      'procedimento fimfuncao fimprocedimento var const tipo fimtipo registro fimregistro ' +
      'vetor matriz passo ate de e ou nao div mod',
    built_in:
      'escreva leia limpa leia_inteiro escreva_linha abs int real logico cadeia caractere ' +
      'aleatorio arredonda cos exp fat log logn rad seno raiz tan',
    type:
      'inteiro real logico cadeia caractere',
    literal:
      'verdadeiro falso nulo'
  };

  const COMMENTS = {
    className: 'comment',
    variants: [
      hljs.COMMENT('//', '$'),
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const STRINGS = {
    className: 'string',
    variants: [
      hljs.QUOTE_STRING_MODE,
      { begin: /'/, end: /'/ }
    ]
  };

  const NUMBERS = {
    className: 'number',
    variants: [
      { begin: hljs.C_NUMBER_RE }
    ]
  };

  const IDENTIFIER = {
    className: 'variable',
    begin: ACCENTED_IDENTIFIER_RE
  };

  return {
    name: 'Portugol',
    aliases: ['algoritmo', 'pt-br'],
    case_insensitive: true,
    disableAutodetect: true, // Desativa a auto-detecção para evitar interferências
    keywords: KEYWORDS,
    contains: [
      COMMENTS,
      STRINGS,
      NUMBERS,
      {
        className: 'title.function',
        beginKeywords: 'funcao procedimento',
        end: /fimfuncao|fimprocedimento/,
        contains: [
          {
            className: 'title',
            begin: ACCENTED_IDENTIFIER_RE, // Usar regex acentuada aqui também
            starts: {
              className: 'params',
              begin: /\(/,
              end: /\)/,
              excludeBegin: true,
              excludeEnd: true,
              keywords: KEYWORDS,
              contains: [
                STRINGS,
                NUMBERS,
                COMMENTS,
                IDENTIFIER
              ]
            }
          },
          COMMENTS
        ]
      },
      IDENTIFIER
    ]
  };
};

export default portugol;