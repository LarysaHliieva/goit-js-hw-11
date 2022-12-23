import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './fetchImages';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  searchBtn: document.querySelector('#search-form button[type=submit]'),
};

let page = 1;
let searchQuery = '';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  searchDisasbled();
  searchQuery = e.currentTarget.elements.searchQuery.value;
  loadMoreHide();
  resetPage();
  clearImagesMarkup();
  fetchImages(searchQuery, page)
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (data.totalHits === 0) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }

      appendImagesMarkup(data.hits);
      loadMoreShow();
      incrementPage();
    })
    .catch()
    .finally(searchAnabled);
}

function onLoadMore() {
  loadMoreDisasbled();
  fetchImages(searchQuery, page)
    .then(data => {
      if (data.totalHits === 0) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loadMoreHide();
        return;
      }
      appendImagesMarkup(data.hits);
      incrementPage();
    })
    .catch()
    .finally(loadMoreAnabled);
}

function incrementPage() {
  page += 1;
}

function resetPage() {
  page = 1;
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
  refs.loadMoreBtn.disabled = false;
}

function searchDisasbled() {
  refs.searchBtn.disabled = true;
}

function searchAnabled() {
  refs.searchBtn.disabled = false;
}
