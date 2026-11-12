export default function SummaryCard({ title, amount, icon: Icon, trend }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-muted font-medium">{title}</span>
        <div className="p-2 bg-elevated rounded-lg text-primary">
          <Icon size={20} />
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-text">${amount.toFixed(2)}</h3>
        {trend && (
          <p className="text-sm text-muted mt-1">
            <span className={trend > 0 ? "text-emerald-500" : "text-rose-500"}>
              {trend > 0 ? "+" : ""}{trend}%
            </span> from last month
          </p>
        )}
      </div>
    </div>
  );
}