import * as model from './model';
import { MODAL_CLOSE_TIMEOUT } from './config';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';


import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // TODO: RENDERING SPINNER TO THE INDEX HTML (RECIPE VIEW)
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    // TODO: GETTING RECIPE FROM API (MODEL)
    await model.loadRecipe(id);

    // TODO: RENDERING RECIPE TO THE INDEX HTML (RECIPE VIEW)
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
    // TODO: UPDATE BOOKMARKS
    bookmarksView.update(model.state.bookmarks);

  } catch (err) {
    console.log(err.message);
    console.error(err);
    recipeView.renderErrorMsg();
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // STEP: GET QUERY FROM (SEARCH VIEW)
    const query = searchView.getQuery();
    if (!query) return;

    // STEP: LOAD SEARCH QUERY
    await model.loadSearchResults(query);

    // STEP: RENDER SEARCH RESULT
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  // UPDATE RECIPE SERVING ON STATE
  model.updateServings(newServings);

  // UPDATING TO THE RECIPE VIEW
  recipeView.update(model.state.recipe);

}

const controlBookmarks = function () {
  // 1) ADD OR REMOVE BOOKMARK
  if (!model.state.recipe.bookmarked)
    model.addBookmarks(model.state.recipe)
  else
    model.deleteBookmarks(model.state.recipe.id)

  // 2) UPDATE RECIPE VIEW
  recipeView.update(model.state.recipe);

  // 2) SHOW ALL BOOKMARKS LIST
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarksLoading = function () {
  bookmarksView.render(model.state.bookmarks)
}


const controlAddRecipe = async function (recipeData) {
  try {

    addRecipeView.renderSpinner();

    // UPLOAD RECIPE
    await model.uploadRecipe(recipeData);
    console.log(model.state.recipe)

    // SHOW RECIPE
    recipeView.render(model.state.recipe);

    // SUCCESS MESSAGE
    addRecipeView.renderMsg();

    // RE RENDER BOOKMARKS
    bookmarksView.render(model.state.bookmarks);

    // SETTING ID ON URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // CLOSE UPLOAD TOGGLE
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_TIMEOUT * 1000);



  } catch (err) {
    addRecipeView.renderErrorMsg(err);
  }
}

const init = function () {
  bookmarksView.addHandlerBookmarks(controlBookmarksLoading);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log("mama")
}

init();




