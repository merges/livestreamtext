import React from 'react';

function TextItem ({ className, style, text }) {
  console.log(text);
  return (
    <div style={{
      textTransform: 'uppercase',
      fontWeight: 800,
      ...style,
    }}>
      {text}
    </div>
  );
}

TextItem.defaultProps = {
  text: null,
};

export default TextItem;
