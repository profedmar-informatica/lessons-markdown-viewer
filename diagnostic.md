# Diagnóstico Técnico Detalhado

## 1. Estrutura de Pastas Relevante (Inferida)

A estrutura de pastas do seu projeto, focando nas áreas relevantes para o deploy e conteúdo, é a seguinte:

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── components/
│   │   ├── Callout.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── CopyCodeButton.tsx
│   │   ├── MarkdownViewer.tsx
│   │   ├── MobileSidebarToggle.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ThemeSwitch.tsx
│   │   ├── theme-provider.tsx
│   │   └── ... (outros componentes UI)
│   ├── content/
│   │   ├── informática/
│   │   │   └── 001-Fundamentos e Bits.md
│   │   ├── logica e programação/
│   │   │   ├── 001-introducao.md
│   │   │   ├── 002-sobre-o-projeto.md
│   │   │   ├── 003-texto.md
│   │   │   ├── 004-Markdown Viewer.md
│   │   │   ├── 005-como-usar - Copia.md
│   │   │   ├── 006-sobre-o-projeto - Copia.md
│   │   │   ├── 007-texto - Copia.md
│   │   │   ├── 008-Markdown Viewer - Copia.md
│   │   │   └── base_code.svg
│   │   └── capa.md
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   └── ... (outros arquivos src)
├── package.json
├── pnpm-workspace.yaml
├── vite.config.ts
└── ... (outros arquivos na raiz)
```

## 2. Dependências (Conteúdo de `package.json`)

```json
{
  "name": "vite_react_shadcn_ts",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-aspect-ratio": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-collapsible": "^1.1.0",
    "@radix-ui/react-context-menu": "^2.2.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-hover-card": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@tanstack/react-query": "^5.56.2",
    "@types/unist": "^3.0.3",
    "buffer": "^6.0.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.3.0",
    "gray-matter": "^4.0.3",
    "highlight.js": "^11.11.1",
    "input-otp": "^1.2.4",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.4.6",
    "react": "^19.2.3",
    "react-day-picker": "^9.13.0",
    "react-dom": "^19.2.3",
    "react-hook-form": "^7.53.0",
    "react-markdown": "^10.1.0",
    "react-resizable-panels": "^2.1.3",
    "react-router-dom": "^6.26.2",
    "recharts": "^2.12.7",
    "rehype-highlight": "^7.0.2",
    "remark-gfm": "^4.0.1",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.3",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@dyad-sh/react-vite-component-tagger": "^0.8.0",
    "@esbuild-plugins/node-globals-polyfill": "^0.2.3",
    "@esbuild-plugins/node-modules-polyfill": "^0.2.2",
    "@eslint/js": "^9.9.0",
    "@tailwindcss/typography": "^0.5.15",
    "@types/node": "^22.5.5",
    "@types/react": "^19.2.8",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react-swc": "^3.9.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.0.1",
    "vite": "^6.3.4"
  }
}
```

## 3. Arquivos de Lock

Com base no `pnpm-workspace.yaml` e no comando `pnpm install` no seu workflow, o gerenciador de pacotes utilizado é o `pnpm`. Portanto, o arquivo de lock esperado na raiz do seu repositório é o `pnpm-lock.yaml`.

## 4. Configuração de Deploy (Conteúdo de `.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

# Define permissões para GITHUB_TOKEN para permitir o deploy no GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Permite apenas um deploy concorrente, pulando execuções enfileiradas entre a execução em andamento e a última enfileirada.
# No entanto, NÃO cancela execuções em andamento, pois queremos permitir que esses deploys de produção sejam concluídos.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Job de Build
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v4
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          # cache: 'pnpm' # Removido para desativar o cache de dependências
          # cache-dependency-path: 'pnpm-lock.yaml' # Removido
      - name: Install dependencies ⚙️
        run: pnpm install --no-frozen-lockfile
      - name: Build with Vite 🏗️
        run: pnpm run build
      - name: Copy index.html to 404.html 📄
        run: cp dist/index.html dist/404.html
      - name: Upload artifact 🚀
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  # Job de Deploy
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages 🚀
        id: deployment
        uses: actions/deploy-pages@v4
