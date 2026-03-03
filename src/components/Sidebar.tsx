import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileSidebarToggle from './MobileSidebarToggle';
import { MadeWithDyad } from './made-with-dyad';
import { ThemeSwitch } from './ThemeSwitch'; // Importar ThemeSwitch
import { BASE_PATH } from '@/lib/constants'; // Importar BASE_PATH

interface Lesson {
  path: string;
  name: string;
  displayTitle: string;
}

interface Category {
  name: string;
  displayTitle: string;
  lessons: Lesson[];
}

const SidebarContent: React.FC<{ categories: Category[]; currentCategory?: string; currentLesson?: string; onClose?: () => void }> = ({
  categories,
  currentCategory,
  currentLesson,
  onClose,
}) => {
  const location = useLocation();

  return (
    <nav className="flex-1 overflow-y-auto space-y-2">
      <Link
        to="/"
        onClick={onClose}
        className={`flex items-center gap-3 rounded-md px-4 py-2 text-charcoal-dark hover:bg-lavender-light hover:text-lavender-dark transition-colors duration-200
          dark:text-vscode-text-lesson dark:hover:bg-vscode-menu-active-hover dark:hover:text-white ${
          location.pathname === '/' ? 'bg-lavender-light text-lavender-dark font-medium dark:bg-vscode-menu-active-hover dark:text-white' : ''
        }`}
      >
        <Home className="h-5 w-5" />
        Início
      </Link>
      {categories.map((category) => (
        <div key={category.name} className="pt-2">
          <h2 className="text-[15px] font-medium text-gray-medium px-4 mb-2 dark:text-gray-400">{category.displayTitle}</h2> {/* Aumentado para 15px */}
          {category.lessons.map((lesson) => (
            <Link
              key={lesson.path}
              to={lesson.path}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-md px-4 py-2 text-xs text-zinc-600 hover:bg-lavender-light hover:text-lavender-dark transition-colors duration-200
                dark:text-zinc-400 dark:hover:bg-vscode-menu-active-hover dark:hover:text-white ${
                currentCategory === category.name && currentLesson === lesson.name
                  ? 'bg-lavender-light text-lavender-dark font-medium dark:bg-vscode-menu-active-hover dark:text-white'
                  : ''
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              {lesson.displayTitle}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { category: currentCategory, lesson: currentLesson } = useParams<{ category?: string; lesson?: string }>();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const modules = import.meta.glob('../content/**/*.md', { eager: true, query: '?raw', import: 'default' });
      const loadedCategories: { [key: string]: Category } = {};
      const lessonFileRegex = /^(\d{3})-(.*)\.md$/; // Regex para 001-999-titulo.md

      for (const path in modules) {
        const parts = path.split('/');
        const categoryName = parts[parts.length - 2];
        const fileNameWithExt = parts[parts.length - 1];
        
        const match = fileNameWithExt.match(lessonFileRegex);
        if (!match) {
          continue; // Ignora arquivos que não correspondem ao padrão 001-999-titulo.md
        }

        const lessonNumberStr = match[1]; // Ex: "001", "010", "100"
        const lessonNum = parseInt(lessonNumberStr, 10); // Ex: 1, 10, 100
        let formattedLessonNumber: string;

        if (lessonNum >= 1 && lessonNum <= 9) {
          formattedLessonNumber = `0${lessonNum}`; // "01", "02", ..., "09"
        } else {
          formattedLessonNumber = String(lessonNum); // "10", "11", ..., "99", "100", ...
        }

        const lessonTitleSlug = match[2]; // Ex: "introducao"
        const fileName = `${lessonNumberStr}-${lessonTitleSlug}`; // Reconstroi o nome do arquivo sem a extensão

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
      }

      // Filtra categorias que não possuem nenhuma lição válida
      const filteredCategories = Object.values(loadedCategories).filter(
        (cat) => cat.lessons.length > 0
      );

      filteredCategories.forEach(cat => {
        cat.lessons.sort((a, b) => a.name.localeCompare(b.name));
      });

      const sortedCategories = filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sortedCategories);
    };

    loadContent();
  }, []);

  const sidebarHeader = (
    <div className="flex flex-col items-center justify-center h-auto border-b border-border-light pb-4 mb-2 px-4 dark:border-vscode-border-sidebar"> {/* mb-2 para reduzir espaçamento */}
      <img src={`${BASE_PATH}base_code.svg`} alt="base_code Logo" className="h-14 object-contain mb-2" /> {/* h-14 para aumentar o logo */}
    </div>
  );

  if (isMobile) {
    return (
      <>
        <MobileSidebarToggle onClick={() => setSheetOpen(true)} />
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent 
            side="left" 
            className="p-0 w-64 h-screen flex flex-col bg-background border border-[#E0D8C7] shadow-[0_5px_15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] rounded-lg z-50
                       dark:bg-vscode-bg-sidebar dark:border dark:border-vscode-border-sidebar dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {sidebarHeader}
            <div className="flex justify-center -my-4"> {/* Margem negativa para compensar o espaço */}
              <ThemeSwitch scale={0.5} /> {/* Reduzir a escala para 50% */}
            </div>
            <SidebarContent
              categories={categories}
              currentCategory={currentCategory}
              currentLesson={currentLesson}
              onClose={() => setSheetOpen(false)}
            />
            <div className="mt-auto h-[60px] py-2 border-t border-border-light dark:border-vscode-border-sidebar">
              <MadeWithDyad />
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <aside 
      className="w-64 h-screen flex flex-col bg-background p-4 border border-[#E0D8C7] shadow-[0_5px_15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] rounded-lg z-50
                 dark:bg-vscode-bg-sidebar dark:border dark:border-vscode-border-sidebar dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      {sidebarHeader}
      <div className="flex justify-center -my-4"> {/* Margem negativa para compensar o espaço */}
        <ThemeSwitch scale={0.5} /> {/* Reduzir a escala para 50% */}
      </div>
      <SidebarContent
        categories={categories}
        currentCategory={currentCategory}
        currentLesson={currentLesson}
      />
      <div className="mt-auto h-[60px] py-2 border-t border-border-light dark:border-vscode-border-sidebar">
        <MadeWithDyad />
      </div>
    </aside>
  );
};

export default Sidebar;