export function addParams(url = '?', query = {}) {
  url += '?';
  for (const key in query) {
    if (query[key]) {
      url += `${key}=${query[key]}&`;
    }
  }
  console.log(url);

  return url;
}
