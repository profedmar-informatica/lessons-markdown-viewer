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
      let isCoverPage = false;

      if (!category && !lesson) {
        contentPath = '../content/capa.md';
        isCoverPage = true;
      } else if (category && lesson) {
        contentPath = `../content/${category}/${lesson}.md`;
      } else {
        // Fallback para o caso de rota malformada, redireciona para a capa
        contentPath = '../content/capa.md';
        isCoverPage = true;
      }

      try {
        const module = await import(/* @vite-ignore */ contentPath + '?raw');
        setMarkdownContent(module.default);
      } catch (err) {
        console.error('Falha ao carregar o conteúdo Markdown:', err);
        if (isCoverPage) {
          setMarkdownContent('# Bem-vindo!\n\nNenhum arquivo `capa.md` encontrado. Por favor, crie um para a página inicial.');
        } else {
          toast.error('Não foi possível carregar o conteúdo do documento.');
          setMarkdownContent('');
        }
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