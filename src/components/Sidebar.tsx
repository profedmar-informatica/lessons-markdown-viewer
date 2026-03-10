import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileSidebarToggle from './MobileSidebarToggle';
import { MadeWithDyad } from './made-with-dyad';
import { ThemeSwitch } from './ThemeSwitch';
import { BASE_PATH } from '@/lib/constants';
import { useMarkdownContent } from '@/hooks/use-markdown-content'; // Import the new hook

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

// SidebarContent now receives categories as a prop
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
          location.pathname === '/' ? 'bg-lavender-light text-lavender-dark font-bold dark:bg-vscode-menu-active-hover dark:text-white' : ''
        }`}
      >
        <Home className="h-5 w-5" />
        Início
      </Link>
      {categories.map((category) => (
        <div key={category.name} className="pt-2">
          <h2 className="text-[15px] font-medium text-gray-medium px-4 mb-2 dark:text-gray-400">{category.displayTitle}</h2>
          {category.lessons.map((lesson) => (
            <Link
              key={lesson.path}
              to={lesson.path}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-md px-4 py-2 text-xs text-[#374151] hover:bg-lavender-light hover:text-lavender-dark transition-colors duration-200
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
  const { category: currentCategory, lesson: currentLesson } = useParams<{ category?: string; lesson?: string }>();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  const { categories } = useMarkdownContent(); // Use the new hook to get categories

  const sidebarHeader = (
    <div className="flex flex-col items-center justify-center h-auto border-b border-border-light pb-4 mb-2 px-4 dark:border-vscode-border-sidebar">
      <img src={`${BASE_PATH}base_code.svg`} alt="base_code Logo" className="h-14 object-contain mb-2" />
    </div>
  );

  if (isMobile) {
    return (
      <>
        <MobileSidebarToggle onClick={() => setSheetOpen(true)} />
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent 
            side="left" 
            className="p-0 w-64 h-screen flex flex-col bg-[var(--papel)] rounded-lg z-50 border border-[#E0D8C7] shadow-[0_5px_15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)]
                       dark:border-vscode-border-sidebar dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {sidebarHeader}
            <div className="flex justify-center -my-4">
              <ThemeSwitch scale={0.5} />
            </div>
            <SidebarContent
              categories={categories} // Pass categories from the hook
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
      className="w-64 h-screen flex flex-col bg-[var(--papel)] p-4 rounded-lg z-50 border border-[#E0D8C7] shadow-[0_5px_15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)]
                 dark:border-vscode-border-sidebar dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      {sidebarHeader}
      <div className="flex justify-center -my-4">
        <ThemeSwitch scale={0.5} />
      </div>
      <SidebarContent
        categories={categories} // Pass categories from the hook
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