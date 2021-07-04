import View from "./view.js";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }

  _generateMarkup() {
    const totalPage = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const currPage = this._data.page;

    // For Page 1 and Other Pages
    if (currPage === 1 && totalPage > 1) {
      return `
          <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `
    }

    // For Other Pages
    if (currPage < totalPage) {
      return `
         <button data-goto="${currPage - 1}"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button data-goTo="${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `
    }

    //For Last Page
    if (currPage === totalPage && totalPage > 1) {
      return `
         <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
      `
    }

    // For Page 1 and No Other Pages
    return "";
  }
}

export default new PaginationView();