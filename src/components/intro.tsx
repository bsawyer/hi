'use client';

import { type Introduction } from '../fetchers';
import Editable from './editable';
import { useCallback, useState, memo } from 'react';
import Avatar from './avatar';
import Link from './link';

const MemoEditable = memo(Editable);

export default function Intro({
  data,
  editing = false,
  theme,
}: {
  data: Introduction;
  editing?: boolean;
  theme?: string;
}) {
  const [greeting, setGreeting] = useState(data.greeting);
  const [message, setMessage] = useState(data.message);

  const onGreetingChange = useCallback((greeting) => {
    setGreeting(() => {
      return greeting;
    });
  }, []);

  const onMessageChange = useCallback((message) => {
    setMessage(() => {
      return message;
    });
  }, []);

  return (
    <>
      <div
        className={
          'intro ' + (theme || data.theme.name) + (editing ? ' editing' : '')
        }
      >
        <div className="greeting">
          <MemoEditable
            editing={editing}
            tag="div"
            html={data.greeting}
            onChange={onGreetingChange}
          />
        </div>
        <div className="avatars">
          {data.avatars.map((avatar, i) => (
            <Avatar key={i} name={i} editing={editing} {...avatar} />
          ))}
        </div>
        <MemoEditable
          editing={editing}
          className="message"
          tag="div"
          html={data.message}
          onChange={onMessageChange}
        />
        <div className="links">
          {data.links.map((link, i) => (
            <Link key={i} name={i} editing={editing} {...link} />
          ))}
        </div>
      </div>
      <input readOnly type="text " name="slug" value={data.slug} />
      <textarea readOnly name="greeting" value={greeting} />
      <textarea readOnly name="message" value={message} />
    </>
  );
}
