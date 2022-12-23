import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './fetchImages';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;
let searchQuery = '';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  loadMoreHide();

  searchQuery = e.currentTarget.elements.searchQuery.value;
  resetPage();

  fetchImages(searchQuery, page)
    .then(images => {
      if (images.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        clearImagesMarkup();
        return;
      }

      appendImagesMarkup(images.hits);
      loadMoreShow();
    })
    .catch();
}

function onLoadMore(searchQuery) {
  loadMoreDisasbled();
  fetchImages(searchQuery, page)
    .then(images => {
      appendImagesMarkup(images.hits);
      incrementPage();
    })
    .catch()
    .finally(() => loadMoreAnabled());
}

function incrementPage() {
  page += 1;
}

function resetPage() {
  page = 1;
}

function appendImagesMarkup(images) {
  // refs.gallery.innerHTML = createImagesMarkup(images);
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

function clearImagesMarkup() {
  refs.gallery.innerHTML = '';
}

function loadMoreShow() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function loadMoreHide() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function loadMoreDisasbled() {
  refs.loadMoreBtn.disabled = true;
}

function loadMoreAnabled() {
  refs.loadMoreBtn.disabled = true;
}
