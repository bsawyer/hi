import { getIntros } from '../fetchers';
import Link from 'next/link';
import Create from '../components/create';
import Remove from '../components/remove';

function IntroItem({ intro }) {
  return (
    <div className="list-item">
      <div>{intro.slug}</div>
      <div className="list-item">
        <Link replace href={`/edit?slug=${intro.slug}`}>
          edit
        </Link>
        <Remove slug={intro.slug} />
      </div>
    </div>
  );
}

export default async function Page(): Promise<JSX.Element> {
  const intros = await getIntros();

  return (
    <div className="list-items">
      {intros.map((intro, i) => (
        <IntroItem key={i} intro={intro} />
      ))}
      <Create />
    </div>
  );
}
