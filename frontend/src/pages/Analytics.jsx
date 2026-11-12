import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const barData = [
  { name: 'Jun', income: 4000, expense: 2400 },
  { name: 'Jul', income: 3000, expense: 1398 },
  { name: 'Aug', income: 2000, expense: 3800 },
  { name: 'Sep', income: 2780, expense: 3908 },
  { name: 'Oct', income: 1890, expense: 4800 },
  { name: 'Nov', income: 2390, expense: 3800 },
];

const pieData = [
  { name: 'Housing', value: 1200 },
  { name: 'Food', value: 500 },
  { name: 'Utilities', value: 300 },
  { name: 'Shopping', value: 400 },
];

// Earthy chart colors matching your theme vibe
const COLORS = ['#344E41', '#849477', '#C49A54', '#A3B18A'];

export default function Analytics() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text">Analytics</h1>
        <p className="text-muted">Visual breakdown of your spending habits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: Income vs Expense */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text mb-6">Income vs Expenses (6 Mo)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DED0" opacity={0.2} vertical={false} />
                <XAxis dataKey="name" stroke="#898477" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#898477" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  cursor={{ fill: '#849477', opacity: 0.1 }}
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-main)', borderRadius: '8px' }}
                />
                <Bar dataKey="income" fill="#849477" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#C49A54" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Spending by Category */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text mb-6">Expenses by Category</h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-main)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Custom Legend */}
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