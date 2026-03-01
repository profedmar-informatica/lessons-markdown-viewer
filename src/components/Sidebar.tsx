import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-panel-white p-4 border-r border-border-light shadow-sm rounded-r-lg">
      <div className="flex items-center justify-center h-16 border-b border-border-light mb-4">
        <h1 className="text-xl font-semibold text-charcoal-dark">Aulas Dyad</h1>
      </div>
      <nav className="space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-md px-4 py-2 text-charcoal-dark hover:bg-lavender-light hover:text-lavender-dark transition-colors"
        >
          <Home className="h-5 w-5" />
          Início
        </Link>
        <div className="pt-2">
          <h2 className="text-sm font-medium text-gray-medium px-4 mb-2">Categorias</h2>
          <Link
            to="/logica/aula01"
            className="flex items-center gap-3 rounded-md px-4 py-2 text-charcoal-dark hover:bg-lavender-light hover:text-lavender-dark transition-colors"
          >
            <BookOpen className="h-5 w-5" />
            Lógica - Aula 01
          </Link>
          {/* Mais links de aulas serão adicionados aqui dinamicamente */}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;