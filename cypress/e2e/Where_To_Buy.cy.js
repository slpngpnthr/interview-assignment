import MaaxMainPage from "../support/pages/mainPage.po";
import SearchResultsPage from "../support/pages/searchResult.po";

const mainPage = new MaaxMainPage();
const searchPage = new SearchResultsPage();

describe('MAAX Website - Search for Product', () => {
    beforeEach(() => {
        // Visit the MAAX website
      cy.visitMaaxUSA();
      mainPage.acceptAllCookiesButton.click();
    });
  
    it.only('should display authorized dealers in user location', () => {
      // Click on the 'Where to Buy' section
      cy.visitMaaxUSA('where-to-buy');
  
      
    });
  });
  