// App.tsx
import { useMarkdownStore } from '@/hooks/markStore';
import { LucideDownload, LucideFileEdit } from 'lucide-react';
import { useEffect } from 'react';
import { MarkdownEditor } from './MarkdownEditor';
import { MarkdownPreview } from './ui/MarkdownPreview';

export default function Final() {
  const { content, setContent } = useMarkdownStore();

  useEffect(() => {
    setContent(`# Hello

- [x] Write the press release
- [ ] Update the website 
- [ ] Contact the media`);
  }, []);

  const handleExport = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'markdown-export.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <header className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LucideFileEdit className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Markview</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md "
              onClick={handleExport}
            >
              <LucideDownload className="h-4 w-4" />
              Export Markdown
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-6">
          <MarkdownEditor />
          <MarkdownPreview content={content} />
        </div>
      </main>
    </div>
  );
}
