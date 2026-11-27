import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import TransactionModal from '../TransactionModal';
import { authService } from '../../api/api';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="flex h-screen bg-background text-text overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        onLogout={handleLogout} 
      />
      
      <div className="relative flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Decorative 4-Corner Background Shapes */}
        <div className="pointer-events-none absolute inset-x-0 top-16 bottom-0 overflow-hidden z-0">
          {/* Top-Left: Tilted Rounded Rectangle */}
          <div className="absolute -top-24 -left-16 w-80 h-44 rounded-3xl -rotate-6 bg-secondary/15 border border-secondary/35" />

          {/* Top-Right: Large Circle */}
          <div className="absolute -top-36 -right-24 w-96 h-96 rounded-full bg-secondary/15 border border-secondary/35" />

          {/* Bottom-Left: Large Circle */}
          <div className="absolute -bottom-40 -left-28 w-96 h-96 rounded-full bg-secondary/15 border border-secondary/35" />

          {/* Bottom-Right: Tilted Rounded Rectangle */}
          <div className="absolute -bottom-24 -right-16 w-96 h-48 rounded-3xl -rotate-6 bg-secondary/15 border border-secondary/35" />
        </div>

        <div className="relative z-10">
          <Navbar 
            onMenuClick={() => setIsSidebarOpen(true)} 
            onAddClick={() => setIsModalOpen(true)} 
          />
        </div>
        
        <main className="relative z-10 flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {isModalOpen && (
        <TransactionModal 
          onClose={() => setIsModalOpen(false)} 
          onSaved={() => window.location.reload()} 
        />
      )}
    </div>
  );
}