```

## 5. Configuração do Vite (Conteúdo de `vite.config.ts`)

```typescript
import { defineConfig, Plugin } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// Custom Vite plugin for Markdown sanitization
function markdownSanitizerPlugin(): Plugin {
  return {
    name: "markdown-sanitizer",
    transform(code, id) {
      if (id.endsWith(".md")) {
        // 1. Split the content into parts: code blocks and non-code blocks
        // This regex captures code blocks (```[\s\S]*?```) including the fences.
        const codeBlockRegex = /(```[\s\S]*?```)/g;
        const parts = code.split(codeBlockRegex);

        let sanitizedCode = "";
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (i % 2 === 0) { // Non-code block part
            let cleanedPart = part;

            // Remove residual code delimiters (`, ´, ˆ)
            cleanedPart = cleanedPart.replace(/[`´ˆ]/g, '');

            // Normalize multiple newlines to at most two, especially after headings
            // This ensures no more than two newlines appear consecutively.
            cleanedPart = cleanedPart.replace(/\n{3,}/g, '\n\n');
            
            // Trim leading/trailing whitespace for this specific non-code part
            cleanedPart = cleanedPart.trim();

            sanitizedCode += cleanedPart;
          } else { // Code block part - keep as is
            sanitizedCode += part;
          }
        }

        // Ensure overall file is trimmed after reassembly
        sanitizedCode = sanitizedCode.trim();

        // For UTF-8 normalization, JavaScript strings are inherently UTF-8.
        // If there are specific Unicode composition issues (e.g., combining characters),
        // String.prototype.normalize('NFC') could be used, but it's generally not needed
        // for standard text and might have unintended side effects if not carefully applied.
        // Assuming the main concern is visual artifacts from delimiters and spacing.

        return {
          code: sanitizedCode,
          map: null, // No source map for transformations like this
        };
      }
      return null; // Not a markdown file, do nothing
    },
  };
}

export default defineConfig(() => ({
  base: "/lessons-markdown-viewer/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react(), markdownSanitizerPlugin()], // Add the new plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Adicionar alias para 'buffer'
      'buffer': 'buffer/',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  assetsInclude: ['**/*.md'],
}));
```

## 6. Roteamento e Importação de Aulas

As aulas são importadas dinamicamente usando `import.meta.glob`.

*   Em `src/components/Sidebar.tsx`, o código utiliza `import.meta.glob('../content/**/*.md', { eager: true })` para descobrir todos os arquivos Markdown e construir o menu lateral.
*   Em `src/pages/Index.tsx`, o conteúdo de uma aula específica é carregado dinamicamente com `await import(`../content/${category}/${lesson}.md?raw`)` com base nos parâmetros da URL.
*   O `BrowserRouter` em `src/App.tsx` inclui `basename="/lessons-markdown-viewer"` para roteamento correto em subdiretórios.

## Sistema de Hierarquia V2

Este sistema implementa uma nova lógica para a organização e exibição do conteúdo Markdown, focando em uma estrutura mais formal e navegável.

*   **Caminho da Capa (Home):**
    *   A rota raiz (`/`) agora carrega exclusivamente o conteúdo do arquivo `src/content/capa.md`.
    *   Se `src/content/capa.md` não for encontrado, uma mensagem amigável de "Bem-vindo!" é exibida, informando ao usuário sobre a ausência do arquivo.

*   **Expressão Regular (Regex) para Validação de Lições:**
    *   A Regex utilizada para filtrar os arquivos Markdown no menu lateral é: `^(\d{3})-(.*)\.md$`
    *   Esta expressão garante que apenas arquivos cujos nomes começam com três dígitos numéricos (de `001` a `999`), seguidos por um hífen e um título, sejam considerados lições válidas.
    *   Exemplos válidos: `001-introducao.md`, `123-topico-avancado.md`.
    *   Exemplos inválidos (e ignorados): `000-inicio.md`, `texto.md`, `capa.md`.

*   **Lógica de Exclusão de Pastas Vazias:**
    *   Durante o carregamento do conteúdo, se uma pasta de disciplina dentro de `/content/` não contiver *nenhum* arquivo que passe no filtro da Regex (`001-999`), essa disciplina inteira será removida do menu lateral. Isso garante que apenas categorias com conteúdo relevante sejam exibidas.

*   **Formatação de Números de Lição no Menu:**
    *   Os números das lições são exibidos com um zero à esquerda para dígitos únicos (ex: "01", "02", ..., "09").
    *   Para números de 10 em diante, apenas o número é exibido (ex: "10", "11", ..., "100").

## Recursos de Formatação e Exibição de Código

O aplicativo utiliza uma combinação de bibliotecas, componentes customizados e estilos CSS globais para oferecer uma experiência rica e consistente na visualização de blocos de código, com destaque para a sintaxe, numeração de linhas e responsividade.

1.  **`CodeBlock.tsx` (Componente Principal de Renderização de Código)**
    *   **Sintaxe Destacada (`highlight.js`)**: Este componente é o ponto central para a aplicação de destaque de sintaxe. Ele recebe o código e a linguagem (ex: `c`, `portugol`, `bash`) e utiliza a biblioteca `highlight.js` para colorir o código de acordo com as regras da linguagem.
    *   **Registro Dinâmico de Linguagens**: Para linguagens não padrão do `highlight.js` (como Portugol), o `CodeBlock` carrega e registra dinamicamente a definição da linguagem (ex: `src/utils/highlight-languages/portugol.ts`) apenas quando necessário, otimizando o carregamento.
    *   **Numeração de Linhas (Gutter)**: Uma coluna à esquerda exibe números de linha para cada linha de código. A implementação garante um alinhamento perfeito de 1:1 entre o número da linha e a linha de código correspondente, mesmo com rolagem horizontal.
    *   **Botão de Copiar Código (`CopyCodeButton.tsx`)**: Integrado diretamente ao bloco de código, oferece um botão para copiar o conteúdo do código para a área de transferência, com feedback visual de sucesso.
    *   **Otimização de Performance**: O componente é envolvido em `React.memo` para evitar re-renderizações desnecessárias, melhorando a performance da aplicação.

2.  **`highlight.js` (Biblioteca de Destaque de Sintaxe)**
    *   **Core Highlighting**: É a biblioteca de terceiros responsável por analisar o código e aplicar classes CSS para o destaque de sintaxe.
    *   **Tema Visual**: O tema `vs2015.css` do `highlight.js` é importado globalmente em `src/main.tsx`, fornecendo a base visual para o destaque.

3.  **`src/utils/highlight-languages/portugol.ts` (Definição de Linguagem Customizada)**
    *   **Gramática Portugol**: Este arquivo define as regras de tokenização para a linguagem Portugol, incluindo palavras-chave (`se`, `senao`), funções embutidas (`escreva`, `leia`), tipos (`inteiro`, `real`), literais (`verdadeiro`, `falso`), comentários, strings e números.
    *   **Estabilização de Tokenização**: A gramática foi cuidadosamente ajustada para garantir que os tokens sejam capturados como palavras completas, resolvendo problemas de cores partidas e garantindo um destaque preciso.

4.  **`src/globals.css` (Estilos Globais para Código)**
    *   **Fonte Monospace Consistente**: Define a fonte `JetBrains Mono` para todos os elementos de código (`font-mono`, `code`, `pre`, `.hljs`, `.gutter-num`), garantindo uma tipografia uniforme e legível.
    *   **Alinhamento 1:1 Perfeito**: Impõe uma `line-height` fixa de `24px` para o código e os números de linha, o que é crucial para o alinhamento visual preciso entre o conteúdo e o gutter.
    *   **Neutralização de Estilos do `highlight.js`**: Contém seletores CSS de alta especificidade para sobrescrever os estilos padrão do `highlight.js`, eliminando "vazamentos de cor" e garantindo que o fundo e o padding dos blocos de código sejam controlados pelo tema da aplicação.
    *   **Cores de Sintaxe Temáticas**: Utiliza variáveis CSS (ex: `--code-keyword`, `--code-function`, `--code-type`, `--code-comment`) para definir as cores de destaque de sintaxe. Essas variáveis são ajustadas para se integrarem perfeitamente tanto no tema claro (Soft Lavender Productivity) quanto no tema escuro (VS Code-like).
    *   **Rolagem Horizontal**: Garante que linhas de código longas possam ser roladas horizontalmente (`overflow-x: auto`) sem quebrar a integridade visual das linhas ou dos números.

5.  **`src/components/MarkdownViewer.tsx` (Integração com Markdown)**
    *   **Renderização Customizada de `code`**: O `react-markdown` é configurado para usar o componente `CodeBlock` sempre que um bloco de código (cercado por ```` ````) é encontrado no Markdown.
    *   **Tratamento de `p` para Hidratação**: Uma lógica customizada para a tag `p` garante que elementos de bloco (como o `CodeBlock`, que é uma `div`) não sejam aninhados dentro de tags `<p>`, prevenindo erros de hidratação no console.
    *   **Código Inline**: Lida com código inline (cercado por `` ` ``) aplicando um estilo básico com fundo `muted` e cor de texto `pink-500`.

6.  **`vite.config.ts` (`markdownSanitizerPlugin`) (Pré-processamento em Build-Time)**
    *   **Limpeza de Markdown**: Este plugin customizado do Vite pré-processa os arquivos Markdown durante o build. Ele remove delimitadores de código residuais (`` ` ``, `´`, `ˆ`) e normaliza quebras de linha e espaços em branco excessivos em partes *não-código* do Markdown.
    *   **Melhora da Qualidade da Entrada**: Embora não atue diretamente nos blocos de código, essa limpeza garante que o `react-markdown` receba um conteúdo mais limpo e bem formatado, o que indiretamente contribui para uma renderização mais estável e previsível, incluindo a dos blocos de código.

## Diagnóstico e Recomendações (Atualizado)

O build e o deploy do projeto no GitHub Pages estão funcionando corretamente. As configurações do `pnpm` no workflow do GitHub Actions, o `base` do Vite e o `basename` do React Router estão devidamente configurados para o deploy em subdiretórios.

**Mudanças Implementadas (e confirmadas como funcionando):**

1.  **Instalação Explícita do pnpm:** A ação `pnpm/action-setup@v4` garante que o `pnpm` esteja disponível e na versão especificada (v10).
2.  **Instalação de Dependências:** O comando `pnpm install --no-frozen-lockfile` é utilizado para instalar as dependências.
3.  **Configuração de Base do Vite:** O `base` em `vite.config.ts` está definido como `"/lessons-markdown-viewer/"`.
4.  **Configuração de Basename do React Router:** O `BrowserRouter` em `src/App.tsx` usa `basename="/lessons-markdown-viewer"`.
5.  **Geração de 404.html:** Um passo no workflow copia `dist/index.html` para `dist/404.html` para roteamento de SPA no GitHub Pages.
6.  **Componente Index:** O arquivo `src/pages/Index.tsx` é um componente React válido com a lógica da capa e carregamento de conteúdo.
7.  **Refatoração da Sidebar:** O componente `src/components/Sidebar.tsx` filtra lições usando a Regex `^(\d{3})-(.*)\.md$`, exibe títulos formatados e remove categorias vazias. O caminho do logo também foi corrigido.
8.  **Carregamento de Markdown em Produção:** `src/pages/Index.tsx` usa `import.meta.glob` com `eager: true, query: '?raw', import: 'default'` para carregar o conteúdo Markdown.
9.  **Implementação de Dark Mode:** Suporte a Dark Mode implementado usando `next-themes` e `shadcn/ui`.
10. **Ajustes de Layout:** Vários ajustes de tamanho e espaçamento para logo, toggle button e ThemeSwitch, além de cores de fundo para o modo escuro.
11. **Correção de Importação do Highlight.js:** O `@import` do tema `highlight.js` foi movido para `src/main.tsx` e o tema `vs2015.css` está sendo usado.
12. **Alteração de Cor de Fundo:** A cor de fundo do "papel" e da "sidebar" foi alterada para `#FFFBF0` (bege claro) no tema claro, e o `MarkdownViewer` foi atualizado para usar essa nova cor. O algoritmo de números primos no arquivo `001-introducao.md` foi refatorado para a versão em C puro.
13. **Cor do Painel Lateral:** O painel do menu lateral foi ajustado para usar a mesma cor de fundo do papel (`bg-background`).
14. **Ajuste da Fonte da Caixa de Código:** A fonte da caixa de código foi ajustada para `0.99em`.
15. **REESTRUTURAÇÃO COMPLETA:** Arquitetura de 3 níveis de estilo implementada, componente CodeBlock isolado com numeração nativa, e cores de 'mesa' e 'papel' unificadas.
16. **Eliminados vazamentos de cor (azul petróleo) dos blocos de código através da neutralização de estilos do highlight.js no globals.css.**
17. **Refinamento visual: Reduzido padding vertical do CodeBlock (de p-4 para py-2) para evitar espaços excessivos em comandos curtos.**
18. **Removida tag <pre> redundante do MarkdownViewer que causava padding extra e conflitos de cor de fundo.**
19. **Consolidação Tipográfica Final: Implementada JetBrains Mono com line-height fixo de 24px e remoção de redundâncias de tags <pre> para alinhamento 1:1 perfeito.**
20. **Correção de escala: Eliminada a diferença entre 13px e 0.99em, forçando herança direta da div pai para alinhamento 1:1.**
21. **Configuração de Scroll: Mantida integridade das linhas com overflow-x-auto e white-space: pre, com scrollbars personalizadas.**
22. **Unificação Universal: Aplicados seletores de alta especificidade no globals.css para garantir que todas as linguagens (C, ABNF, Bash, etc) compartilhem a mesma métrica 1:1.**
23. **Ajuste de Fluxo: Restaurada altura dinâmica dos blocos de código com preservação de alinhamento 1:1 e scroll apenas horizontal.**
24. **Higienização de Caracteres: Implementada regex para remover delimitadores residuais (`, ´) sem quebrar a estrutura de Code Block do Markdown.**
25. **Higienização Profunda: Implementada remoção de delimitadores e espaços residuais nas extremidades para evitar artefatos visuais no CodeBlock.**
26. **Variável CSS para cor do polegar do Switch:** Adicionada `--switch-thumb-color` em `src/globals.css` e utilizada em `src/components/ui/switch.tsx`.
27. **Correção de Tokenização Portugol:** A gramática Portugol em `src/utils/highlight-languages/portugol.ts` foi refatorada para usar modos explícitos com `hljs.regex.lookahead(/\b/)` e alta relevância para palavras-chave, built-ins, tipos e literais. Isso garante que os tokens sejam capturados como palavras completas, resolvendo o problema de cores bipartidas. O `GENERIC_IDENTIFIER` atua como fallback com baixa relevância.
28. **Estabilização de Tokenização Portugol (Atual):** A gramática Portugol em `src/utils/highlight-languages/portugol.ts` foi simplificada para confiar na propriedade `keywords` do `highlight.js` para lidar com word boundaries, removendo `hljs.regex.lookahead(/\b/)` dos modos explícitos. Isso garante que palavras-chave, built-ins, tipos e literais sejam tokenizados atomicamente, resolvendo o problema de cores partidas. O `GENERIC_IDENTIFIER` continua a atuar como um fallback de baixa relevância.
29. **Otimização de Processamento em Build-Time:** Implementado um plugin Vite (`markdownSanitizerPlugin`) em `vite.config.ts` para pré-processar arquivos Markdown. Este plugin remove delimitadores residuais (`, ´, ˆ), normaliza quebras de linha (`\n{3,}` para `\n\n`) e apara espaços em branco excessivos, preservando a integridade dos blocos de código. A lógica de higienização correspondente foi removida dos componentes `CodeBlock.tsx` e `MarkdownViewer.tsx`.
30. **Memoização de Componentes:** Os componentes `CodeBlock.tsx` e `MarkdownViewer.tsx` foram envolvidos em `React.memo()` para otimizar as re-renderizações.
31. **Correção de Tipagem em ResizableHandle:** O erro de compilação `TS2322` em `src/components/ui/resizable.tsx` foi resolvido ajustando a interface `ResizableHandleProps` para estender `BasePanelResizeHandleProps` e explicitamente tipando a propriedade `ref` como `React.Ref<HTMLDivElement>` no `React.forwardRef`.
32. **Ativação de Sidebar Inteligente (Frontmatter):** A lógica para ler `menuTitle` e `title` do frontmatter de arquivos Markdown, exibir `menuTitle` na sidebar, `title` como H1 principal na página, ignorar arquivos que falham na regex de lições e carregar `capa.md` para a rota raiz já está totalmente implementada no hook `useMarkdownContent.ts` e nos componentes `Sidebar.tsx`, `Index.tsx` e `MarkdownViewer.tsx`.