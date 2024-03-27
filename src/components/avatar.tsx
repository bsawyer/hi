import Image from 'next/image';
import Editable from './editable';
import { useCallback, useState, memo } from 'react';

const MemoEditable = memo(Editable);

export default function Avatar({
  type,
  value,
  bg = null,
  editing = false,
  name,
}) {
  const [v, setV] = useState(value);
  const [background, setBackground] = useState(bg);
  const handleChange = useCallback((val) => {
    setV(() => {
      return val;
    });
  }, []);
  const handleBG = useCallback((evt) => {
    setBackground(() => {
      return evt?.target?.value;
    });
  }, []);
  const handleImageChange = useCallback((evt) => {
    if (!evt.target.files?.length) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      setV(() => {
        return e.target.result;
      });
    });
    reader.readAsDataURL(evt.target.files[0]);
  }, []);
  const props = {} as { tabIndex?: number };
  if (editing) {
    props.tabIndex = 0;
  }
  switch (type) {
    case 'image':
      return (
        <div
          className="avatar avatar--image"
          style={background ? { background } : {}}
          {...props}
        >
          <div className="link-input">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.1152 2.33127H6.11517C5.58474 2.33127 5.07603 2.54198 4.70096 2.91705C4.32589 3.29213 4.11517 3.80084 4.11517 4.33127V20.3313C4.11517 20.8617 4.32589 21.3704 4.70096 21.7455C5.07603 22.1206 5.58474 22.3313 6.11517 22.3313H18.1152C18.6456 22.3313 19.1543 22.1206 19.5294 21.7455C19.9045 21.3704 20.1152 20.8617 20.1152 20.3313V9.33127L13.1152 2.33127Z" />
              <path d="M13.1152 2.33127V9.33127H20.1152" />
            </svg>
            <label>
              Choose an image
              <input
                style={{ display: 'none' }}
                onChange={handleImageChange}
                type="file"
              />
            </label>
            <input readOnly type="text" name={`avatars-${name}`} value={v} />
            <label title="Choose a color">
              <input
                type="color"
                onInput={handleBG}
                defaultValue={background}
                name={`avatars-${name}-bg`}
              />
            </label>
          </div>
          <div className="avatar__next-image">
            <Image fill style={{ objectFit: 'contain' }} src={v} alt="" />
          </div>
        </div>
      );
    default:
      return (
        <div className="avatar avatar--text">
          <MemoEditable
            editing={editing}
            tag="div"
            html={value}
            onChange={handleChange}
          />
          <textarea readOnly name={`avatars-${name}`} value={v} />
        </div>
      );
  }
}
