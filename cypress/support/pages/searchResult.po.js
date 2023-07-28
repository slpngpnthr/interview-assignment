// Purpose: Page Object for the search results page
class SearchResultsPage {
  get productTab() {
    return cy.get("li[id*='react-tabs']").eq(0);
  }

  get contentTab() {
    return cy.get("li[id*='react-tabs']").eq(1);
  }

  get productSortDropdown() {
    return cy.get("#product-sort");
  }

  get loadMoreButton() {
    return cy.get("button.btn-more.load-more");
  }

  get productList() {
    return cy.get("div.product-card");
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

  //#region Filters
  get productCategoryFilter() {
    return cy.contains("a", "Product Category");
  }
  get productSeriesFilter() {
    return cy.contains("a", "Product Series");
  }
  get productFrameFinishFilter() {
    return cy.contains("a", "Frame Finish");
  }

  get selectedFilterList() {
    return cy.get("button.tag.facet");
  }

  //#endregion

  /**
   * Select / Unselect filter in Product Category filter group
   * IMPROVE: add multiple filters selection, 
   * @param {*} filter
   
   */
  setProductCategoryFilter(filter) {
    //CHALLENGE: I had to try different ways for selecting the filter checkbox,
    //           because page could not be scrolled to the filter checkbox
    cy.get(`input[id='productfields.product_category${filter}']`)
      .scrollIntoView({ behavior: "instant" })
      .check({ force: true });
    //});
    cy.waitForLoader();
  }

  /**
   * Select / Unselect filter in Product Series filter group
   * IMPROVE: add multiple filters selection,
   * @param {*} filter
   */
  setProductSeriesFilter(filter) {
    cy.get(`input[id='productlookups.series.internal_value${filter}']`)
      .scrollIntoView({ behavior: "instant" })
      .check({ force: true });
    //});
    cy.waitForLoader();
  }

  /**
   * Load all products from search results, by clicking Load button
   * IMPROVE: calculate the number of clicks needed to load all products
   * @param {*} productCount
   */
  loadAllProducts(productCount) {
    this.loadMoreButton
      .shouldContainText(productCount - 12)
      .scrollIntoView()
      .click();
    cy.waitForLoader();
    this.productList.should("have.length", productCount);
    this.loadMoreButton.should("not.exist");
    return this;
  }

  /**
   * Remove all filters from the search results page
   */
  clearFilters() {
    this.selectedFilterList
      .scrollIntoView()
      .click({ multiple: true, force: true });
    this.selectedFilterList.should("not.exist");
    return this;
  }

  /**
   * this method verifies the product details in the search results page
   * Product details include: name, dimensions, id, price, color list
   * product card should be visible
   * @param {*} product
   **/
  verifyProductDetails(product) {
    this.productId
      .contains(product.productId)
      .parents("div.productCard")
      .within(() => {
        this.productName.shouldHaveText(product.name);
        this.productDimensions.shouldContainText(product.dimensions);
        this.productPrice.shouldContainText(product.displayPrice);
        product.colors.forEach((color) => {
          cy.get(`div.swatch[title="${color}"]`).should("be.visible");
        });
        product.characteristics.forEach((characteristic) => {
          this.productCharacteristics.contains(characteristic);
        });
      });
  }
}

export default SearchResultsPage;
