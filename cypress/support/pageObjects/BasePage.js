///<reference types="cypress"/>
class BasePage {
  constructor() {}
  visitHomePage() {
    return cy.visit(Cypress.env("url"), {
      headers: { "Accept-Encoding": "gzip,deflate" },
    });
  }
  selectTab(tab) {
    switch (tab) {
      case "Flights":
        cy.forceClick('[data-cy="menu_Flights"] > div > .makeFlex');
        break;
      case "Hotels":
        cy.forceClick('[data-cy="menu_Hotels"] > div > .makeFlex');
        break;
      case "Trains":
        cy.forceClick('[data-cy="menu_Trains"] > div > .makeFlex');
        break;
      case "Cabs":
        cy.forceClick('[data-cy="menu_Cabs"] > div > .makeFlex');
        break;
      default:
        cy.log("Invalid selection!!!");
        break;
    }
  }

  enterReservationDetails(dataName, dataValue) {
    switch (dataName) {
      case "city":
        cy.get('div[class="hsw_inputBox selectHtlCity  "] ').click();
        cy.get('input[placeholder="Enter city/ Hotel/ Area/ Building"]')
          .focus()
          .clear()
          .type(dataValue.slice(0, 3))
          .should("have.value", dataValue.slice(0, 3));
        cy.wait(1000);
        cy.get(
          "div[id='react-autowhatever-1'] ul[role='listbox'] p[class='locusLabel appendBottom5']"
        ).each((element, index, list) => {
          const placeText = element.text();
          cy.log(placeText + " - ");
          if (placeText.includes(dataValue)) {
            cy.wrap(element).click({ force: true });
            return false;
          }
        });
        break;
      case "checkInDate":
        cy.forceClick(
          'div[aria-label="' + dataValue + '"][aria-disabled="false"]'
        );
        break;
      case "checkOutDate":
        cy.forceClick(
          'div[aria-label="' + dataValue + '"][aria-disabled="false"]'
        );
        break;
      case "adults":
        cy.get('ul[data-cy="adultCount"] li').each((element, index, list) => {
          const adultCount = element.text();
          cy.log(adultCount + " - ");
          if (adultCount.includes(dataValue)) {
            cy.wrap(element).click({ force: true });
            return false;
          }
        });
        cy.forceClick('button[data-cy="submitGuest"]');
        break;
      default:
        cy.log("Invalid Column name!!!");
        break;
    }
  }
  SearchBtn() {
    cy.forceClick("button[id='hsw_search_button']");
  }
}

export default BasePage;
