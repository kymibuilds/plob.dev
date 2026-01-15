export default function SponsorsPage() {
  return (
    <div className="w-full max-w-md mx-auto py-16 px-6 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-normal">[manage sponsors]</h1>
        <button className="text-xs bg-foreground text-background px-3 py-1 hover:opacity-90 transition-opacity">
          + add
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs text-muted-foreground mono">gold tier</h2>
            <button className="text-[10px] hover:underline text-muted-foreground">edit tier</button>
          </div>
          
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between items-center border border-dashed border-border p-2 bg-card/50">
              <div className="flex flex-col">
                <span>acme corp</span>
                <span className="mono text-[10px] text-muted-foreground">$500/mo</span>
              </div>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <button className="hover:text-foreground">edit</button>
                <button className="hover:text-red-500">del</button>
              </div>
            </div>
            
            <div className="flex justify-between items-center border border-dashed border-border p-2 bg-card/50">
              <div className="flex flex-col">
                <span>globex inc</span>
                <span className="mono text-[10px] text-muted-foreground">$500/mo</span>
              </div>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <button className="hover:text-foreground">edit</button>
                <button className="hover:text-red-500">del</button>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs text-muted-foreground mono">silver tier</h2>
            <button className="text-[10px] hover:underline text-muted-foreground">edit tier</button>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between items-center border border-dashed border-border p-2 bg-card/50">
              <div className="flex flex-col">
                <span>soylent corp</span>
                <span className="mono text-[10px] text-muted-foreground">$250/mo</span>
              </div>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <button className="hover:text-foreground">edit</button>
                <button className="hover:text-red-500">del</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}