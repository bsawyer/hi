import Editable from './editable';
import { useCallback, useState, memo } from 'react';

const MemoEditable = memo(Editable);

export default function Link({
  alt = false,
  href,
  text,
  editing = false,
  name,
}) {
  const [value, setValue] = useState(text);
  const onChange = useCallback((v) => {
    setValue(() => {
      return v;
    });
  }, []);
  const onClick = useCallback(
    (evt) => {
      if (editing) {
        evt.preventDefault();
      }
    },
    [editing],
  );
  return (
    <div className={`link ${alt ? 'link--alt' : ''}`}>
      <a href={href} target="_blank" onClick={onClick}>
        <MemoEditable
          editing={editing}
          tag="span"
          html={text}
          onChange={onChange}
        />
      </a>
      {editing && (
        <div className="link-input">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.5564 6.34315L12.6777 4.22183C13.142 3.75754 13.6932 3.38924 14.2998 3.13797C14.9064 2.88669 15.5566 2.75736 16.2132 2.75736C16.8698 2.75736 17.52 2.88669 18.1266 3.13797C18.7333 3.38924 19.2845 3.75754 19.7487 4.22183C20.213 4.68612 20.5813 5.23732 20.8326 5.84395C21.0839 6.45057 21.2132 7.10075 21.2132 7.75736C21.2132 8.41397 21.0839 9.06415 20.8326 9.67078C20.5813 10.2774 20.213 10.8286 19.7487 11.2929L17.6274 13.4142M13.3848 17.6569L11.2635 19.7782C10.7992 20.2425 10.248 20.6108 9.64135 20.862C9.03472 21.1133 8.38454 21.2426 7.72793 21.2426C6.40185 21.2426 5.13008 20.7159 4.19239 19.7782C3.25471 18.8405 2.72793 17.5687 2.72793 16.2426C2.72793 14.9166 3.25471 13.6448 4.19239 12.7071L6.31371 10.5858" />
            <path d="M9.14212 14.8284L14.799 9.17158" />
          </svg>
          <input name={`links-${name}-href`} defaultValue={href} type="text" />
        </div>
      )}
      <textarea readOnly name={`links-${name}-text`} value={value} />
    </div>
  );
}
