import { promises as fs } from 'fs';
import { getIntros } from '../../fetchers';
// import { revalidatePath } from 'next/cache'

export const dynamic = 'force-static'; //https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

const NEXT_LOGO = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAAAD9UlEQVR4nOzawU1jSRSF4VEPQoIdgiDAWbDDkSAWzoOtgzEikYkCEoANIzWtnp6G22Dj43pV/r4Irp7+zTuqb39BgLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwvqs+Xx+dXXV+grGcnh4+M93BwcHrW9hIIvF4uW7xWLR+hZGcXZ29vDw8BrW4+PjyclJ64sYwnK5fPnFcrlsfRH9u7i4eHp6+jWs5+fn8/Pz1nfRudVq9fLGarVqfRc9m8/nb6t6ZXpgQ68TQxWW6YEN/ZwYKqYH1nZ6evpzYqiYHljbbxNDxfTAGt5ODBXTA2t4d2KomB74lD9MDBXTAx/488RQMT3wgQ8nhorpgdJnJoaK6YHSJyeGiumBd3x+YqiYHnjHWhNDxfTA/2wwMVRMD/yw2cRQMT3ww8YTQ8X0wJcmhorpga9ODBXTw177+sRQMT3sta1MDBXTw57a4sRQMT3sne1ODBXTw97Z+sRQMT3skcTEUDE97JHQxFAxPeyF3MRQMT3shejEUDE9DG4HE0PF9DCs3UwMFdPDsHY2MVRMDwPa5cRQMT0MaMcTQ8X0MJTdTwwV08NQmkwMFdPDIBpODBXTQ/faTgwV00P3mk8MFdNDx6YwMVRMDx2byMRQMT10aToTQ8X00KVJTQyVu7u71t+JdUxwYqiYHroxzYmhYnroxmQnhorpoQNTnhgqQ04Pf7c+YMtub28vLy9bX7Ge4+Pjo6Oj+/v71odQmP7EUDE9TFoXE0PFq4eJ6mhiqJgeJqeviaFiepic7iaGiulhQnqcGCrDTA8jzA09TgwV08NU9DsxVEwPk9D1xFAxPTQ2wMRQMT00M8bEUOl9evjW+oDNXV9fz2az1lekzGazm5ub1lfsn5EmhkrX00Ovc8NIE0PF9LBr400MFdPDTg05MVRMD/Cfjv8KmTJhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYR/wYAAP//tXl2s6kEKJoAAAAASUVORK5CYII`;

export async function DELETE(request: Request) {
  const formData = await request.formData();
  const intro = await getIntros();
  const slugs = intro.map(({ slug }) => slug);
  const slug = formData.get('slug').toString();

  if (!slug) {
    return Response.json(
      { success: false, message: 'Slug is empty' },
      { status: 500 },
    );
  }

  const index = slugs.indexOf(slug);

  if (index === -1) {
    return Response.json(
      { success: false, message: `Slug "${slug}" is missing` },
      { status: 500 },
    );
  }

  intro.splice(index, 1);

  await fs.writeFile(
    process.cwd() + '/src/data.json',
    JSON.stringify({ intro }, null, 2),
  );

  return Response.json({ intro });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const intro = await getIntros();
  const slugs = intro.map(({ slug }) => slug);
  const slug = formData.get('slug').toString();

  if (!slug) {
    return Response.json(
      { success: false, message: 'Slug is empty' },
      { status: 500 },
    );
  }

  if (slugs.indexOf(slug) !== -1) {
    return Response.json(
      { success: false, message: `Slug "${slug}" arleady exist` },
      { status: 500 },
    );
  }

  intro.push({
    slug,
    theme: { name: 'blue' },
    greeting: `Hi ${slug}!`,
    message: `1. Introduced yourself
    2. Why you like ${slug}
    3. What have you done that matches the job description?`,
    links: [
      { href: 'https://linkedin.com', text: 'LinkedIn', alt: true },
      { href: '/hi/resume.pdf', text: 'Resume' },
    ],
    avatars: [
      { type: 'text', value: '👋' },
      { type: 'image', value: NEXT_LOGO, bg: '#000' },
    ],
  });

  await fs.writeFile(
    process.cwd() + '/src/data.json',
    JSON.stringify({ intro }, null, 2),
  );

  // revalidatePath(`/${slug}/edit`)
  // https://nextjs.org/docs/app/building-your-application/caching#data-cache-and-client-side-router-cache

  return Response.json({ intro });
}

export async function PUT(request: Request) {
  const formData = await request.formData();
  const intro = await getIntros();
  const slug = formData.get('slug');

  if (!slug) {
    throw new Error(`slug is empty`);
  }

  const i = intro.find((introduction) => introduction.slug === slug);

  if (!i) {
    throw new Error(`intro slug "${slug}" does not exist`);
  }

  const avatars = [
    {
      ...i.avatars[0],
      value: String(formData.get('avatars-0')),
    },
    {
      ...i.avatars[1],
      value: String(formData.get('avatars-1')),
      bg: String(formData.get('avatars-1-bg')),
    },
  ];

  const links = [
    {
      ...i.links[0],
      text: String(formData.get('links-0-text')),
      href: String(formData.get('links-0-href')),
    },
    {
      ...i.links[1],
      text: String(formData.get('links-1-text')),
      href: String(formData.get('links-1-href')),
    },
  ];

  const greeting = String(formData.get('greeting'));
  const message = String(formData.get('message'));

  i.greeting = greeting;
  i.message = message;
  i.avatars = avatars;
  i.links = links;
  i.theme.name = String(formData.get('theme'));

  await fs.writeFile(
    process.cwd() + '/src/data.json',
    JSON.stringify({ intro }, null, 2),
  );

  return Response.json(i);
}
