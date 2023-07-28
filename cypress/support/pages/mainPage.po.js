//This is the Page Object for the main page of the application. It contains all the elements and methods for the main page.
class MaaxMainPage{

    get searchInput(){
        return cy.get('input.search-input');
    }

    get rejectAllCookiesButton(){
        return cy.get('#onetrust-reject-all-handler');
    }
    
    get acceptAllCookiesButton(){
        return cy.get('#onetrust-accept-btn-handler');
    }

    get autoSuggestList(){
        return cy.get('ul[role="listbox"] > li');
    
    }


}

export default MaaxMainPage