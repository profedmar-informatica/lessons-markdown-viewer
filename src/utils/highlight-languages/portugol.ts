import type { HLJSApi, LanguageFn } from 'highlight.js';

const portugol: LanguageFn = (hljs: HLJSApi) => {
  const KEYWORDS = {
    keyword:
      'inicio fimalgoritmo se entao senao para enquanto escolha caso interrompa retorne ' +
      'funcao fimfuncao procedimento fimprocedimento var const tipo fimtipo registro fimregistro ' +
      'vetor matriz passo faca ate de para e ou nao div mod',
    built_in: // Comandos de E/S e outras funções comuns
      'escreva leia limpa abs int real logico cadeia caractere ' + // Funções comuns
      'aleatorio arredonda cos exp fat log logn rad seno raiz tan', // Funções matemáticas
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
      hljs.QUOTE_STRING_MODE, // Corrigido: Usando QUOTE_STRING_MODE para aspas duplas
      { begin: /'/, end: /'/ } // Mantido para aspas simples
    ]
  };

  const NUMBERS = {
    className: 'number',
    variants: [
      { begin: hljs.C_NUMBER_RE }
    ]
  };

  const IDENTIFIER = {
    className: 'variable', // Usando 'variable' para identificadores gerais
    begin: /[a-zA-Z_][a-zA-Z0-9_]*/
  };

  return {
    name: 'Portugol',
    aliases: ['algoritmo', 'pt-br'],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      COMMENTS,
      STRINGS,
      NUMBERS,
      {
        className: 'title.function', // Classe específica para nomes de função
        beginKeywords: 'funcao procedimento',
        end: /fimfuncao|fimprocedimento/,
        contains: [
          {
            className: 'title',
            begin: IDENTIFIER.begin,
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
      IDENTIFIER // Identificadores gerais
    ]
  };
};

export default portugol;