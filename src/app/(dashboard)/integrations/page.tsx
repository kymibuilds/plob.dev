export default function IntegrationsPage() {
  return (
    <div className="w-full max-w-md mx-auto py-16 px-6 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-normal">[connect apps]</h1>
      </div>

      <div className="flex flex-col gap-4">
        {/* Spotify */}
        <div className="flex items-center justify-between p-4 border border-border bg-card/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 font-bold text-xs">
              sp
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">spotify</span>
              <span className="text-[10px] text-muted-foreground mono">display current song</span>
            </div>
          </div>
          <button className="text-xs border text-muted-foreground border-border px-3 py-1 hover:bg-muted hover:text-foreground transition-colors">
            connect
          </button>
        </div>

        {/* Discord */}
        <div className="flex items-center justify-between p-4 border border-border bg-card/50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-600 font-bold text-xs">
              dc
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">discord</span>
              <span className="text-[10px] text-muted-foreground mono">show online status</span>
            </div>
          </div>
          <button className="text-xs bg-foreground text-background px-3 py-1 hover:opacity-90 transition-opacity">
            manage
          </button>
        </div>

        {/* GitHub */}
        <div className="flex items-center justify-between p-4 border border-border bg-card/50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center text-foreground font-bold text-xs">
              gh
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">github</span>
              <span className="text-[10px] text-muted-foreground mono">show contribution graph</span>
            </div>
          </div>
          <button className="text-xs border text-muted-foreground border-border px-3 py-1 hover:bg-muted hover:text-foreground transition-colors">
            connect
          </button>
        </div>

        {/* Twitter/X */}
        <div className="flex items-center justify-between p-4 border border-border bg-card/50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-foreground font-bold text-xs">
              x
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">twitter / x</span>
              <span className="text-[10px] text-muted-foreground mono">embed latest tweets</span>
            </div>
          </div>
          <button className="text-xs bg-foreground text-background px-3 py-1 hover:opacity-90 transition-opacity">
            manage
          </button>
        </div>
      </div>
    </div>
  );
}
