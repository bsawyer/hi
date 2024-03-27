'use client';

import { useRouter } from 'next/navigation';

export default function Create() {
  const router = useRouter();
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const body = new FormData(evt.currentTarget);
    let res;
    try {
      res = await fetch(`/hi/api`, {
        method: 'post',
        body,
      });
    } catch (e) {
      alert(`network error`);
      return;
    }

    if (!res.ok) {
      const json = await res.json();
      alert(json.message);
      return;
    }

    // router.replace(`/${body.get('slug')}?edit`);
    // location.replace(`/hi/${body.get('slug')}?edit`)
    router.refresh();
  };
  return (
    <form className="list-item create-form" onSubmit={handleSubmit}>
      <input type="text" name="slug" placeholder="slug name" />
      <button className="form-button" type="submit">
        Create
      </button>
    </form>
  );
}
