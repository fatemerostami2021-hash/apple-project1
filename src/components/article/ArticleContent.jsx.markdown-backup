// src/components/article/ArticleContent.jsx
import { useMemo } from "react";

import VideoEmbed from "./VideoEmbed";
/**
 * Renders article content string with support for:
 * - ## H2, ### H3, #### H4 headings
 * - **bold**, *italic*
 * - | table | rows |
 * - - bullet lists / 1. numbered lists
 * - > blockquote
 * - `inline code`
 * - emoji lines (✨ 📱 🎥 etc.)
 * - blank lines → paragraph breaks
 */

function parseInline(text) {
  // bold + italic + inline code
  return text
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function parseTable(lines) {
  const rows = lines
    .filter((l) => l.trim().startsWith("|") && !l.match(/^\|[-| ]+\|$/))
    .map((l) =>
      l
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((cell) => cell.trim())
    );

  if (rows.length === 0) return null;

  const [header, ...body] = rows;

  return (
    <div className="overflow-x-auto my-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-800/80">
            {header.map((cell, i) => (
              <th
                key={i}
                className="px-4 py-3 text-start font-semibold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700"
                dangerouslySetInnerHTML={{ __html: parseInline(cell) }}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 text-zinc-600 dark:text-zinc-400"
                  dangerouslySetInnerHTML={{ __html: parseInline(cell) }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function parseBlocks(rawText) {
  const lines = rawText.split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // H2
    if (trimmed.startsWith("## ")) {
      blocks.push(
        <h2
          key={i}
          className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mt-12 mb-4 leading-tight"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.slice(3)) }}
        />
      );
      i++;
      continue;
    }

    // H3
    if (trimmed.startsWith("### ")) {
      blocks.push(
        <h3
          key={i}
          className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mt-8 mb-3"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.slice(4)) }}
        />
      );
      i++;
      continue;
    }

    // H4
    if (trimmed.startsWith("#### ")) {
      blocks.push(
        <h4
          key={i}
          className="text-base font-semibold text-zinc-700 dark:text-zinc-300 mt-6 mb-2"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.slice(5)) }}
        />
      );
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={i}
          className="border-s-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 px-5 py-4 my-6 rounded-e-xl text-zinc-700 dark:text-zinc-300 italic"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.slice(2)) }}
        />
      );
      i++;
      continue;
    }

    // Table — collect all consecutive table lines
    if (trimmed.startsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      blocks.push(<div key={`table-${i}`}>{parseTable(tableLines)}</div>);
      continue;
    }

    // Bullet list — collect consecutive items
    if (trimmed.match(/^[-*] /)) {
      const items = [];
      while (i < lines.length && lines[i].trim().match(/^[-*] /)) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="my-5 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (trimmed.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\. /)) {
        items.push(lines[i].trim().replace(/^\d+\. /, ""));
        i++;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="my-5 space-y-2 counter-reset-list">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    blocks.push(
      <p
        key={i}
        className="text-zinc-700 dark:text-zinc-300 leading-8 my-4 text-base md:text-lg"
        dangerouslySetInnerHTML={{ __html: parseInline(trimmed) }}
      />
    );
    i++;
  }

  return blocks;
}

export default function ArticleContent({ content, isRtl }) {
  const blocks = useMemo(() => {
    if (!content) return [];
    return parseBlocks(content);
  }, [content]);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="article-content font-[system-ui] text-base"
    >
      {blocks}
    </div>
  );
}
