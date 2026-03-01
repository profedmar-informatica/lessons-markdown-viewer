import React, { useState, useEffect } from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import Sidebar from '@/components/Sidebar';
import MarkdownViewer from '@/components/MarkdownViewer';
import { useParams } from 'react-router-dom';

const Index = () => {
  const { category, lesson } = useParams<{ category?: string; lesson?: string }>();
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    const loadMarkdown = async () => {
      if (category && lesson) {
        try {
          const module = await import(`../content/${category}/${lesson}.md?raw`);
          setMarkdownContent(module.default);
        } catch (error) {
          console.error(`Failed to load markdown for ${category}/${lesson}:`, error);
          setMarkdownContent('## Conteúdo não encontrado\n\nDesculpe, a aula que você procura não foi encontrada.');
        }
      } else {
        setMarkdownContent('## Bem-vindo às Aulas Dyad!\n\nSelecione uma aula no menu lateral para começar.');
      }
    };
    loadMarkdown();
  }, [category, lesson]);

  return (
    <div className="min-h-screen flex bg-canvas-light">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <MarkdownViewer content={markdownContent} />
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;