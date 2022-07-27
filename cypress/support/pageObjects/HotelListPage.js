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
  verifyBookingDetails(city, checkInDate, checkOutDate, adults) {
    cy.get("input#city").should("have.value", city);
    cy.get("input#checkin").should("have.value", checkInDate);
    cy.get("input#checkout").should("have.value", checkOutDate);
    cy.get("input#guest").should("have.value", "1 Room, " + adults + " Adult");
  }
}
export default HotelListPage;

// selectHotel() {
//   var hotelPrice;
//   cy.get("div[class='listingRowOuter hotelTileDt makeRelative ']").each(
//     (element, index, list) => {
//       const hotelText = element.find("span[class='wordBreak']").text();
//       if (hotelText.includes("Ambassador Hotel")) {
//         hotelPrice = element.find("p[id='hlistpg_hotel_shown_price']").text();
//         cy.wrap(element)
//           .find("a")
//           .invoke("removeAttr", "target")
//           .click({ force: true });
//       }
//     }
//   );
//   return hotelPrice;
// }

/*To Try?
  - multiple modification filters */
