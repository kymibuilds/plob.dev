export default function BlogsPage() {
  return (
    <div className="w-full max-w-md mx-auto py-16 px-6 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-normal">[manage posts]</h1>
        <div className="flex gap-2">
            <button className="text-xs bg-foreground text-background px-3 py-1 hover:opacity-90 transition-opacity">
          + write
        </button>
        <button className="text-xs border hover:bg-border px-3 py-1 hover:opacity-90 transition-opacity">
          + link
        </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <article className="flex flex-col gap-2 p-3 border border-dashed border-border bg-card/50">
          <div className="flex justify-between items-start">
            <span className="font-medium text-sm">how i built this dashboard</span>
            <button className="mono text-[10px] bg-green-500/10 text-green-600 hover:bg-red-500/10 hover:text-red-600 px-1.5 py-0.5 cursor-pointer group transition-colors">
              <span className="group-hover:hidden">published</span>
              <span className="hidden group-hover:inline">unpublish</span>
            </button>
          </div>
          <div className="flex justify-between items-center mt-1">
             <span className="mono text-[10px] text-muted-foreground">oct 12 · 1.2k views</span>
             <div className="flex gap-3 text-xs">
                <button className="hover:text-foreground text-muted-foreground">stats</button>
                <button className="hover:text-foreground text-muted-foreground">edit</button>
             </div>
          </div>
        </article>

        <article className="flex flex-col gap-2 p-3 border border-dashed border-border bg-card/50">
          <div className="flex justify-between items-start">
            <span className="font-medium text-sm">why typescript matters</span>
            <button className="mono text-[10px] bg-green-500/10 text-green-600 hover:bg-red-500/10 hover:text-red-600 px-1.5 py-0.5 rounded cursor-pointer group transition-colors">
              <span className="group-hover:hidden">published</span>
              <span className="hidden group-hover:inline">unpublish</span>
            </button>
          </div>
          <div className="flex justify-between items-center mt-1">
             <span className="mono text-[10px] text-muted-foreground">sep 28 · 843 views</span>
             <div className="flex gap-3 text-xs">
                <button className="hover:text-foreground text-muted-foreground">stats</button>
                <button className="hover:text-foreground text-muted-foreground">edit</button>
             </div>
          </div>
        </article>

        <article className="flex flex-col gap-2 p-3 border border-dashed border-border bg-card/50 opacity-75">
          <div className="flex justify-between items-start">
            <span className="font-medium text-sm">the future of web dev</span>
            <span className="mono text-[10px] bg-yellow-500/10 text-yellow-600 px-1.5 py-0.5 rounded">draft</span>
          </div>
          <div className="flex justify-between items-center mt-1">
             <span className="mono text-[10px] text-muted-foreground">last edited 2d ago</span>
             <div className="flex gap-3 text-xs">
                <button className="hover:text-foreground text-muted-foreground">resume</button>
             </div>
          </div>
        </article>
      </div>
    </div>
  );
}