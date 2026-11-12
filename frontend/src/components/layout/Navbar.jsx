import { Menu, Plus } from 'lucide-react';

export default function Navbar({ onMenuClick, onAddClick }) {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-muted hover:text-text transition-colors"
        >
          <Menu size={24} />
        </button>
        {/* Can add page title context here if desired */}
      </div>

      <button 
        onClick={onAddClick}
        className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-surface px-4 py-2 rounded-lg font-medium transition-colors"
      >
        <Plus size={18} />
        <span className="hidden sm:inline">Add Transaction</span>
      </button>
    </header>
  );
}