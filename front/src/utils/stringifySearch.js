export const stringifySearch = (data) =>  {
  const entries = Object.keys(data).map((key) => [key, data[key]]);

  if (entries.length)  {
    return `?${entries.map((entries) =>  {
      const [key, value] = entries;
      return `${key}=${value}`
    })
    .join('&')}`
  }
};