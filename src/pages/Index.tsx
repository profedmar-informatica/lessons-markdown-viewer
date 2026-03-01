import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import MarkdownViewer from '@/components/MarkdownViewer';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const { category, lesson } = useParams<{ category?: string; lesson?: string }>();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      let contentPath = '';

      if (category && lesson) {
        // Constrói o caminho para o arquivo Markdown com base nos parâmetros da URL
        contentPath = `../content/${category}/${lesson}.md`;
      } else {
        // Se nenhum parâmetro for fornecido, carrega um documento padrão
        contentPath = '../content/logica e programação/000-como-usar.md';
      }

      try {
        // Importa o conteúdo do arquivo Markdown como uma string bruta
        // O comentário /* @vite-ignore */ é usado para instruir o Vite a não analisar estaticamente esta importação dinâmica.
        const module = await import(/* @vite-ignore */ contentPath + '?raw');
        setMarkdownContent(module.default);
      } catch (err) {
        console.error('Falha ao carregar o conteúdo Markdown:', err);
        toast.error('Não foi possível carregar o conteúdo do documento.');
        setMarkdownContent(''); // Limpa o conteúdo em caso de erro
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [category, lesson]); // Recarrega o conteúdo sempre que a categoria ou a lição mudam

  return (
    <div className="flex min-h-screen bg-canvas-light">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
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