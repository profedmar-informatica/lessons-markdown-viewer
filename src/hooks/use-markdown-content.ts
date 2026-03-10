import { useState, useEffect } from 'react';

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

// Use import.meta.glob para lazy loading
const allMarkdownModules = import.meta.glob('../content/**/*.md', { eager: false, query: '?raw', import: 'default' });

export const useMarkdownContent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [contentMap, setContentMap] = useState<Record<string, () => Promise<string>>>({});

  useEffect(() => {
    const loadContentMetadata = async () => {
      const loadedCategories: { [key: string]: Category } = {};
      const newContentMap: Record<string, () => Promise<string>> = {};
      const lessonFileRegex = /^(\d{3})-(.*)\.md$/;

      for (const path in allMarkdownModules) {
        const parts = path.split('/');
        const categoryName = parts[parts.length - 2];
        const fileNameWithExt = parts[parts.length - 1];
        
        const match = fileNameWithExt.match(lessonFileRegex);
        
        // Handle 'capa.md' separately
        if (fileNameWithExt === 'capa.md') {
          newContentMap['capa'] = allMarkdownModules[path] as () => Promise<string>;
          continue; // Skip to next file
        }

        if (!match) {
          continue; // Ignore other files that don't match lesson pattern
        }

        const lessonNumberStr = match[1];
        const lessonTitleSlug = match[2];
        const fileName = `${lessonNumberStr}-${lessonTitleSlug}`;

        // Format lesson display title: remove number prefix and hyphen, capitalize each word
        const lessonDisplayTitle = lessonTitleSlug
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
        newContentMap[`${categoryName}/${fileName}`] = allMarkdownModules[path] as () => Promise<string>;
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
    };

    loadContentMetadata();
  }, []); // Empty dependency array to run once on mount

  return { categories, contentMap };
};