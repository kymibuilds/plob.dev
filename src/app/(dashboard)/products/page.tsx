export default function ProductsPage() {
  return (
    <div className="w-full max-w-md mx-auto py-16 px-6 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-normal">[manage products]</h1>
        <button className="text-xs bg-foreground text-background px-3 py-1 hover:opacity-90 transition-opacity">
          + new product
        </button>
      </div>

      <div className="flex flex-col gap-4 text-sm">
        <div className="flex flex-col gap-3 p-4 border border-border bg-card/50">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-medium">minimal saas starter</span>
              <span className="mono text-xs text-muted-foreground">active · $149</span>
            </div>
            <div className="flex gap-3 text-xs">
              <button className="hover:underline">edit</button>
              <button className="text-muted-foreground hover:text-foreground">archive</button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs mono text-muted-foreground border-t border-dashed border-border pt-3">
             <span>24 sales</span>
             <span>$3,576 revenue</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4 border border-border bg-card/50">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-medium">auth patterns guide</span>
              <span className="mono text-xs text-muted-foreground">active · $29</span>
            </div>
            <div className="flex gap-3 text-xs">
              <button className="hover:underline">edit</button>
              <button className="text-muted-foreground hover:text-foreground">archive</button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs mono text-muted-foreground border-t border-dashed border-border pt-3">
             <span>152 sales</span>
             <span>$4,408 revenue</span>
          </div>
        </div>
      </div>
    </div>
  );
}