import View from "./view.js";
import previewView from "./previewViews.js";
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _message = "";
  _errMsg = 'No recipe found for your Query. Please Try Again!';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join("");
  }
}

export default new ResultsView();