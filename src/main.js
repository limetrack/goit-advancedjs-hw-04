import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMore,
  showLoadMore,
  showNotification,
  showErrorNotification,
  smoothScroll,
} from './js/render-functions.js';

const DEFAULT_PER_PAGE = 15;

let currentPage = 1;
let currentQuery = '';

async function getImages() {
  hideLoadMore();
  showLoader();

  try {
    const data = await fetchImages(currentPage, DEFAULT_PER_PAGE, currentQuery);

    if (data.hits.length === 0) {
      showErrorNotification(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderGallery(data.hits);

      currentPage++;

      if (currentPage <= Math.ceil(data.totalHits / DEFAULT_PER_PAGE)) {
        showLoadMore();
      } else {
        showNotification(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
  } catch (error) {
    showErrorNotification('Failed to fetch images');
  } finally {
    hideLoader();
  }
}

document
  .getElementById('search-form')
  .addEventListener('submit', async event => {
    event.preventDefault();

    clearGallery();

    const query = document.getElementById('search-input').value.trim();

    currentQuery = query;
    currentPage = 1;

    if (!query) {
      showErrorNotification('Search query cannot be empty');
      return;
    }

    await getImages();
  });

document.getElementById('load-more').addEventListener('click', async () => {
  await getImages();

  smoothScroll();
});
