"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MarkdownEditor } from "./markdown-editor";
import { MarkdownPreview } from "./markdown-preview";

interface BlogEditorProps {
  blogId: string;
  initialTitle: string;
  initialContent: string;
  onSave: (title: string, content: string) => Promise<void>;
  onClose: () => void;
}

export function BlogEditor({
  blogId,
  initialTitle,
  initialContent,
  onSave,
  onClose,
}: BlogEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Resizable split state
  const [splitPercent, setSplitPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track changes
  useEffect(() => {
    const changed = title !== initialTitle || content !== initialContent;
    setHasChanges(changed);
  }, [title, content, initialTitle, initialContent]);

  // Auto-save to localStorage
  useEffect(() => {
    if (hasChanges) {
      const draft = { title, content, savedAt: Date.now() };
      localStorage.setItem(`blog-draft-${blogId}`, JSON.stringify(draft));
    }
  }, [title, content, blogId, hasChanges]);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem(`blog-draft-${blogId}`);
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft.content && draft.savedAt) {
          const useDraft = window.confirm(
            "You have an unsaved draft. Would you like to restore it?"
          );
          if (useDraft) {
            setTitle(draft.title || initialTitle);
            setContent(draft.content);
          } else {
            localStorage.removeItem(`blog-draft-${blogId}`);
          }
        }
      } catch {
        localStorage.removeItem(`blog-draft-${blogId}`);
      }
    }
  }, [blogId, initialTitle]);

  // Handle resize drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      // Clamp between 20% and 80%
      setSplitPercent(Math.max(20, Math.min(80, percent)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await onSave(title, content);
      localStorage.removeItem(`blog-draft-${blogId}`);
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  }, [title, content, blogId, onSave]);

  const handleClose = () => {
    if (hasChanges) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Your draft will be saved locally. Close anyway?"
      );
      if (!confirmClose) return;
    }
    onClose();
  };

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState<"write" | "preview">("write");

  return (
    <div className={`fixed inset-0 bg-background z-50 flex flex-col ${isDragging ? "cursor-col-resize select-none" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border gap-4">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={handleClose}
            className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap"
          >
            ← back
          </button>
          
          {/* Mobile Tab Toggle */}
          <div className="flex md:hidden bg-muted/50 p-0.5 rounded-md">
            <button
              onClick={() => setMobileTab("write")}
              className={`px-3 py-1 text-xs rounded-sm transition-all ${
                mobileTab === "write" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              write
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              className={`px-3 py-1 text-xs rounded-sm transition-all ${
                mobileTab === "preview" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              preview
            </button>
          </div>

          <span className="text-xs mono text-muted-foreground hidden md:inline ml-2">
            {hasChanges ? "unsaved changes" : "saved"}
          </span>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className="text-xs bg-foreground text-background px-4 py-1.5 hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
        >
          {isSaving ? "saving..." : "save"}
        </button>
      </div>

      {/* Title Input */}
      <div className="px-4 md:px-6 py-4 border-b border-border">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="w-full text-xl md:text-2xl font-medium bg-transparent outline-none placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Editor Content Area */}
      <div ref={containerRef} className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Editor Pane */}
        <div 
          className={`h-full overflow-hidden flex flex-col ${
            // On mobile, show if write tab. On desktop, always show but non-flex (controlled by width)
            mobileTab === "write" ? "flex-1 md:flex-none" : "hidden md:flex md:flex-none" 
          }`}
          style={{ width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${splitPercent}%` : undefined }}
        >
          <div className="h-full p-4 flex flex-col">
            <div className="text-[10px] mono text-muted-foreground mb-2 px-1 hidden md:block">write</div>
            <div className="flex-1 overflow-auto">
              <MarkdownEditor
                value={content}
                onChange={setContent}
                placeholder="Start writing in markdown..."
                minHeight="100%"
              />
            </div>
          </div>
        </div>

        {/* Resizable Divider (Desktop only) */}
        <div
          className="hidden md:block w-1 bg-border hover:bg-foreground/20 cursor-col-resize transition-colors flex-shrink-0 relative group"
          onMouseDown={() => setIsDragging(true)}
        >
          <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-foreground/10" />
        </div>

        {/* Preview Pane */}
        <div 
          className={`h-full overflow-hidden flex flex-col ${
            // On mobile, show if preview tab. On desktop, always show but non-flex (controlled by width)
             mobileTab === "preview" ? "flex-1 md:flex-none" : "hidden md:flex md:flex-none"
          }`}
          style={{ width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${100 - splitPercent}%` : undefined }}
        >
          <div className="h-full p-4 flex flex-col">
            <div className="text-[10px] mono text-muted-foreground mb-2 px-1 hidden md:block">preview</div>
            <div className="flex-1 overflow-auto border border-border bg-card/30 p-4 md:p-6 rounded-md md:rounded-none">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-medium mb-6 mt-2 md:mt-0">{title || "Untitled"}</h1>
                <MarkdownPreview content={content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

