// sample-test.spec.js
import MaaxMainPage from "../support/pages/mainPage.po";
import SearchResultsPage from "../support/pages/searchResult.po";

const mainPage = new MaaxMainPage();
const searchPage = new SearchResultsPage();
let productList = [];
let searchDetails = {};
describe("MAAX Website - Search for Product", () => {
  before(() => {
    cy.fixture("productDetails").then((data) => {
      productList = data.products;
    });
    cy.fixture("searchDetails").then((data) => {
      searchDetails = data;
    });
  });

  beforeEach(() => {
    // Visit the MAAX website
    cy.visitMaaxUSA();
    mainPage.acceptAllCookiesButton.click();
  });

  it("Search for a single Product and verify product details", () => {
    productList.forEach((product) => {
      cy.visitMaaxUSA();

      //Search by Product ID
      mainPage.searchInput
        .click({ waitForAnimations: false })
        .scrollIntoView()
        .type(product.productId, { force: true });
      mainPage.autoSuggestList.filter(":visible").should("have.length", 3);
      mainPage.searchInput.type("{enter}", { force: true });

      searchPage.verifyProductDetails(product);

      //Search by Product NAme
      //ASSUMPTION: The prodcut will be displayed/listed
      //            within the first 12 product listed in search results,
      cy.visitMaaxUSA();
      mainPage.searchInput
        .click({ waitForAnimations: false })
        .scrollIntoView()
        .type(product.name, { force: true });
      mainPage.autoSuggestList.filter(":visible").should("have.length", 5);
      mainPage.searchInput.type("{enter}", { force: true });

      searchPage.verifyProductDetails(product);
    });
  });

  it("Verify search filters - Failed Test", () => {
    //perform search with keyword

    mainPage.performSearch(searchDetails)
    //searchPage.loadAllProducts(searchDetails.productCount);
    //cy.wait(3000);

    //#region Verify Product Category Filter
    //Verify productCategoryFilter is expanded
    searchPage.productCategoryFilter
      .parent()
      .next()
      .should("have.attr", "aria-hidden", "false");

    searchDetails.filters.productCategories.forEach((filter) => {
      searchPage.setProductCategoryFilter(filter.name);
      searchPage.productTab.shouldContainText(filter.productCount);
      
      if (filter.productCount > 12) {
        searchPage.productList.should("have.length", 12);
        searchPage.loadAllProducts(filter.productCount);
      } 
      searchPage.productList.should("have.length", filter.productCount);
      searchPage.loadMoreButton.should("not.exist");
      
      searchPage.clearFilters();
    });
    //#endregion Verify Product Category Filter
    
    //#region Verify Product Series Filter
    searchPage.productSeriesFilter
      .parent()
      .next()
      .should("have.attr", "aria-hidden", "false");
    
      searchDetails.filters.productSeries.forEach((filter) => {
        searchPage.setProductSeriesFilter(filter.name);
        searchPage.productTab.shouldContainText(filter.productCount);
        
        if (filter.productCount > 12) {
          searchPage.productList.should("have.length", 12);
          searchPage.loadAllProducts(filter.productCount);
        } 
        searchPage.productList.should("have.length", filter.productCount);
        searchPage.loadMoreButton.should("not.exist");
        
        searchPage.clearFilters();
      });

      //#endregion Verify Product Series Filter

    //verify Prodcut Category filters
  });
});
