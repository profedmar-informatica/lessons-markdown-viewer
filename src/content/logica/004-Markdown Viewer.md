### Descrição Detalhada do Design "Papel e Paginação" para Visualização de Arquivos Markdown

**Conceito Central:**
O objetivo é criar uma experiência de leitura imersiva que simule a interação com um documento físico, como um livro ou relatório, em uma "escrivaninha digital". O conteúdo de um arquivo Markdown é renderizado em múltiplos "folhas de papel" virtuais, cada uma representando uma página, com um sistema de paginação que permite ao usuário navegar entre elas.

---

**1. O Ambiente da "Escrivaninha" (Fundo Geral):**

*   **Fundo:** Uma textura de madeira escura e rica, ou um padrão sutil que evoque a sensação de uma superfície de trabalho antiga. Isso serve como o "plano de fundo" sobre o qual as "folhas de papel" repousam.
    *   **Exemplo:** `background-image: url('textura-madeira.jpg'); background-size: cover; background-position: center;`
*   **Layout:** A área de visualização do documento deve ser o foco principal, com um menu lateral (sidebar) para seleção de arquivos.

---

**2. A "Folha de Papel" (Elemento de Conteúdo Individual):**

Cada "página" do documento Markdown é renderizada dentro de um elemento visual que imita uma folha de papel.

*   **Cor de Fundo:** Um tom de branco suave, creme ou levemente amarelado (`#FFFBF0`, `#FAFAFA`, `#FDFDFD`) para simular papel envelhecido ou de alta qualidade.
*   **Borda:** Uma borda sutil de 1px sólido em um tom de cinza muito claro ou bege (`#E0D8C7`) para definir os limites da folha.
*   **Sombra (Box-Shadow):** **Crucial** para o efeito de profundidade e "flutuação". Deve ser uma sombra suave e difusa, simulando a luz vinda de cima, e pode ter múltiplas camadas para um efeito mais realista.
    *   **Exemplo:** `box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);` (uma sombra mais forte para profundidade e uma borda interna sutil para definição).
*   **Raio da Borda (Border-Radius):** Pequeno, como `4px` ou `8px`, para suavizar os cantos da folha, dando um toque mais orgânico.
*   **Dimensões:**
    *   **Largura Fixa:** A "página" deve ter uma largura fixa que se assemelhe a um formato de papel padrão (ex: A4 ou Letter). Uma largura em pixels como `794px` (equivalente a 210mm a 96dpi) é ideal para desktop.
    *   **Altura Fixa (ou Mínima/Máxima):** Para simular a quebra de página, a altura também deve ser controlada. Uma `min-height` e `max-height` de `1123px` (equivalente a 297mm a 96dpi) para A4. O `overflow: hidden;` é importante para que o conteúdo que excede a altura seja "cortado" e continue na próxima página.
*   **Margens Internas (Padding):** Preenchimento generoso dentro da folha (ex: `padding: 94.5px;` para simular 25mm de margem em A4) para afastar o texto das bordas, como em um documento impresso.
*   **Margens Externas (Margin):** Espaçamento entre as folhas de papel (ex: `margin-bottom: 30px;`) para criar a ilusão de uma pilha.
*   **Posicionamento:** As folhas devem ser centralizadas horizontalmente na área de conteúdo.

---

**3. Paginação e Empilhamento das "Folhas":**

O conteúdo de um único arquivo Markdown é dividido em várias "folhas de papel" virtuais.

*   **Divisão do Conteúdo (JavaScript/Algoritmo):**
    *   O Markdown é primeiro convertido para HTML.
    *   Este HTML é então inserido em um contêiner temporário (invisível) para medir sua altura.
    *   O conteúdo é iterado (parágrafos, títulos, listas, blocos de código) e adicionado a uma "folha" até que a altura máxima de conteúdo da folha seja atingida (altura da folha - 2 * padding).
    *   Quando a altura é excedida, o último elemento adicionado é removido da folha atual e uma **nova folha de papel** é criada, para onde o elemento é movido. Este processo continua até que todo o conteúdo seja distribuído.
    *   **Consideração:** O algoritmo deve tentar evitar quebras de parágrafos, títulos ou blocos de código no meio de uma página (`break-inside: avoid;` no CSS pode ajudar, mas JavaScript é mais robusto).
