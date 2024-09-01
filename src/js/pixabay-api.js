import axios from 'axios';

const API_KEY = '45273234-8772896c6b05d52973b361fbb';
const BASE_URL = 'https://pixabay.com/api/';
export async function fetchImages(page = 1, perPage = 15, query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: query,
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.status || error.message);
  }
}
