function parseInline(text) {
  if (!text) return "";
  
  const tokens = [];
  let keyIndex = 0;
  
  // Regex to split on bold (**text**), inline code (`code`), or italic (*text*)
  const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  const parts = text.split(regex);
  
  parts.forEach((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      tokens.push(<strong key={keyIndex++}>{part.slice(2, -2)}</strong>);
    } else if (part.startsWith('`') && part.endsWith('`')) {
      tokens.push(<code key={keyIndex++} className="inline-code">{part.slice(1, -1)}</code>);
    } else if (part.startsWith('*') && part.endsWith('*')) {
      tokens.push(<em key={keyIndex++}>{part.slice(1, -1)}</em>);
    } else {
      tokens.push(part);
    }
  });
  
  return tokens;
}

export function MarkdownRenderer({ content }) {
  if (!content) return null;

  const lines = content.split('\n');
  const renderedElements = [];

  lines.forEach((line, lineIdx) => {
    // Count leading spaces to determine nested list indentation
    const leadingSpaces = line.search(/\S/);
    const trimmed = line.trim();

    if (trimmed === "") {
      renderedElements.push(<div key={`space-${lineIdx}`} className="md-spacer" />);
      return;
    }

    // Headers
    if (trimmed.startsWith("# ")) {
      renderedElements.push(
        <h1 key={`h1-${lineIdx}`} className="md-h1">
          {parseInline(trimmed.slice(2))}
        </h1>
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      renderedElements.push(
        <h2 key={`h2-${lineIdx}`} className="md-h2">
          {parseInline(trimmed.slice(3))}
        </h2>
      );
      return;
    }
    if (trimmed.startsWith("### ")) {
      renderedElements.push(
        <h3 key={`h3-${lineIdx}`} className="md-h3">
          {parseInline(trimmed.slice(4))}
        </h3>
      );
      return;
    }

    // List item check: * or - followed by space
    const listMatch = trimmed.match(/^([-*+])\s+(.*)$/);
    if (listMatch) {
      const textContent = listMatch[2];
      // Indentation level: every 2 spaces counts as a sub-level
      const level = leadingSpaces > 0 ? Math.floor(leadingSpaces / 2) : 0;
      
      renderedElements.push(
        <div 
          key={`li-${lineIdx}`} 
          className={`md-list-item level-${level}`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          <span className="md-bullet">•</span>
          <span className="md-list-content">{parseInline(textContent)}</span>
        </div>
      );
      return;
    }

    // Paragraph
    renderedElements.push(
      <p key={`p-${lineIdx}`} className="md-p">
        {parseInline(trimmed)}
      </p>
    );
  });

  return <div className="markdown-body">{renderedElements}</div>;
}

export default MarkdownRenderer;
