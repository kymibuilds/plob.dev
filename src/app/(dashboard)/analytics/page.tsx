export default function AnalyticsPage() {
  return (
    <div className="w-full max-w-md mx-auto py-16 px-6 flex flex-col gap-8">
      <h1 className="text-lg font-normal mb-4">[analytics]</h1>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border border-border bg-card/50 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground mono">total views</span>
          <span className="text-2xl font-light">128.4k</span>
          <span className="text-xs text-emerald-500 max-w-fit px-1.5 py-0.5 bg-emerald-500/10 rounded-full">+12%</span>
        </div>
        <div className="p-4 border border-border bg-card/50 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground mono">unique visitors</span>
          <span className="text-2xl font-light">42.1k</span>
          <span className="text-xs text-emerald-500 max-w-fit px-1.5 py-0.5 bg-emerald-500/10 rounded-full">+8%</span>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="mt-4 flex flex-col gap-4">
        <h2 className="text-xs text-muted-foreground mono">engagement</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm py-2 border-b border-border border-dashed">
            <span>avg. duration</span>
            <span className="mono">2m 14s</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-border border-dashed">
            <span>bounce rate</span>
            <span className="mono">42%</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-border border-dashed">
            <span>top source</span>
            <span className="mono">twitter / x</span>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="h-32 border border-border border-dashed flex items-center justify-center text-xs text-muted-foreground mono bg-diagonal-stripes opacity-60">
        [ chart placeholder ]
      </div>
    </div>
  );
}