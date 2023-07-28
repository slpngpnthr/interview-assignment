//This is the Page Object for the main page of the application. It contains all the elements and methods for the main page.
class MainPage{

    get searchInput(){
        return cy.get('input.search-input');
    }


}