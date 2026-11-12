import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PieChart, Moon, Sun, X } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
  );

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    
    if (!document.startViewTransition) {
      document.documentElement.setAttribute('data-theme', newTheme);
      setIsDark(!isDark);
      return;
    }

    document.startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', newTheme);
      setIsDark(!isDark);
    });
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: ReceiptText },
    { name: 'Analytics', path: '/analytics', icon: PieChart },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-surface border-r border-border
        transform transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <span className="text-xl font-bold text-primary tracking-wide">Ledger</span>
          <button className="lg:hidden text-muted hover:text-text" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
                ${isActive 
                  ? 'bg-primary text-background' 
                  : 'text-muted hover:bg-elevated hover:text-text'}
              `}
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-muted hover:bg-elevated hover:text-text transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}