import galleryTemplates from '../templates/list-gallery.hbs';

export default {
  numberPage: 1,
  perPage: 12,
  query: '',
  baseUrl: 'https://pixabay.com/api',
  get queryValue() {
    return this.query;
  },
  set queryValue(value) {
    return (this.query = value);
  },

  getFetch(value = this.query, place) {
    const key = '19751292-965c9c846fbf6e6404fcbc895';
    this.queryValue = value;
    const url = `${this.baseUrl}/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.numberPage}&per_page=${this.perPage}&key=${key}`;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        const { hits, totalHits } = data;
        const stillItem = this.numberPage * this.perPage;
        const markup = galleryTemplates(hits);
        place.insertAdjacentHTML('beforeend', markup);

        return { stillItem, totalHits };
      });
  },
  setPage() {
    this.numberPage += 1;
    return this.numberPage;
  },
  resetPage() {
    this.numberPage = 1;
    return this.numberPage;
  },
};