*   **Visualização da Pilha:**
    *   As "folhas" são empilhadas verticalmente, uma abaixo da outra, com um `margin-bottom` para separação.
    *   **Animação de Entrada:** Ao carregar um novo documento, cada folha pode aparecer com um pequeno atraso sequencial (ex: `opacity: 0; transform: translateY(20px);` para `opacity: 1; transform: translateY(0);` com `transition: opacity 0.6s ease-out, transform 0.6s ease-out;`) para um efeito de "folhas sendo colocadas na mesa".
*   **Numeração de Página:**
    *   Cada "folha" deve exibir um número de página no rodapé, geralmente no canto inferior direito.
    *   **Formato:** "Página X de Y - Documento A / B" (onde X é a página interna do documento, Y é o total de páginas internas, A é o índice do documento atual na lista geral, e B é o total de documentos na lista geral).
    *   **Estilo:** Texto pequeno, discreto, em um tom de cinza suave (`#888`).
    *   **Exemplo HTML:** `<div class="document-page-number">Página 1 de 3 - Documento 2 / 5</div>`

---

**4. Tipografia e Estilo do Conteúdo:**

*   **Fonte Principal:** Uma fonte serifada clássica (ex: 'Palatino Linotype', 'Book Antiqua', 'Georgia', 'Times New Roman') para o corpo do texto, para reforçar a estética de documento impresso.
*   **Line-Height:** Um espaçamento de linha generoso (ex: `1.7` ou `1.8`) para melhorar a legibilidade.
*   **Cores do Texto:** Um cinza escuro (`#333`) em vez de preto puro para um visual mais suave.
*   **Cabeçalhos (H1-H6):**
    *   Cores mais escuras (`#222`).
    *   Bordas inferiores sutis (sólidas para H1, tracejadas para H2) para separação visual.
    *   Margens superiores e inferiores para espaçamento.
*   **Listas (UL, OL):** Margens e espaçamento adequados.
*   **Blocos de Código (`<pre><code>`):**
    *   Fundo levemente diferente (`#F0F0E0`).
    *   Borda sutil.
    *   `overflow-x: auto;` para lidar com linhas longas.
    *   Fonte monoespaçada (ex: 'Courier New').
    *   **Realce de Sintaxe:** Usar uma biblioteca como `highlight.js` para colorir o código.
*   **Citações (`<blockquote>`):** Borda lateral esquerda e texto em itálico com cor mais suave.
*   **Links (`<a>`):** Cor diferente, sublinhado tracejado, e um efeito `hover` sutil.
*   **Quebras de Página:** O CSS deve incluir `break-inside: avoid; orphans: 2; widows: 2;` para elementos de bloco dentro do `.paper` para otimizar a quebra de página para impressão.

---

**5. Seleção de Fonte (Funcionalidade Adicional):**

*   Um `select` dropdown no sidebar permite ao usuário escolher entre diferentes estilos de fonte (Padrão/Serif, Sans-serif, Monospace).
*   A seleção é salva no `localStorage` e aplicada dinamicamente a todas as "folhas de papel" renderizadas.
*   **Exemplo de Classes:** `.paper.font-serif`, `.paper.font-sans-serif`, etc.

---

**6. Responsividade:**

*   **Layout Flexível:** Em telas menores (mobile), o layout deve mudar de `flex-direction: row` para `column`, empilhando o sidebar e a área de conteúdo.
*   **"Folha de Papel":**
    *   A largura fixa da folha deve se tornar `width: 100%` (ou `90%`) com `margin: auto` e `padding` reduzido (ex: `25px`) para se ajustar à tela.
    *   A `max-height` deve ser removida (`max-height: none;`) para permitir que o conteúdo role livremente dentro da folha, já que a paginação por altura fixa pode não ser ideal em mobile.
*   **Sidebar:** A altura do sidebar pode ser limitada (ex: `max-height: 250px;`) com `overflow-y: auto;` para que o usuário possa rolar a lista de documentos.
*   **Numeração de Página:** O tamanho da fonte e a posição podem ser ajustados para telas menores.

---

**Tecnologias e Implementação Sugeridas:**

*   **Frontend:** React (ou outro framework), TypeScript, Tailwind CSS para estilização.
*   **Markdown Parsing:** `marked.js` para converter Markdown em HTML.
*   **Syntax Highlighting:** `highlight.js` para realçar blocos de código.
*   **Backend:** Node.js/Express (ou similar) para servir os arquivos Markdown e a aplicação.
*   **Paginação:** Requer lógica JavaScript para dividir o conteúdo HTML em múltiplos elementos de "papel" com base na altura.