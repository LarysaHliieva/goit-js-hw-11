const KEY_API = '19043103-0cd62514f089da7e89200caeb';
const BASE_URL = 'https://pixabay.com/api';

export function fetchImages(query, page) {
  const searchParams = new URLSearchParams({
    q: query,
    key: KEY_API,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 4,
    page,
  });

  return fetch(`${BASE_URL}/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
