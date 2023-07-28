import SearchResultsPage from "./searchResult.po";

//This is the Page Object for the main page of the application. It contains all the elements and methods for the main page.
const searchPage = new SearchResultsPage
class MaaxMainPage { 

  get searchInput() {
    return cy.get("input.search-input");
  }

  get rejectAllCookiesButton() {
    return cy.get("#onetrust-reject-all-handler");
  }

  get acceptAllCookiesButton() {
    return cy.get("#onetrust-accept-btn-handler");
  }

  get autoSuggestList() {
    return cy.get('ul[role="listbox"] > li');
  }

  /**
   * Execute search query on maax.com website
   * @param {*} searchDetails
   */
  performSearch(searchDetails) {
    cy.visitMaaxUSA(`search?query=${searchDetails.keyword}`);
    cy.waitForLoader();
    //Verify Search Result - product count
    if (searchDetails.productCount > 0) {
      searchPage.contentTab.shouldBeVisible();

      searchPage.productTab.shouldContainText(searchDetails.productCount);

      if (searchDetails.productCount > 12) {
        searchPage.productList.should("have.length", 12);
        searchPage.loadMoreButton
          .shouldContainText(searchDetails.productCount - 12)
          
      }
    }
    return this;
  }

 
}

export default MaaxMainPage;
