'use client';
import React, { useRef } from 'react';

// like input
export default function Editable({
  tag,
  editing = false,
  html = '',
  onChange,
  ...rest
}) {
  const Tag = tag;
  const ref = useRef(null);

  const onKeyUp = (e) => {
    onChange?.(ref?.current?.innerText);
  };

  return (
    <>
      <Tag
        {...rest}
        // @ts-ignore
        contentEditable={editing}
        suppressContentEditableWarning={true}
        ref={ref}
        onKeyUp={onKeyUp}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
