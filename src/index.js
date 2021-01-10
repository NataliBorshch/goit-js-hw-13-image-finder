import './styles.css';
import { refs } from './js/refs';

import apiService from './js/apiService';

import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

refs.form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  const value = refs.input.value;
  apiService.resetPage();
  clear();
  apiService
    .getFetch(value, refs.listGallery)
    .then(total => {
      const { stillItem, totalHits } = total;
      showMore(stillItem, totalHits);
    })
    .catch(console.error);
}

function clear() {
  refs.boxBtn.classList.add('is-hidden');
  return (refs.listGallery.innerHTML = '');
}

function nexPage() {
  apiService.setPage();
  apiService.getFetch(undefined, refs.listGallery).then(total => {
    const { stillItem, totalHits } = total;
    showMore(stillItem, totalHits);
    window.scrollTo({
      top: window.document.scrollingElement.scrollHeight,
      behavior: 'smooth',
    });
  });
}

function showMore(still, total) {
  const number = total - still;
  if (number > 0) {
    refs.boxBtn.classList.remove('is-hidden');
    refs.buttomMore.addEventListener('click', nexPage);
  }
  if (number <= 0) {
    alert({
      text: 'These are all the pictures you requested!',
    });
    refs.boxBtn.classList.add('is-hidden');
  }
}

refs.listGallery.addEventListener('click', event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const originalImg = event.target.dataset.source;
  const instance = basicLightbox.create(`
     <img src="${originalImg}" width="cover">`);
  instance.show();
});
