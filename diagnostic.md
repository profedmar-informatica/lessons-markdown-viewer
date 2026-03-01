# Diagnóstico Técnico Detalhado: Erro "Dependencies lock file is not found" no GitHub Actions

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
│   │   ├── CopyCodeButton.tsx
│   │   ├── MarkdownViewer.tsx
│   │   ├── MobileSidebarToggle.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ThemeSwitch.tsx
│   │   ├── theme-provider.tsx
│   │   └── ... (outros componentes UI)
│   ├── content/
│   │   ├── informática/
│   │   │   └── 000-como-usar.md
│   │   └── logica e programação/
│   │       ├── 000-como-usar.md
│   │       ├── 001-introducao.md
│   │       ├── 002-sobre-o-projeto.md
│   │       ├── 003-texto.md
│   │       └── 004-Markdown Viewer.md
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
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.3.0",
    "highlight.js": "^11.11.1",
    "input-otp": "^1.2.4",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
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

O erro "Dependencies lock file is not found... Supported file patterns: package-lock.json, npm-shrinkwrap.json, yarn.lock" indica que a ação `actions/setup-node` não está encontrando ou reconhecendo o `pnpm-lock.yaml` no contexto em que está sendo executada. Para contornar isso e garantir que o build passe, vamos ajustar a configuração do workflow.

## 4. Configuração de Deploy (Conteúdo de `.github/workflows/deploy.yml` - **Atualizado**)

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

## 5. Configuração do Vite (Conteúdo de `vite.config.ts` - **Atualizado**)

```typescript
import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  base: "/lessons-markdown-viewer/", // Alterado para o subdiretório do GitHub Pages
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.md'], // Garante que arquivos .md sejam tratados como assets
}));
```

## 6. Roteamento e Importação de Aulas

As aulas são importadas dinamicamente usando `import.meta.glob`.

*   Em `src/components/Sidebar.tsx`, o código utiliza `import.meta.glob('../content/**/*.md', { eager: true })` para descobrir todos os arquivos Markdown e construir o menu lateral.
*   Em `src/pages/Index.tsx`, o conteúdo de uma aula específica é carregado dinamicamente com `await import(`../content/${category}/${lesson}.md?raw`)` com base nos parâmetros da URL.
*   **Atualização:** O `BrowserRouter` em `src/App.tsx` agora inclui `basename="/lessons-markdown-viewer"` para roteamento correto em subdiretórios.

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

## Diagnóstico e Recomendações (Revisado)

O erro "Dependencies lock file is not found" foi abordado com uma estratégia mais robusta para o `pnpm` no GitHub Actions. O problema de 404 no GitHub Pages foi corrigido ajustando o `base` do Vite e o `basename` do React Router.

**Mudanças Implementadas:**

