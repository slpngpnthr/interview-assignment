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
      mainPage.performSearchWithText(product.productId, 1),
        searchPage.verifyProductDetails(product);

      //Search by Product NAme
      //ASSUMPTION: The prodcut will be displayed/listed
      //            in the first 12 product listed in search results,
      cy.visitMaaxUSA();
      mainPage.performSearchWithText(product.name, 15);
      searchPage.verifyProductDetails(product);
    });
  });

  it.only("Verify search filters - Product Category - Failed Test (Actual Bug)", () => {
    mainPage.performSearch(searchDetails);

    //#region Verify Product Category Filter
    //Verify productCategoryFilter is expanded
    searchPage.productCategoryFilter
      .parent()
      .next()
      .should("have.attr", "aria-hidden", "false");
    //select each product category filter and verify the product count
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
  });
  //#endregion Verify Product Category Filter
  it("Verify search filters - Product Series - Failed Test (Actual Bug)", () => {
    mainPage.performSearch(searchDetails);
    //#region Verify Product Series Filter
    searchPage.productSeriesFilter
      .parent()
      .next()
      .should("have.attr", "aria-hidden", "false");

    //select each product series filter and verify the product count
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
  });
});
