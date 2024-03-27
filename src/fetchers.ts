import { promises as fs } from 'fs';

export interface Avatar {
  type: string;
  value: string;
  bg?: string;
}

export interface Link {
  text: string;
  href: string;
  alt?: boolean;
}

export interface Theme {
  name: string;
}

export interface Introduction {
  slug: string;
  theme: Theme;
  message: string;
  greeting: string;
  title?: string;
  avatars?: Avatar[];
  links?: Link[];
}

export async function getIntros(): Promise<Introduction[]> {
  const file = await fs.readFile(process.cwd() + '/src/data.json', 'utf8');
  const data = JSON.parse(file);

  data.intro.forEach((intro) => {
    intro.message = intro.message.replace(/\\n/g, '\n');
  });

  return data.intro;
}
