import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMsg();
    this._data = data;
    const markup = this._generateMarkup();

    // REVIEW: WHY RENDER SHOULD BE TRUE ?
    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const currElements = Array.from(this._parentEl.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      // CHANGE ELEMENT TEXT
      if (!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        currEl.textContent = newEl.textContent;
      }

      // CHANGE ATTRIBUTE VALUE
      if (!newEl.isEqualNode(currEl[i])) {
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        })
      }

    })

  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
    </div> `
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderErrorMsg(message = this._errMsg) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderMsg(message = this._message) {
    const markup = `
     <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

}