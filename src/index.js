import './styles.css';
import { refs } from './js/refs';

import apiService from './js/apiService';

import * as basicLightbox from 'basiclightbox';

refs.form.addEventListener('submit', submitForm);

async function submitForm(event) {
  event.preventDefault();
  const value = refs.input.value;
  apiService.resetPage();
  clear();
  apiService.getFetch(value, refs.listGallery);
  refs.buttomMore.classList.remove('is-hidden');
  refs.buttomMore.addEventListener('click', nexPage);
}

function clear() {
  return (refs.listGallery.innerHTML = '');
}

function nexPage() {
  apiService.setPage();
  setTimeout(() => {
    window.scrollTo({
      top: refs.listGallery.scrollHeight,
      behavior: 'smooth',
    });
  }, 500);
  apiService.getFetch(undefined, refs.listGallery);
}
