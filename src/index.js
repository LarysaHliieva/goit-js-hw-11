import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './fetchImages';
import { createImagesMarkup } from './createImagesMarkup';

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  searchBtn: document.querySelector('#search-form button[type=submit]'),
};

let page = 1;
let searchQuery = '';
let counterImages = 0;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  searchDisasbled();
  searchQuery = e.currentTarget.elements.searchQuery.value;
  loadMoreHide();
  resetPage();
  resetCounterImages();
  clearImagesMarkup();

  try {
    const data = await fetchImages(searchQuery, page);
    searchAnabled();

    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    showGallery(data);
  } catch (error) {
    error => {
      console.log(error);
    };
  }
}

async function onLoadMore() {
  loadMoreDisasbled();

  try {
    const data = await fetchImages(searchQuery, page);
    loadMoreAnabled();

    showGallery(data);

    smoothScroll();
  } catch (error) {
    error => {
      console.log(error);
    };
  }
}

function showGallery(data) {
  appendImagesMarkup(data.hits);
  lightbox.refresh();
  incrementPage();

  incrementCounterImages(data.hits.length);

  if (data.totalHits === counterImages) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    loadMoreHide();
    return;
  }

  loadMoreShow();
}

function incrementPage() {
  page += 1;
}

function resetPage() {
  page = 1;
}

function incrementCounterImages(quantity) {
  counterImages += quantity;
}

function resetCounterImages() {
  counterImages = 0;
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', createImagesMarkup(images));
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

function smoothScroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
