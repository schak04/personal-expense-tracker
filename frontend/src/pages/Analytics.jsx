import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { transactionService } from '../api/api';

const COLORS = ['#344E41', '#849477', '#C49A54', '#A3B18A', '#6A775F', '#D2AC70'];

export default function Analytics() {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await transactionService.getAnalytics();
        setBarData(data.barData || []);
        setPieData(data.pieData || []);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="text-muted flex justify-center py-10">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text">Analytics</h1>
        <p className="text-muted">Visual breakdown of your spending habits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text mb-6">Income vs Expenses</h3>
          <div className="h-72 w-full">
            {barData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted">No data yet.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DED0" opacity={0.2} vertical={false} />
                  <XAxis dataKey="name" stroke="#898477" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#898477" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#849477', opacity: 0.1 }} contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-main)', borderRadius: '8px' }} />
                  <Bar dataKey="income" fill="#849477" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="#C49A54" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text mb-6">Expenses by Category</h3>
          <div className="h-72 w-full flex items-center justify-center">
            {pieData.length === 0 ? (
              <div className="text-muted">No expense data yet.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-main)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm text-text">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}