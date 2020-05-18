import React from 'react';
import ReactMarkdown from 'react-markdown';

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="markdown">
      <ReactMarkdown source={content.replace(/\\n/gi, '\n')} escapeHtml={false} />
    </div>
  );
}
