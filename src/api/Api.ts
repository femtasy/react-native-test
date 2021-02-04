import queryString from 'query-string';

export const get = async (
  url: string,
  {
    id,
    headers,
    queries,
  }: {
    id?: number;
    headers?: any;
    queries?: object;
  },
) => {
  try {
    if (id) {
      url = url + `/${id}`;
    }
    if (queries) {
      const stringifiedQuery = queryString.stringify(queries, {
        arrayFormat: 'bracket',
      });
      url = url + `?${stringifiedQuery}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    return response;
  } catch (error) {
    console.error('get -> error', error);

    return undefined;
  }
};
