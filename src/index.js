import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './fetchImages';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);

  fetchImages(searchQuery)
    .then(images => {
      if (images.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      appendImagesMarkup(images.hits);
    })
    .catch();
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', createImagesMarkup(images));
}

function createImagesMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
        </p>
        <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
        </p>
    </div>
</div>
  `
    )
    .join('');
}
