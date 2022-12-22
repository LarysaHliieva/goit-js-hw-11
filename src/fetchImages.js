const KEY_API = '19043103-0cd62514f089da7e89200caeb';
const BASE_URL = 'https://pixabay.com/api';

export function fetchImages(query) {
  return fetch(
    `${BASE_URL}/?key=${KEY_API}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
