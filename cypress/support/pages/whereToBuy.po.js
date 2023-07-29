import SearchResultsPage from "./searchResult.po";

//This is the Page Object for the main page of the application. It contains all the elements and methods for the main page.
const searchPage = new SearchResultsPage();

class WhereToBuyPage {
  get addressInput() {
    return cy.get("#geocoder input[type='text']");
  }
  get dealerCount() {
    return cy.get("span.count");
  }
  get dealerList() {
    return cy.get("div.store-card.card");
  }
  get nextPageButton() {
    return cy.get("button.next-page");
  }
  get previousPageButton() {
    return cy.get("button.prev-page");
  }
  get getMyLocationButton() {
    return cy.get("button.btn-location");
  }
  get storePhoneNumber() {
    return cy.get("a.tel.label");
  }
  get storePhoneNumber() {
    return cy.get("a.tel.label");
  }
  get storeAddress() {
    return cy.get("div.address");
  }
  get storeDistance() {
    return cy.get("div.distance > span");
  }
  get storeName() {
    return cy.get("div.card-title");
  }

  /**
   * Verify the Store Details displayed in the Where to Buy page
   * @param {*} storeDetails
   */
  verifyStoreDetails(storeDetails) {
    cy.get(`#${storeDetails.storePhone}`).within(() => {
      this.storeAddress.shouldContainText(storeDetails.storeAddress1);
      this.storeAddress.shouldContainText(storeDetails.storeAddress2);
      this.storeDistance.shouldContainText(storeDetails.distance);
      this.storeName.shouldContainText(storeDetails.storeName);
    });
  }
}

export default WhereToBuyPage;
