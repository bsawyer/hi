import { getIntros } from '../../fetchers';
import Update from '../../components/update';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
  const intros = await getIntros();
  const slug = searchParams.slug;
  const intro = intros.find((i) => i.slug === slug);

  return <Update editing={true} intro={intro} />;
}

export const revalidate = 0;
// export const dynamic = 'force-dynamic';
