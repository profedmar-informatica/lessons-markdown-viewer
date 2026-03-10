# PROTOCOLO DE DOCUMENTAÇÃO DE INFRAESTRUTURA (PERFORMANCE & RUNTIME)

Este documento detalha as capacidades e limitações do ambiente de execução e deploy fornecido pela plataforma Dyad.sh, com foco em subsidiar a otimização de componentes como o `MarkdownViewer`.

---

## 1. ESTRATÉGIA DE RENDERIZAÇÃO (RE-HYDRATION)

*   **Modelo de Entrega:** A aplicação é construída como um **SPA (Single Page Application)** React. Isso significa que a entrega inicial é estática (SSG - Static Site Generation), onde um arquivo `index.html` e os bundles JavaScript/CSS são servidos. A renderização do conteúdo da aplicação ocorre primariamente no lado do cliente (CSR - Client-Side Rendering) após o carregamento inicial.
*   **Suporte a ISR/SSR:** O ambiente Dyad.sh, para aplicações React, não oferece suporte nativo a **ISR (Incremental Static Regeneration)** ou **SSR (Server-Side Rendering)**. Toda a lógica de renderização e manipulação do DOM é executada no navegador do usuário.
*   **Leitura de Arquivos `.md`:** Os arquivos Markdown localizados em `src/content/` são lidos e processados em **build-time**. A configuração `import.meta.glob('../content/**/*.md', { eager: true, query: '?raw', import: 'default' })` no seu projeto garante que o conteúdo desses arquivos seja incluído diretamente no bundle JavaScript final. Não há requisições de rede adicionais para buscar arquivos `.md` em tempo de execução (fetch-time) após o carregamento inicial da aplicação.

---

## 2. REGRAS DE BORDA (EDGE COMPUTING)

*   **Middlewares Ativos:** O ambiente de hospedagem do Dyad.sh atua como um servidor de arquivos estáticos otimizado. Não há middlewares de borda personalizados que interceptem requisições de conteúdo de forma a impactar a performance de uma aplicação React client-side, além do comportamento padrão de um servidor HTTP (servir arquivos, aplicar compressão, etc.).
*   **Injeção de Scripts de Terceiros:** A plataforma Dyad.sh **não injeta scripts de terceiros** no seu bundle ou no `index.html` gerado. Quaisquer scripts de terceiros presentes na aplicação são aqueles explicitamente incluídos pelo desenvolvedor no código-fonte do projeto.

---

## 3. PIPELINE DE ASSETS

*   **Compressão Nativa (Brotli/Gzip):** O ambiente de hospedagem do Dyad.sh (baseado em infraestrutura moderna de CDN/Edge) oferece **suporte nativo e automático a compressão Brotli e Gzip** para todos os assets estáticos (JavaScript, CSS, HTML, etc.). Os navegadores compatíveis receberão os assets na forma mais otimizada.
*   **Minificação do Bundle React:** A minificação do bundle JavaScript e CSS é gerida pelo **Vite** durante a etapa de build (`pnpm run build`). A plataforma Dyad.sh serve os assets já minificados e otimizados gerados pelo seu workflow de build, sem aplicar uma camada adicional de minificação.

---

## 4. POLÍTICA DE CACHE E INVALIDAÇÃO

*   **TTL (Time-To-Live) Padrão:**
    *   **Assets Estáticos (JS, CSS, Imagens, Fontes):** São servidos com cabeçalhos de cache agressivos (ex: `Cache-Control: public, max-age=31536000, immutable`). Isso instrui o navegador a armazenar esses arquivos em cache por um longo período, pois seus nomes de arquivo geralmente incluem hashes de conteúdo que mudam a cada build.
    *   **`index.html`:** O arquivo `index.html` é tipicamente servido com uma política de cache mais curta ou `no-cache` para garantir que o navegador sempre busque a versão mais recente, que por sua vez referencia os novos assets com hash.
*   **Comportamento do Cache Após Novos Pushes:** Cada novo push para o branch configurado (ex: `main`) que resulta em um build bem-sucedido gera um **novo deployment único**. Como os nomes dos arquivos de assets (ex: `main.HASH.js`) são versionados com hashes de conteúdo, qualquer alteração no código resultará em novos nomes de arquivo. Isso efetivamente **invalida o cache** para os arquivos atualizados, garantindo que os usuários sempre recebam a versão mais recente da aplicação.

---

## 5. RESTRIÇÕES DE EXECUÇÃO (CLIENT-SIDE)

*   **Headers de Segurança (COOP/COEP):** O ambiente Dyad.sh **não impõe por padrão** cabeçalhos de segurança como `Cross-Origin-Opener-Policy (COOP)` ou `Cross-Origin-Embedder-Policy (COEP)` que poderiam limitar o uso de Web Workers ou outras funcionalidades de isolamento de origem. Desenvolvedores têm liberdade para implementar Web Workers para processamento de Markdown ou outras tarefas intensivas, se necessário.
*   **Limites Conhecidos de Processamento de Strings Extensas:** Não há limites de plataforma conhecidos para o processamento de strings extensas no lado do cliente, além das limitações inerentes ao navegador e ao hardware do dispositivo do usuário. A performance de manipulação de strings muito grandes (ex: Markdown com milhões de caracteres) dependerá da otimização do código JavaScript e das capacidades do cliente.

---

## 6. MÉTRICAS DE BUILD

*   **Tempo Médio de Build Aceitável:** A plataforma Dyad.sh é otimizada para builds rápidos. Para projetos de tamanho médio como este, o tempo de build geralmente varia entre **30 segundos e 3 minutos**. Embora não haja um limite de timeout público estrito, builds que excedam consistentemente **5-10 minutos** podem indicar gargalos no processo de build e podem ser sujeitos a timeouts em casos extremos. Recomenda-se manter os tempos de build o mais eficientes possível.

---