import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import MarkdownViewer from '@/components/MarkdownViewer';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Use import.meta.glob para carregar todos os arquivos Markdown ansiosamente como strings brutas.
// Isso garante que o conteúdo esteja disponível no bundle final e não precise ser 'buscado' em tempo de execução.
const allMarkdownModules = import.meta.glob('../content/**/*.md', { eager: true, query: '?raw', import: 'default' });

const Index: React.FC = () => {
  const { category, lesson } = useParams<{ category?: string; lesson?: string }>();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Mapeia os caminhos dos módulos para chaves mais fáceis de usar (ex: 'categoria/001-titulo')
  const contentMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const path in allMarkdownModules) {
      // Normaliza o caminho para corresponder ao que seria gerado pelos parâmetros da URL
      // Exemplo: '../content/logica e programação/001-como-usar.md' -> 'logica e programação/001-como-usar'
      const normalizedPath = path
        .replace('../content/', '')
        .replace('.md', '');
      map[normalizedPath] = allMarkdownModules[path] as string;
    }
    return map;
  }, []); // contentMap só é recalculado se allMarkdownModules mudar (o que não acontece)

  useEffect(() => {
    setLoading(true);
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

    const content = contentMap[targetContentKey];

    if (content) {
      setMarkdownContent(content);
    } else {
      console.error(`Conteúdo Markdown não encontrado para a chave: ${targetContentKey}`);
      if (isCoverPage) {
        setMarkdownContent('# Bem-vindo!\n\nNenhum arquivo `capa.md` encontrado ou acessível. Por favor, crie um para a página inicial.');
      } else {
        toast.error('Não foi possível carregar o conteúdo do documento.');
        setMarkdownContent('');
      }
    }
    setLoading(false);
  }, [category, lesson, contentMap]); // Recarrega o conteúdo sempre que a categoria ou a lição mudam

  return (
    <div className="flex h-screen overflow-hidden bg-background"> {/* Adicionado h-screen e overflow-hidden */}
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-[var(--mesa)]"> {/* Made padding responsive */}
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