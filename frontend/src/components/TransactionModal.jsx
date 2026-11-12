import { useState } from 'react';
import { X } from 'lucide-react';

export default function TransactionModal({ onClose, transaction = null }) {
  const [formData, setFormData] = useState(
    transaction || {
      title: '',
      amount: '',
      type: 'expense',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      note: ''
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving transaction:", formData);
    // await transactionService.create(formData) or .update(id, formData)
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-border bg-elevated">
          <h2 className="text-xl font-bold text-text">
            {transaction ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`py-2 rounded-lg font-medium border transition-colors ${
                formData.type === 'expense'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                  : 'bg-transparent border-border text-muted hover:bg-elevated'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`py-2 rounded-lg font-medium border transition-colors ${
                formData.type === 'income'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                  : 'bg-transparent border-border text-muted hover:bg-elevated'
              }`}
            >
              Income
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:border-primary"
              placeholder="e.g. Groceries"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:border-primary"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:border-primary"
            >
              <option value="Food">Food & Dining</option>
              <option value="Shopping">Shopping</option>
              <option value="Housing">Housing & Rent</option>
              <option value="Utilities">Utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Income">Salary / Income</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg font-medium border border-border text-text hover:bg-elevated transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg font-medium bg-accent text-surface hover:bg-accent/90 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}