class HotelPage {
  constructor() {}
  selectAndVerifyHotelPrice(hotelName) {
    var hotelPrice;
    // selecting the hotel
    cy.get("div[class='listingRowOuter hotelTileDt makeRelative ']", {
      timeout: 60000,
    })
      .should("be.visible")
      .each((element, index, list) => {
        const hotelText = element.find("span[class='wordBreak']").text();
        if (hotelText.includes(hotelName)) {
          hotelPrice = element.find("p[id='hlistpg_hotel_shown_price']").text();
          cy.wrap(element)
            .find("a")
            .invoke("removeAttr", "target")
            .click({ force: true });
        }
      });
    // verifying the hotel name and price
    cy.get("div[id='root']").then((body) => {
      if (body.find('div[class="prmProperty"] h1').length) {
        cy.get('div[class="prmProperty"] h1').should("include.text", hotelName);
        cy.get("div[class='makeFlex']").each((element, index, list) => {
          const hotelPriceInPage = element
            .find("p[class='font20 blackText latoBlack']")
            .text();
          // expect(hotelPrice).to.equal(hotelPriceInPage);
        });
      }
      if (body.find('span[data-testid="phName"]').length) {
        cy.get('span[data-testid="phName"]').should("include.text", hotelName);
        cy.get('div[class="bkng   "]').each((element, index, list) => {
          const hotelPriceInPage = element
            .find('span[class="bkng__salePricing"]')
            .text();
          expect(hotelPrice).to.equal(hotelPriceInPage);
        });
      }
    });
  }
  getBookNowBtn() {
    cy.get("div[id='root']").then((body) => {
      if (body.find("a[class='primaryBtn ']").length) {
        cy.get("a[class='primaryBtn ']").scrollIntoView().trigger("click");
        // const clickEventHandlerMock = cy.spy();
        // cy.get("a[class='primaryBtn ']").then((input) => {
        //   input.on("click", clickEventHandlerMock);
        // });
      }
      if (body.find('button[id="detpg_headerright_book_now"]').length) {
        cy.get("button[id='detpg_headerright_book_now']").click({
          force: true,
        });
      }
    });
  }
  selectRoom(roomType, roomCategory) {
    cy.get('div[class="rmSelect__card--wrapRow"]').each(
      (element1, index1, list) => {
        const roomTypeText = element1
          .find('h2[class="rmType__roomName"]')
          .text();
        // cy.log(roomTypeText);
        if (roomTypeText.includes(roomType)) {
          // cy.log(roomTypeText + " - " + roomType);
          cy.get('div[class="rmSelect__card--right"]')
            .eq(index1)
            .find("div[class='rmSelect__card--row ']")
            .each((element2, index2, list) => {
              const roomText = element2
                .find('h3[class="rmRatePlan__heading"]')
                .text();
              if (roomText.includes(roomCategory)) {
                cy.log(roomText);
                cy.get('div[class="rmSelect__card--right"]')
                  .eq(index1)
                  .find(
                    "div[class='rmSelect__card--row '] div[class=\"rmPayable \"] a[data-testid]"
                  )
                  .eq(index2)
                  .scrollIntoView()
                  .should("be.visible")
                  .invoke("show")
                  .click({ force: true });
                cy.wait(3000);
                return false;
              }
            });
        }
      }
    );
  }
}
export default HotelPage;
