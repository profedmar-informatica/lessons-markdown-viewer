import type { HLJSApi, LanguageFn } from 'highlight.js';

const portugol: LanguageFn = (hljs: HLJSApi) => {
  // Regex para identificadores que suportam caracteres acentuados e usam word boundaries
  const ACCENTED_IDENTIFIER_RE = /\b[a-zA-Z_áàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-zA-Z0-9_áàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ]*\b/;

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

  // Listas de palavras-chave para os modos explícitos
  const KEYWORD_LIST = 'se senao entao escolha caso interrompa para enquanto faca pare retorne funcao inicio fimalgoritmo procedimento fimfuncao fimprocedimento var const tipo fimtipo registro fimregistro vetor matriz passo ate de e ou nao div mod';
  const BUILT_IN_LIST = 'escreva leia limpa leia_inteiro escreva_linha abs int real logico cadeia caractere aleatorio arredonda cos exp fat log logn rad seno raiz tan';
  const TYPE_LIST = 'inteiro real logico cadeia caractere';
  const LITERAL_LIST = 'verdadeiro falso nulo';

  // Modos explícitos para keywords, built-ins, types e literals com alta relevância
  const KEYWORD_MODE = {
    className: 'keyword',
    begin: hljs.regex.lookahead(/\b/), // Garante word boundary
    keywords: KEYWORD_LIST,
    relevance: 10
  };

  const BUILT_IN_MODE = {
    className: 'built_in',
    begin: hljs.regex.lookahead(/\b/), // Garante word boundary
    keywords: BUILT_IN_LIST,
    relevance: 10
  };

  const TYPE_MODE = {
    className: 'type',
    begin: hljs.regex.lookahead(/\b/), // Garante word boundary
    keywords: TYPE_LIST,
    relevance: 10
  };

  const LITERAL_MODE = {
    className: 'literal',
    begin: hljs.regex.lookahead(/\b/), // Garante word boundary
    keywords: LITERAL_LIST,
    relevance: 10
  };

  // Definição de função/procedimento
  const FUNCTION_DEFINITION = {
    className: 'title.function',
    begin: /(funcao|procedimento)\s+/, // Captura "funcao " ou "procedimento "
    end: /fimfuncao|fimprocedimento/,
    keywords: 'funcao procedimento', // Realça "funcao" e "procedimento" dentro do bloco
    contains: [
      {
        className: 'title',
        begin: ACCENTED_IDENTIFIER_RE, // O nome real da função
        starts: {
          className: 'params',
          begin: /\(/,
          end: /\)/,
          excludeBegin: true,
          excludeEnd: true,
          contains: [
            COMMENTS,
            STRINGS,
            NUMBERS,
            // Parâmetros podem ser variáveis, então inclui um identificador genérico aqui
            { className: 'variable', begin: ACCENTED_IDENTIFIER_RE }
          ]
        }
      },
      COMMENTS
    ]
  };

  // Identificador genérico (fallback para variáveis)
  const GENERIC_IDENTIFIER = {
    className: 'variable',
    begin: ACCENTED_IDENTIFIER_RE,
    relevance: 0 // Baixa relevância, atua como fallback
  };

  return {
    name: 'Portugol',
    aliases: ['algoritmo', 'pt-br'],
    case_insensitive: true,
    disableAutodetect: true,
    contains: [
      COMMENTS,
      STRINGS,
      NUMBERS,
      KEYWORD_MODE,
      BUILT_IN_MODE,
      TYPE_MODE,
      LITERAL_MODE,
      FUNCTION_DEFINITION,
      GENERIC_IDENTIFIER // Deve capturar todos os outros identificadores
    ]
  };
};

export default portugol;