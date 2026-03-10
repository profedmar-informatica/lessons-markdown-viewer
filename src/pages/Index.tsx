import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import MarkdownViewer from '@/components/MarkdownViewer';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Use import.meta.glob para carregar todos os arquivos Markdown de forma lazy (eager: false).
// Isso garante que o conteúdo seja carregado apenas quando necessário, reduzindo o bundle inicial.
const allMarkdownModules = import.meta.glob('../content/**/*.md', { eager: false, query: '?raw', import: 'default' });

const Index: React.FC = () => {
  const { category, lesson } = useParams<{ category?: string; lesson?: string }>();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Mapeia os caminhos dos módulos para chaves mais fáceis de usar (ex: 'categoria/001-titulo')
  // O map agora armazena funções que retornam Promises do conteúdo.
  const contentMap = useMemo(() => {
    const map: Record<string, () => Promise<string>> = {};
    for (const path in allMarkdownModules) {
      // Normaliza o caminho para corresponder ao que seria gerado pelos parâmetros da URL
      // Exemplo: '../content/logica e programação/001-como-usar.md' -> 'logica e programação/001-como-usar'
      const normalizedPath = path
        .replace('../content/', '')
        .replace('.md', '');
      map[normalizedPath] = allMarkdownModules[path] as () => Promise<string>;
    }
    return map;
  }, []);

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      setMarkdownContent(''); // Limpa o conteúdo enquanto carrega

      let targetContentKey = '';
      let isCoverPage = false;

      if (!category && !lesson) {
        targetContentKey = 'capa'; // Chave para capa.md
        isCoverPage = true;
      } else if (category && lesson) {
        targetContentKey = `${category}/${lesson}`;
      } else {
        // Fallback para o caso de rota malformada, exibe a capa
        targetContentKey = 'capa';
        isCoverPage = true;
      }

      const loadModule = contentMap[targetContentKey];

      if (loadModule) {
        try {
          const content = await loadModule(); // Aguarda a resolução da Promise para obter o conteúdo
          setMarkdownContent(content);
        } catch (error) {
          console.error(`Erro ao carregar o conteúdo Markdown para a chave: ${targetContentKey}`, error);
          toast.error('Não foi possível carregar o conteúdo do documento.');
          setMarkdownContent('# Erro ao carregar\n\nOcorreu um erro ao tentar carregar o conteúdo. Por favor, tente novamente.');
        }
      } else {
        console.error(`Conteúdo Markdown não encontrado para a chave: ${targetContentKey}`);
        if (isCoverPage) {
          setMarkdownContent('# Bem-vindo!\n\nNenhum arquivo `capa.md` encontrado ou acessível. Por favor, crie um para a página inicial.');
        } else {
          toast.error('Documento não encontrado.');
          setMarkdownContent('# Documento não encontrado\n\nO documento que você tentou acessar não existe.');
        }
      }
      setLoading(false);
    };

    loadMarkdown();
  }, [category, lesson, contentMap]); // Recarrega o conteúdo sempre que a categoria ou a lição mudam

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-[var(--mesa)]">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 bg-gray-200 rounded-md" />
              <Skeleton className="h-4 w-full bg-gray-200 rounded-md" />
              <Skeleton className="h-4 w-full bg-gray-200 rounded-md" />
              <Skeleton className="h-4 w-2/3 bg-gray-200 rounded-md" />
              <Skeleton className="h-64 w-full bg-gray-200 rounded-md" />
            </div>
          ) : (
            <MarkdownViewer content={markdownContent} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;