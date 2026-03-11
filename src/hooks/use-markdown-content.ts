import { useState, useEffect } from 'react';
import matter from 'gray-matter'; // Import gray-matter

interface Lesson {
  path: string; // Full path for React Router
  name: string; // File name slug (e.g., '001-introducao')
  displayTitle: string;
}

interface Category {
  name: string; // Folder name (e.g., 'logica e programação')
  displayTitle: string;
  lessons: Lesson[];
}

// Use import.meta.glob para lazy loading de markdown
const allMarkdownModules = import.meta.glob('../content/**/*.md', { eager: false, query: '?raw', import: 'default' });

// Use import.meta.glob para eager loading de URLs de imagens
const allImageModules = import.meta.glob('../content/**/*.{png,jpg,jpeg,gif,svg,webp}', { eager: true, query: '?url', import: 'default' });

export const useMarkdownContent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [contentMap, setContentMap] = useState<Record<string, () => Promise<{ content: string; pageTitle: string; }>>>({}); // Updated contentMap type
  const [resolvedImageMap, setResolvedImageMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadContentMetadata = async () => {
      const loadedCategories: { [key: string]: Category } = {};
      const newContentMap: Record<string, () => Promise<{ content: string; pageTitle: string; }>> = {}; // Updated contentMap type
      const lessonFileRegex = /^(\d{3})-(.*)\.md$/;

      // Process Markdown files
      for (const path in allMarkdownModules) {
        const parts = path.split('/');
        const categoryName = parts[parts.length - 2];
        const fileNameWithExt = parts[parts.length - 1];
        
        // Function to process and store content
        const processAndStoreContent = async (key: string, rawModule: () => Promise<string>) => {
          const rawMarkdownString = await rawModule();
          const { data, content: markdownBody } = matter(rawMarkdownString);

          let pageTitle = data.title || '';
          let processedContent = markdownBody;

          // If frontmatter title exists, remove the first H1 from the markdown body
          if (pageTitle) {
            processedContent = markdownBody.replace(/^#\s.*?\n/, '');
          } else {
            // If no frontmatter title, try to extract from the first H1 in the markdown body
            const firstH1Match = markdownBody.match(/^#\s*(.*)\n/);
            if (firstH1Match && firstH1Match[1]) {
              pageTitle = firstH1Match[1];
              processedContent = markdownBody.replace(/^#\s.*?\n/, ''); // Remove it after extraction
            } else {
              // Fallback if no frontmatter title and no H1 in content
              pageTitle = key.split('/').pop()?.replace(/^(\d{3})-/, '').replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Título Não Encontrado';
            }
          }
          return { content: processedContent, pageTitle };
        };

        // Handle 'capa.md' separately
        if (fileNameWithExt === 'capa.md') {
          newContentMap['capa'] = () => processAndStoreContent('capa', allMarkdownModules[path] as () => Promise<string>);
          continue; // Skip to next file
        }

        const match = fileNameWithExt.match(lessonFileRegex);
        
        if (!match) {
          continue; // Ignore other files that don't match lesson pattern
        }

        const lessonNumberStr = match[1];
        const lessonTitleSlug = match[2];
        const fileName = `${lessonNumberStr}-${lessonTitleSlug}`;

        // Get raw markdown to parse frontmatter for menuTitle
        const rawMarkdownStringForMenu = await (allMarkdownModules[path] as () => Promise<string>)();
        const { data: menuFrontmatter } = matter(rawMarkdownStringForMenu);

        // Determine displayTitle for sidebar
        const lessonDisplayTitle = menuFrontmatter.menuTitle || lessonTitleSlug
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        if (!loadedCategories[categoryName]) {
          // Format category display title: capitalize each word
          const categoryDisplayTitle = categoryName
            .replace(/-/g, ' ') // Replace hyphens with spaces if any
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          loadedCategories[categoryName] = {
            name: categoryName,
            displayTitle: categoryDisplayTitle,
            lessons: [],
          };
        }

        loadedCategories[categoryName].lessons.push({
          path: `/${categoryName}/${fileName}`,
          name: fileName,
          displayTitle: lessonDisplayTitle,
        });
        newContentMap[`${categoryName}/${fileName}`] = () => processAndStoreContent(`${categoryName}/${fileName}`, allMarkdownModules[path] as () => Promise<string>);
      }

      const filteredCategories = Object.values(loadedCategories).filter(
        (cat) => cat.lessons.length > 0
      );

      filteredCategories.forEach(cat => {
        cat.lessons.sort((a, b) => a.name.localeCompare(b.name));
      });

      const sortedCategories = filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sortedCategories);
      setContentMap(newContentMap);

      // Process Image files
      const newResolvedImageMap: Record<string, string> = {};
      for (const path in allImageModules) {
        // Example path: "../content/logica e programação/base_code.svg"
        // We want key: "logica e programação/base_code.svg"
        const contentRelativePath = path.replace('../content/', '');
        newResolvedImageMap[contentRelativePath] = allImageModules[path] as string;
      }
      setResolvedImageMap(newResolvedImageMap);
    };

    loadContentMetadata();
  }, []); // Empty dependency array to run once on mount

  return { categories, contentMap, resolvedImageMap };
};