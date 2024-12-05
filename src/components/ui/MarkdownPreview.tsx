// MarkdownPreview.tsx
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
}

export const MarkdownPreview: FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            return (
              <code
                className={`${className} bg-gray-800 rounded px-2 py-1`}
                {...props}
              >
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-3">{children}</h2>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2 list-disc list-inside mb-4">{children}</ul>
          ),
          li: ({ children }) => <li className="text-gray-300">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
