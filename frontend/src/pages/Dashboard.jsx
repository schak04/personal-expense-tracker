import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SummaryCard from '../components/SummaryCard';
import TransactionRow from '../components/TransactionRow';
import { transactionService } from '../api/api';

export default function Dashboard() {
  const [data, setData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    recentTransactions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking the fetch for now so you can see the UI immediately.
    // Replace this block with: const result = await transactionService.getSummary();
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simulated API Response
        setTimeout(() => {
          setData({
            balance: 2450.00,
            income: 3200.00,
            expenses: 750.00,
            recentTransactions: [
              { id: 1, title: 'Freelance Project', amount: 850, type: 'income', category: 'Income', date: '2026-11-12' },
              { id: 2, title: 'Grocery Store', amount: 124.50, type: 'expense', category: 'Food', date: '2026-11-11' },
              { id: 3, title: 'Electric Bill', amount: 85.20, type: 'expense', category: 'Utilities', date: '2026-11-10' },
              { id: 4, title: 'New Keyboard', amount: 140.00, type: 'expense', category: 'Shopping', date: '2026-11-09' },
            ]
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-muted flex justify-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-muted">Welcome back. Here is your financial overview.</p>
      </div>

      {/* Summary Stats Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <SummaryCard 
          title="Total Balance" 
          amount={data.balance} 
          icon={Wallet} 
          trend={2.5} 
        />
        <SummaryCard 
          title="Monthly Income" 
          amount={data.income} 
          icon={TrendingUp} 
        />
        <SummaryCard 
          title="Monthly Expenses" 
          amount={data.expenses} 
          icon={TrendingDown} 
          trend={-1.2}
        />
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-text">Recent Transactions</h2>
          <Link 
            to="/transactions" 
            className="flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="flex flex-col">
          {data.recentTransactions.length > 0 ? (
            data.recentTransactions.map((tx) => (
              <TransactionRow key={tx.id} transaction={tx} />
            ))
          ) : (
            <div className="p-8 text-center text-muted">
              No recent transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}