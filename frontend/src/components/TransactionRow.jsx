import { Coffee, ShoppingBag, Home, Zap, DollarSign, HelpCircle } from 'lucide-react';

const categoryIcons = {
  food: Coffee,
  shopping: ShoppingBag,
  housing: Home,
  utilities: Zap,
  income: DollarSign,
};

export default function TransactionRow({ transaction }) {
  const isIncome = transaction.type === 'income';
  const Icon = categoryIcons[transaction.category?.toLowerCase()] || HelpCircle;

  return (
    <div className="flex items-center justify-between p-4 hover:bg-elevated transition-colors border-b border-border last:border-b-0">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${isIncome ? 'bg-emerald-500/10 text-emerald-500' : 'bg-secondary/20 text-secondary'}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="font-medium text-text">{transaction.title}</p>
          <div className="flex gap-2 text-sm text-muted">
            <span>{transaction.category}</span>
            <span>•</span>
            <span>{new Date(transaction.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <p className={`font-semibold ${isIncome ? 'text-emerald-500' : 'text-text'}`}>
          {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
        </p>
      </div>
    </div>
  );
}