1.  **Instalação Explícita do pnpm:** Adicionamos a action `pnpm/action-setup@v4` para garantir que o `pnpm` esteja disponível e na versão especificada (v10) antes de qualquer outra operação de Node.js.
2.  **Desativação do Cache de `setup-node`:** Removemos as configurações `cache: 'pnpm'` e `cache-dependency-path` do `actions/setup-node@v4`. Isso evita que a ação procure por um arquivo de lock que pode não estar presente ou não ser reconhecido, garantindo que as dependências sejam instaladas do zero a cada execução, se necessário.
3.  **Instalação Forçada de Dependências:** O comando `pnpm install --no-frozen-lockfile` foi mantido para permitir a instalação mesmo sem um `pnpm-lock.yaml` existente ou atualizado, o que é útil em ambientes de CI/CD onde o lockfile pode não ser sempre commitado ou pode precisar ser regenerado.
4.  **Uso Consistente do pnpm para Build:** O comando de build foi alterado para `pnpm run build` para garantir que o `pnpm` seja o gerenciador de pacotes utilizado em todas as etapas relevantes.
5.  **Configuração de Base do Vite:** O `base` em `vite.config.ts` foi alterado para `"/lessons-markdown-viewer/"` para corresponder ao subdiretório do GitHub Pages.
6.  **Configuração de Basename do React Router:** O `BrowserRouter` em `src/App.tsx` agora usa `basename="/lessons-markdown-viewer"` para roteamento correto.
7.  **Geração de 404.html:** Um passo foi adicionado ao workflow de deploy para copiar `dist/index.html` para `dist/404.html`, permitindo que o GitHub Pages lide com o roteamento de SPA.
8.  **Correção do Componente Index:** O arquivo `src/pages/Index.tsx` foi reescrito para ser um componente React válido, resolvendo os erros de compilação e implementando a lógica da capa.
9.  **Refatoração da Sidebar:** O componente `src/components/Sidebar.tsx` foi atualizado para filtrar lições usando a Regex `^(\d{3})-(.*)\.md$`, exibir títulos formatados como "001 - Título da Lição", e remover categorias que não contêm lições válidas. O caminho do logo também foi corrigido.
10. **Correção de Carregamento de Markdown em Produção:** O `src/pages/Index.tsx` foi atualizado para usar `import.meta.glob` com `eager: true, as: 'raw'` para carregar o conteúdo Markdown, garantindo que os arquivos sejam incluídos no bundle e acessíveis em produção sem problemas de caminho.
11. **Implementação de Dark Mode:** Suporte a Dark Mode implementado usando `next-themes` e `shadcn/ui`.
12. **Ajustes de Layout:**
    *   Aumentado o tamanho do logotipo em 20%.
    *   Diminuído o tamanho do toggle button em 30%.
    *   Reduzido o espaçamento ao redor do toggle para zerar o padding e a margin vertical.
    *   Diminuída a escala do toggle button para 15% do tamanho original.

**Próximos Passos:**

*   Faça um novo push para o seu repositório. O workflow de deploy deverá agora executar sem o erro de "Dependencies lock file is not found" e o site deverá carregar corretamente no GitHub Pages.
*   Monitore a execução do workflow para confirmar que todas as etapas são concluídas com sucesso e que o deploy para o GitHub Pages ocorre conforme o esperado.

## Registro de Alterações
- **2024-07-30:** Configurado `basename` e `base` path para compatibilidade com GitHub Pages, e adicionada a cópia de `index.html` para `404.html` no workflow de deploy.
- **2024-07-30:** Corrigidos erros de compilação do TypeScript em `src/App.tsx` ao reescrever `src/pages/Index.tsx` como um componente React válido.
- **2024-07-30:** Refatorada a lógica de exibição de conteúdo para incluir a regra da capa, filtragem de lições por Regex (001-999), exibição hierárquica no menu e ocultação de disciplinas vazias. Corrigido o caminho do logo.
- **2024-07-30:** Ajustada a formatação dos números das lições no menu lateral para exibir '01' a '09' e '10' em diante.
- **2024-07-30:** Corrigido o caminho de busca dos arquivos Markdown para compatibilidade com o ambiente de produção (GitHub Pages).
- **2024-07-30:** Implementado suporte a Dark Mode com preservação do estilo skeuomorphic (Folha de Ardósia).
- **2024-07-30:** Ajustado botão de alternância de tema para posição centralizada sob o logo e aplicada paleta Dark VS Code globalmente.
- **2024-07-30:** Ajustado o tamanho do botão de alternância de tema para 60% menor e reposicionado abaixo do logo.
- **2024-07-30:** Aumentado o tamanho do logotipo em 20%, diminuído o tamanho do toggle button em 30% e reduzido o espaçamento ao redor do toggle.
- **2024-07-30:** Reduzido o padding e a margin do contêiner do ThemeSwitch para zerar o espaçamento vertical.
- **2024-07-30:** Diminuída a escala do toggle button para 15% do tamanho original.