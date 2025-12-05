export const parseSearch = (search) =>  {

  if (search.length === 0)  {
    return {};
  }
  const rawSearch = search.slice(1);
  const pairs = rawSearch.split('&').map((pair) => pair.split('='));
  return Object.fromEntries(pairs);
}