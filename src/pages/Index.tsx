import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import MarkdownViewer from '@/components/MarkdownViewer';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useMarkdownContent } from '@/hooks/use-markdown-content'; // Import the new hook

const Index: React.FC = () => {
  const { category, lesson } = useParams<{ category?: string; lesson?: string }>();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [prefetchedContent, setPrefetchedContent] = useState<Map<string, string>>(new Map()); // Cache for prefetched content

  const { categories, contentMap } = useMarkdownContent(); // Use the new hook

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      setMarkdownContent(''); // Clear content while loading

      let targetContentKey = '';
      let isCoverPage = false;

      if (!category && !lesson) {
        targetContentKey = 'capa'; // Key for capa.md
        isCoverPage = true;
      } else if (category && lesson) {
        targetContentKey = `${category}/${lesson}`;
      } else {
        // Fallback for malformed route, show cover page
        targetContentKey = 'capa';
        isCoverPage = true;
      }

      // Check pre-fetch cache first
      if (prefetchedContent.has(targetContentKey)) {
        setMarkdownContent(prefetchedContent.get(targetContentKey)!);
        setLoading(false);
        // Trigger pre-fetch for new neighbors even if current is cached
        triggerPreFetch(targetContentKey);
        return;
      }

      const loadModule = contentMap[targetContentKey];

      if (loadModule) {
        try {
          const content = await loadModule(); // Await the Promise to get the content
          setMarkdownContent(content);
          // Add to pre-fetch cache for future use
          setPrefetchedContent(prev => new Map(prev).set(targetContentKey, content));
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

      // Trigger pre-fetching for neighbors after current content is loaded
      triggerPreFetch(targetContentKey);
    };

    const triggerPreFetch = (currentKey: string) => {
      // Only pre-fetch if categories data is available and we are on a lesson page
      if (categories.length === 0 || !category || !lesson) {
        return; // No categories loaded yet or on cover page, no neighbors to pre-fetch
      }

      // Defer pre-fetching to avoid blocking main thread
      // Use requestIdleCallback if available, otherwise setTimeout
      const deferPreFetch = window.requestIdleCallback || ((cb) => setTimeout(cb, 0));

      deferPreFetch(() => {
        const currentCategoryName = currentKey.split('/')[0];
        const currentLessonName = currentKey.split('/')[1];

        const currentCategoryObj = categories.find(cat => cat.name === currentCategoryName);

        if (currentCategoryObj) {
          const currentLessonIndex = currentCategoryObj.lessons.findIndex(
            lessonItem => lessonItem.name === currentLessonName
          );

          const neighborsToPreFetch: string[] = [];

          // Previous lesson
          if (currentLessonIndex > 0) {
            const prevLesson = currentCategoryObj.lessons[currentLessonIndex - 1];
            neighborsToPreFetch.push(`${currentCategoryName}/${prevLesson.name}`);
          }

          // Next lesson
          if (currentLessonIndex < currentCategoryObj.lessons.length - 1) {
            const nextLesson = currentCategoryObj.lessons[currentLessonIndex + 1];
            neighborsToPreFetch.push(`${currentCategoryName}/${nextLesson.name}`);
          }

          neighborsToPreFetch.forEach(async (key) => {
            if (!prefetchedContent.has(key) && contentMap[key]) {
              try {
                const content = await contentMap[key]();
                setPrefetchedContent(prev => new Map(prev).set(key, content));
                console.log(`Pre-fetched: ${key}`);
              } catch (error) {
                console.warn(`Failed to pre-fetch ${key}:`, error);
              }
            }
          });
        }
      });
    };

    // Only load markdown if categories are loaded or if it's the cover page (which doesn't depend on categories for its initial load)
    if (categories.length > 0 || (!category && !lesson)) {
      loadMarkdown();
    }
  }, [category, lesson, contentMap, categories, prefetchedContent]); // Dependencies for useEffect

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar /> {/* Removed categories prop */}
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