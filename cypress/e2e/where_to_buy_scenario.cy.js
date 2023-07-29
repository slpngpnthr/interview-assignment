//reference: https://github.com/kamranayub/cypress-browser-permissions

import MaaxMainPage from "../support/pages/mainPage.po";
import WhereToBuyPage from "../support/pages/whereToBuy.po";

const mainPage = new MaaxMainPage();
const whereToBuyPage = new WhereToBuyPage();

let addressList = []; //address to search for / test
let cordinates = []; //geolocaiton cordinates to test
describe("Verify Store search via address & geolocation", () => {
  before(() => {
    cy.fixture("locationSearchDetails").then((data) => {
      addressList = data.cities; // read city details from the fixture file
      cordinates = data.cordinates; //read cordinates from the fixture file
    });
  });

  beforeEach(() => {
    // Visit the MAAX website and accept all cookies
    cy.visitMaaxUSA();
    mainPage.acceptAllCookiesButton.click();
  });

  it("Searching back to back addresses - Actual Bug (minor)", () => {
    //ISSUE/BUG: When searching for the next city, the previous  results are not cleared out

    // Proceed to  'Where to Buy' page
    cy.visitMaaxUSA("where-to-buy");
    addressList.forEach((address) => {
      whereToBuyPage.addressInput.clear().type(address.cityName + "{enter}");
      whereToBuyPage.dealerCount.shouldContainText(address.storeCount);

      if (address.storeCount > 6) {
        whereToBuyPage.nextPageButton.click({ force: true });
        whereToBuyPage.dealerList.should("have.length", 6);
      } else
        whereToBuyPage.dealerList.should("have.length", address.storeCount);
    });
  });

  it("Find Store using GeoLocation and verify store details on first Page", () => {
    // updates geolocation in the browser and click on get My Location button
    //reference: https://filiphric.com/testing-geolocation-with-cypress
    cordinates.forEach((storeLocation) => {
      //
      cy.visit("https://maax.com/where-to-buy", {
        onBeforeLoad({ navigator }) {
          //
          const latitude = storeLocation.latitude;
          const longitude = storeLocation.longitude;
          cy.stub(navigator.geolocation, "getCurrentPosition").callsArgWith(0, {
            coords: { latitude, longitude },
          });
        },
      });
      whereToBuyPage.getMyLocationButton.click();
      whereToBuyPage.dealerCount.shouldContainText(storeLocation.storeCount);

      //if there are more than 6 stores, verify only 6 stores are displayed on the first page
      if (storeLocation.storeCount > 6) {
        whereToBuyPage.nextPageButton.click({ force: true });
        whereToBuyPage.dealerList.should("have.length", 6);
      } else
        whereToBuyPage.dealerList.should(
          "have.length",
          storeLocation.storeCount
        );

      //verify store details for each store dsiplayed on the first page (closest to the location)
      storeLocation.stores.forEach((store) => {
        whereToBuyPage.verifyStoreDetails(store);
      });
    });
  });
});
