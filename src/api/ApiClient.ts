import {get} from './Api';

const latestComicUrl = 'https://xkcd.com/614/info.0.json';
const comicUrlById = (id: number) => `https://xkcd.com/${id}/info.0.json`;

const fetchComicById = async (payload: {
  id: number;
}): Promise<Response | undefined> => {
  const {id} = payload;
  const url = id ? comicUrlById(id) : latestComicUrl;

  return await get(url, {id});
};

export const ApiClient = {
  fetchComicById,
};

export default ApiClient;
