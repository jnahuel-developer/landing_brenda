export function resolveAssetPath(path: string) {
  if (!path) {
    return '';
  }

  if (/^(https?:)?\/\//.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const normalizedPath = encodeURI(path.replace(/^\.?\//, ''));

  return `${base}${normalizedPath}`;
}
