///<reference types="cypress"/>
import dayjs from "dayjs";
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
      case "Hotels":
      case "Homestays":
      case "Buses":
      case "Trains":
      case "Cabs":
      case "Forex":
        cy.forceClick('[data-cy="menu_' + tab + '"] > div > .makeFlex');
        break;
      case "Holiday Packages":
        cy.forceClick('[data-cy="menu_Holidays"] > div > .makeFlex');
        break;
      default:
        cy.log("Invalid selection!!!");
        break;
    }
  }

  enterReservationDetails(dataName, dataValue) {
    var newdate, dateType, formattedCheckInDate, formattedCheckOutDate;
    switch (dataName) {
      case "city":
        cy.get('div[class="hsw_inputBox selectHtlCity  "] ')
          .invoke("show")
          .should("be.visible")
          .click();
        cy.get('input[placeholder="Enter city/ Hotel/ Area/ Building"]')
          .focus()
          .clear()
          .type(dataValue.slice(0, 3));
        cy.wait(1000);
        cy.get(
          "div[id='react-autowhatever-1'] ul[role='listbox'] p[class='locusLabel appendBottom5']"
        )
          .should("be.visible")
          .each((element, index, list) => {
            const placeText = element.text();
            cy.log(placeText + " - ");
            if (placeText.includes(dataValue)) {
              cy.wrap(element).click({ force: true });
              return false;
            }
          });
        break;
      case "checkInDate & Nights":
        //get checkin date
        dateType = dataValue.split(" ");
        newdate = this.getDateOfBooking(dateType[0], dateType[1]);
        formattedCheckInDate = dayjs(newdate);
        cy.forceClick(
          'div[aria-label="' +
            formattedCheckInDate.format("ddd MMM DD YYYY") +
            '"][aria-disabled="false"]'
        );
        //get checkout date
        formattedCheckOutDate = this.getCheckOutDate(newdate, dateType[3]);
        cy.forceClick(
          'div[aria-label="' +
            formattedCheckOutDate +
            '"][aria-disabled="false"]'
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
  getDateOfBooking(number, type) {
    /* 
    Get the checkin date by the 
    number of weeks/days from current date 
    */
    var newdate = new Date();
    cy.log("CheckInDate: " + newdate);
    switch (type) {
      case "weeks":
        newdate.setDate(newdate.getDate() + number * 7);
        return (
          newdate.getFullYear() +
          "-" +
          (newdate.getMonth() + 1) +
          "-" +
          newdate.getDate()
        );

      case "days":
        newdate.setDate(newdate.getDate() + number);
        return (
          newdate.getFullYear() +
          "-" +
          (newdate.getMonth() + 1) +
          "-" +
          newdate.getDate()
        );
    }
  }
  getCheckOutDate(CheckInDate, number) {
    /* 
    Get the checkout date using the 
    checkin date and adding the number of
    nights to spend in the hotel
    */
    var splitDate = CheckInDate.split("-");
    var newdate1 = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
    newdate1.setDate(newdate1.getDate() + Number(number));
    var checkOut = dayjs(
      newdate1.getFullYear() +
        "-" +
        (newdate1.getMonth() + 1) +
        "-" +
        newdate1.getDate()
    );
    return checkOut.format("ddd MMM DD YYYY");
  }
}

export default BasePage;
