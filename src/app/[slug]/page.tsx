import { getIntros } from '../../fetchers';
import Update from '../../components/update';

export default async function Page({
  params,
}: {
  params: { slug: string; image: string };
}): Promise<JSX.Element> {
  const intros = await getIntros();
  const intro = intros.find((i) => i.slug === params.slug);

  return <Update intro={intro} />;
}

export async function generateStaticParams() {
  console.log('calling generate for [slug]/page');
  return getIntros();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const intros = await getIntros();

  return {
    title: `${intros.find((i) => i.slug === params.slug).greeting}`,
  };
}
