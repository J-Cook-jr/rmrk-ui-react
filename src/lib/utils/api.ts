/**
 * Fetch markdown file
 * @param slug
 */
export const fetchMd = async (slug: string) => {
  const result = await fetch(`/md/${slug.replace('/?', '')}.md`);
  if (result.status !== 200) throw new Error('404');
  return await result.text();
};

export const getLocalMarkdownLocalisedServer = async (locale: string, name: string) => {
  return fetch(`/locales/${locale}/${name}.md`).then((r) => r.text());
};
