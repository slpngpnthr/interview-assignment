// Purpose: Page Object for the search results page
class SearchResultsPage {
  get productList() {
    return cy.get("div.product-list");
  }

  get productName() {
    return cy.get("span.name");
  }

  get productDimensions() {
    return cy.get("div.code");
  }

  get productId() {
    return cy.get("div.code");
  }

  get productPrice() {
    return cy.get("strong.price");
  }

  get productColorList() {
    return cy.get("div.swatch");
  }
  
  get productCharacteristics() {
    return cy.get("ul:not([class]) > li");
  }

  get product() {
    return cy.get("");
  }

  /**
   * this method verifies the product details in the search results page
   * Product details include: name, dimensions, id, price, color list
   * product card should be visible
   * @param {*} product
   **/
  verifyProductDetails(product) {
    this.productId
      .contains(product.sku)
      .parents("div.productCard")
      .within(() => {
        this.productName.shouldHaveText(product.name);
        this.productDimensions.shouldContainText(product.dimensions);
        this.productPrice.shouldContainText(product.displayPrice);
        product.colors.forEach((color) => {
            cy.get(`div.swatch[title="${color}"]`).should('be.visible');
        });
        product.characteristics.forEach((characteristic) => {
            this.productCharacteristics.contains(characteristic);
        });
      });
  }
}

export default SearchResultsPage;
