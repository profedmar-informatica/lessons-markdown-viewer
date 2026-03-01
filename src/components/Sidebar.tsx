import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileSidebarToggle from './MobileSidebarToggle';
import { MadeWithDyad } from './made-with-dyad';

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
        className={`flex items-center gap-3 rounded-md px-4 py-2 text-charcoal-dark hover:bg-lavender-light hover:text-lavender-dark transition-colors ${
          location.pathname === '/' ? 'bg-lavender-light text-lavender-dark font-medium' : ''
        }`}
      >
        <Home className="h-5 w-5" />
        Início
      </Link>
      {categories.map((category) => (
        <div key={category.name} className="pt-2">
          <h2 className="text-sm font-medium text-gray-medium px-4 mb-2">{category.displayTitle}</h2>
          {category.lessons.map((lesson) => (
            <Link
              key={lesson.path}
              to={lesson.path}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-md px-4 py-2 text-xs text-charcoal-dark hover:bg-lavender-light hover:text-lavender-dark transition-colors ${
                currentCategory === category.name && currentLesson === lesson.name
                  ? 'bg-lavender-light text-lavender-dark font-medium'
                  : ''
              }`}
            >
              <BookOpen className="h-5 w-5" />
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

      for (const path in modules) {
        const parts = path.split('/');
        const categoryName = parts[parts.length - 2];
        const fileNameWithExt = parts[parts.length - 1];
        const fileName = fileNameWithExt.replace(/\.md$/, '');

        const displayTitle = fileName
          .replace(/^\d{3}-/, '')
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

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

      Object.values(loadedCategories).forEach(cat => {
        cat.lessons.sort((a, b) => a.name.localeCompare(b.name));
      });

      const sortedCategories = Object.values(loadedCategories).sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sortedCategories);
    };

    loadContent();
  }, []);

  const sidebarHeader = (
    <div className="flex items-center justify-center h-16 border-b border-border-light mb-4">
      <img src="/base_code.svg" alt="base_code Logo" className="h-10 object-contain" />
    </div>
  );

  if (isMobile) {
    return (
      <>
        <MobileSidebarToggle onClick={() => setSheetOpen(true)} />
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side="left" className="p-0 w-64 bg-panel-white border-r-border-light flex flex-col">
            {sidebarHeader}
            <SidebarContent
              categories={categories}
              currentCategory={currentCategory}
              currentLesson={currentLesson}
              onClose={() => setSheetOpen(false)}
            />
            <div className="mt-auto p-4 border-t border-border-light">
              <MadeWithDyad />
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <aside className="w-64 bg-panel-white p-4 border-r border-border-light shadow-sm rounded-r-lg flex flex-col">
      {sidebarHeader}
      <SidebarContent
        categories={categories}
        currentCategory={currentCategory}
        currentLesson={currentLesson}
      />
      <div className="mt-auto p-4 border-t border-border-light">
        <MadeWithDyad />
      </div>
    </aside>
  );
};

export default Sidebar;