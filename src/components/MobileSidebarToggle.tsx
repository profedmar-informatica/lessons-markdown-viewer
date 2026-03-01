import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileSidebarToggleProps {
  onClick: () => void;
}

const MobileSidebarToggle: React.FC<MobileSidebarToggleProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-50 bg-panel-white shadow-md"
      onClick={onClick}
      aria-label="Abrir menu lateral"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
};

export default MobileSidebarToggle;