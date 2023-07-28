// sample-test.spec.js
import MaaxMainPage from "../support/pages/mainPage.po";
import SearchResultsPage from "../support/pages/searchResult.po";

const mainPage = new MaaxMainPage();
const searchPage = new SearchResultsPage();
let productList = [];
describe("MAAX Website - Search for Product", () => {
  before(() => {
    cy.fixture("productDetails").then((data) => {
      productList = data.products;
    });
  });

  beforeEach(() => {
    // Visit the MAAX website
    cy.visitMaaxUSA();
    mainPage.acceptAllCookiesButton.click();
  });

  it.only("Search for a single Product and verify product details", () => {
    productList.forEach((product) => {
      cy.visitMaaxUSA();
     
      //Search by Product ID
      mainPage.searchInput
        .click({ waitForAnimations: false })
        .scrollIntoView()
        .type(product.sku, { force: true });
      mainPage.autoSuggestList
        .filter(":visible")
        .should("have.length", 3)        
        mainPage.searchInput
      .type('{enter}',{force: true});

      searchPage.verifyProductDetails(product);

      //Search by Product NAme
      //ASSUMPTION: The prodcut will be displayed/listed 
      //            within the first 12 product listed in search results,  
      cy.visitMaaxUSA();
      mainPage.searchInput
        .click({ waitForAnimations: false })
        .scrollIntoView()
        .type(product.name, { force: true });
      mainPage.autoSuggestList
        .filter(":visible")
        .should("have.length", 5)        
        mainPage.searchInput
      .type('{enter}',{force: true});

      searchPage.verifyProductDetails(product);
    });
  });

  it("Search for single prodcut and verify product details", () => {
    mainPage.searchInput
      .click({ waitForAnimations: false })
      .scrollIntoView()
      .type("Utile 6030 Wall", { force: true });

    //title + 3 products + View More link
    mainPage.autoSuggestList.filter(":visible").should("have.length", 5);
    //.type('{enter}',{force: true});
  });
});
