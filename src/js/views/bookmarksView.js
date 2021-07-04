import View from "./view.js";
import previewView from "./previewViews.js";
import icons from 'url:../../img/icons.svg';

class bookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _message = "";
  _errMsg = 'No bookmarks yet. Select a nice recipe and bookmark it!';

  addHandlerBookmarks(handler) {
    window.addEventListener("load", function () {
      handler();
    })
  }
  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false)).join("");
  }

}

export default new bookmarksView();