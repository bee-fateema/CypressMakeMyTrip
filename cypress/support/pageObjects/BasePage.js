///<reference types="cypress"/>
class BasePage {
  constructor() {}
  visitHomePage() {
    return cy.visit(Cypress.env("url"), {
      headers: { "Accept-Encoding": "gzip,deflate" },
    });
  }
  selectTab(tab) {
    if (tab === "Flights")
      cy.forceClick('[data-cy="menu_Flights"] > div > .makeFlex');
    else if (tab === "Hotels")
      cy.forceClick('[data-cy="menu_Hotels"] > div > .makeFlex');
    else if (tab === "Trains")
      cy.forceClick('[data-cy="menu_Trains"] > div > .makeFlex');
    else if (tab === "Cabs")
      cy.forceClick('[data-cy="menu_Cabs"] > div > .makeFlex');
  }
  enterReservationDetails(city, checkInDate, checkOutDate, adults) {
    cy.get('div[class="hsw_inputBox selectHtlCity  "] ').click();
    cy.get('input[placeholder="Enter city/ Hotel/ Area/ Building"]')
      .wait(0)
      .focus()
      .clear()
      .type(city.slice(0, 3))
      .should("have.value", city.slice(0, 3));
    cy.wait(2000);
    cy.get(
      "div[id='react-autowhatever-1'] ul[role='listbox'] p[class='locusLabel appendBottom5']"
    ).each((element, index, list) => {
      const placeText = element.text();
      cy.log(placeText + " - ");
      if (placeText.includes(city)) {
        cy.wrap(element).click();
        return false;
      }
    });
    cy.forceClick(
      'div[aria-label="' + checkInDate + '"][aria-disabled="false"]'
    );
    cy.forceClick(
      'div[aria-label="' + checkOutDate + '"][aria-disabled="false"]'
    );
    cy.get('ul[data-cy="adultCount"] li').each((element, index, list) => {
      const adultCount = element.text();
      cy.log(adultCount + " - ");
      if (adultCount.includes(adults)) {
        cy.wrap(element).click();
        return false;
      }
    });
    cy.get('button[data-cy="submitGuest"]').click({ force: true });
  }
  SearchBtn() {
    cy.get("button[id='hsw_search_button']").click({ force: true });
  }
}

export default BasePage;
