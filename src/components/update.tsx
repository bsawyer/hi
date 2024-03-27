'use client';

import Intro from './intro';
import { useRouter } from 'next/navigation';
import { useCallback, useState, memo } from 'react';
import { Introduction } from '../fetchers';

const Themes = [
  'blue',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'mono',
];

export default function Udpate({
  intro,
  editing = false,
}: {
  intro: Introduction;
  editing?: boolean;
}) {
  const router = useRouter();
  const [theme, setTheme] = useState(intro.theme.name);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await fetch(`/hi/api`, {
        method: 'put',
        body: new FormData(evt.currentTarget),
      });
    } catch (e) {
      console.log(e);
    }
    alert('changes saved');
  };

  const handleChange = useCallback((evt) => {
    setTheme(() => {
      return evt.target.value;
    });
  }, []);

  const handleCancel = useCallback((evt) => {
    evt.preventDefault();
    // router.replace(`/`)
    location.replace('/hi');
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Intro editing={editing} data={intro} theme={theme} />
      {editing && (
        <div className="form-buttons">
          <select
            className="form-button form-button--alt"
            name="theme"
            value={theme}
            onChange={handleChange}
          >
            {Themes.map((t, i) => {
              return <option key={i}>{t}</option>;
            })}
          </select>
          <button
            className="form-button form-button--alt"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="form-button" type="submit">
            Save
          </button>
        </div>
      )}
    </form>
  );
}
