'use client';

import { useRouter } from 'next/navigation';

export default function Remove({ slug }: { slug: string }) {
  const router = useRouter();
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!window.confirm(`Are you sure you want to delete "${slug}"`)) {
      return;
    }
    const body = new FormData(evt.currentTarget);
    let res;
    try {
      res = await fetch(`/hi/api`, {
        method: 'delete',
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

    router.refresh();
  };
  return (
    <form className="" onSubmit={handleSubmit}>
      <input readOnly type="text" name="slug" defaultValue={slug} />
      <button className="form-button form-button--alt" type="submit">
        Delete
      </button>
    </form>
  );
}
