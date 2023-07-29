import SearchResultsPage from "./searchResult.po";

//This is the Page Object for the main page of the application/Website. It contains all the elements and methods for the main page.
const searchPage = new SearchResultsPage();

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
   * Execute search query on maax.com website using Search Object
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
        searchPage.loadMoreButton.shouldContainText(
          searchDetails.productCount - 12
        );
      }
    }
    return this;
  }

  /**
   * Execute search query on maax.com website with Text Input
   * @param {*} searchText
   * @param {*} productCount expected product count
   */
  performSearchWithText(searchText, productCount) {
    this.searchInput
      .click({ waitForAnimations: false })
      .scrollIntoView()
      .type(searchText, { force: true });
    this.autoSuggestList
      .filter(":visible")
      .should("have.length", productCount > 3 ? 5 : productCount + 2); //verify the number of auto-suggest items displayed
    this.searchInput.type("{enter}", { force: true });

    //verify the search results and max 12 products are displayed initally
    if (productCount > 12) {
      searchPage.productList.should("have.length", 12);
      searchPage.loadMoreButton.should("exist");
    } else {
      searchPage.productList.should("have.length", productCount);
      searchPage.loadMoreButton.should("not.exist");
    }

    return this;
  }
}

export default MaaxMainPage;
