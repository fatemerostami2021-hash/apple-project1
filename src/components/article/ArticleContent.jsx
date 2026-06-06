import React from 'react';

const ArticleContent = ({ content, isRtl }) => {
  if (!content) {
    return <p className="text-red-500">No content available</p>;
  }

  return (
    <div 
      dir={isRtl ? "rtl" : "ltr"}
      className="article-content prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ArticleContent;
