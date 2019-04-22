export function slugify(str: string): string {
  const slug = str
    .split('')
    .reduce((result, ch) => {
      return result + ch.replace(/[^\w\s$*_+~.()'"!\-:@]/g, '');
    }, '')
    .trim()
    .replace(/[-\s]+/g, '-');

  return slug.toLowerCase();
}
