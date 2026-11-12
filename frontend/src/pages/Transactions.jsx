import { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import TransactionRow from '../components/TransactionRow';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Mock fetch for all transactions
    setTimeout(() => {
      setTransactions([
        { id: 1, title: 'Freelance Project', amount: 850, type: 'income', category: 'Income', date: '2026-11-12' },
        { id: 2, title: 'Grocery Store', amount: 124.50, type: 'expense', category: 'Food', date: '2026-11-11' },
        { id: 3, title: 'Electric Bill', amount: 85.20, type: 'expense', category: 'Utilities', date: '2026-11-10' },
        { id: 4, title: 'New Keyboard', amount: 140.00, type: 'expense', category: 'Shopping', date: '2026-11-09' },
        { id: 5, title: 'Coffee Shop', amount: 4.50, type: 'expense', category: 'Food', date: '2026-11-08' },
        { id: 6, title: 'Gas Station', amount: 45.00, type: 'expense', category: 'Transportation', date: '2026-11-07' },
      ]);
    }, 300);
  }, []);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Transactions</h1>
          <p className="text-muted">Your full financial history.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-text focus:outline-none focus:border-primary"
            />
          </div>
          <button className="bg-surface border border-border p-2 rounded-lg text-text hover:bg-elevated transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col">
        {transactions.map(tx => (
          <TransactionRow key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
}