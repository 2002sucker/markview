import { LucideFileEdit } from 'lucide-react';
import { FC } from 'react';
import { useMarkdownStore } from '../hooks/markStore';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';

export const MarkdownEditor: FC = () => {
  const { content, setContent } = useMarkdownStore();

  return (
    <Card className="p-4 border-border/40">
      <div className="flex items-center gap-2 mb-4">
        <LucideFileEdit className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-medium text-muted-foreground">Editor</h2>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[calc(100vh-12rem)] font-mono text-sm resize-none bg-background border-none focus-visible:ring-0"
        placeholder="Start writing markdown..."
      />
    </Card>
  );
};
