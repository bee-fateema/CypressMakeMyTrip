class HotelListPage {
  constructor() {}
  selectFilters(modificationFilter) {
    cy.get('label div[class="makeFlex hrtlCenter"]').each(
      (element, index, list) => {
        const filter = element.text();
        if (filter.includes(modificationFilter))
          cy.wrap(element).click({ force: true });
      }
    );
    cy.wait(4000);
  }
  verifyBookingDetails(dataName, dataValue) {
    switch (dataName) {
      case "city":
        cy.get("input#city").should("have.value", dataValue);
        break;
      case "checkInDate":
        cy.get("input#checkin").should("have.value", dataValue);
        break;
      case "checkOutDate":
        cy.get("input#checkout").should("have.value", dataValue);
        break;
      case "adults":
        cy.get("input#guest").should(
          "have.value",
          "1 Room, " + dataValue + " Adult"
        );
        break;
      default:
        cy.log("Invalid Column name!!!");
        break;
    }
  }
}
export default HotelListPage;
