import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="markdown">
      <ReactMarkdown children={content.replace(/\\n/gi, '\n')} rehypePlugins={[rehypeRaw]} />
    </div>
  );
}
