import { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import TransactionRow from '../components/TransactionRow';
import TransactionModal from '../components/TransactionModal';
import { transactionService } from '../api/api';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await transactionService.getAll();
      setTransactions(Array.isArray(data) ? data : (data.results || []));
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await transactionService.delete(id);
      load();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Transactions</h1>
          <p className="text-muted">Your full financial history.</p>
        </div>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="bg-accent text-surface px-4 py-2 rounded-lg font-medium">
          Add Transaction
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col">
        {loading ? (
          <div className="p-8 text-center text-muted">Loading...</div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center text-muted">No transactions yet.</div>
        ) : (
          transactions.map(tx => (
            <div key={tx.id} className="relative group">
              <TransactionRow transaction={tx} />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing(tx); setShowModal(true); }} className="p-2 rounded bg-elevated border border-border text-text"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(tx.id)} className="p-2 rounded bg-elevated border border-border text-rose-500"><Trash2 size={14} /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <TransactionModal
          transaction={editing}
          onClose={() => setShowModal(false)}
          onSaved={load}
        />
      )}
    </div>
  );
}