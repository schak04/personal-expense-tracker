import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import TransactionModal from '../TransactionModal';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-text overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
          onAddClick={() => setIsModalOpen(true)} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {isModalOpen && (
        <TransactionModal onClose={() => setIsModalOpen(false)} onSaved={() => window.location.reload()} />
      )}
    </div>
  );
}