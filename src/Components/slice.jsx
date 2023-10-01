import React, { useState, useEffect } from 'react';

function EllipsisText({ text, maxChar }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (text.length > maxChar) {
      setDisplayText(text.slice(0, maxChar) + '...');
    } else {
      setDisplayText(text);
    }
  }, [text, maxChar]);

  return <span>{displayText}</span>;
}

export default EllipsisText;