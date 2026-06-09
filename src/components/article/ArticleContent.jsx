import { useMemo } from "react";
import DOMPurify from "dompurify";

const ArticleContent = ({ content, isRtl }) => {
  // Sanitize HTML برای جلوگیری از XSS
  const sanitizedContent = useMemo(() => {
    if (!content) return "";
    
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        "p", "br", "b", "strong", "i", "em", "u", "h1", "h2", "h3", "h4",
        "ul", "ol", "li", "a", "img", "table", "thead", "tbody", "tr", "td", "th",
        "div", "span", "blockquote", "pre", "code", "hr"
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id", "target", "rel"]
    });
  }, [content]);

  // حالت خالی بودن محتوا
  if (!content || !content.trim()) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">📝</p>
        <p className="text-sm mt-2">
          {isRtl ? "محتوا در حال به‌روزرسانی است..." : "Content is being updated..."}
        </p>
      </div>
    );
  }

  return (
    <div 
      dir={isRtl ? "rtl" : "ltr"}
      className="article-content prose prose-invert prose-amber max-w-none
        prose-headings:text-amber-400 
        prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-4
        prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-amber-300
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-2
        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-amber-400 prose-strong:font-bold
        prose-ul:list-disc prose-ul:pl-5 prose-ul:my-4
        prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-4
        prose-li:text-gray-300 prose-li:mb-1
        prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6
        prose-table:border-collapse prose-table:w-full prose-table:my-6
        prose-th:border prose-th:border-gray-700 prose-th:bg-gray-800 prose-th:p-2 prose-th:text-amber-400
        prose-td:border prose-td:border-gray-700 prose-td:p-2 prose-td:text-gray-300
        prose-blockquote:border-r-4 prose-blockquote:border-amber-500 prose-blockquote:bg-gray-800/50 
        prose-blockquote:p-4 prose-blockquote:rounded-lg prose-blockquote:text-gray-300
        prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-amber-400
        prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default ArticleContent;
