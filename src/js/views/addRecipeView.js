import View from "./view.js";
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _parentEl = document.querySelector(".upload");

  _modalWindow = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpenModal = document.querySelector(".nav__btn--add-recipe");
  _btnCloseModal = document.querySelector(".btn--close-modal");
  _message = "The Recipe is Successfully Uploaded :)"

  constructor() {
    super();
    this._addHandlerShowModal();
    this._addHandlerHideModal()
  }

  toggleWindow() {
    this._modalWindow.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _addHandlerShowModal() {
    this._btnOpenModal.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideModal() {
    this._btnCloseModal.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr)
      handler(data);
    })
  }

  _generateMarkup() { }

}

export default new addRecipeView();