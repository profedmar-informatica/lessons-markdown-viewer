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
        const lessonNum = parseInt(lessonNumberStr, 10);
        const formattedLessonNumber = lessonNum >= 1 && lessonNum <= 9 ? `0${lessonNum}` : String(lessonNum);
        const lessonTitleSlug = match[2];
        const fileName = `${lessonNumberStr}-${lessonTitleSlug}`;

        const displayTitle = `${formattedLessonNumber} - ${lessonTitleSlug
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}`;

        if (!loadedCategories[categoryName]) {
          loadedCategories[categoryName] = {
            name: categoryName,
            displayTitle: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
            lessons: [],
          };
        }

        loadedCategories[categoryName].lessons.push({
          path: `/${categoryName}/${fileName}`,
          name: fileName,
          displayTitle: displayTitle,
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