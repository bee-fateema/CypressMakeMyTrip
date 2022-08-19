import dayjs from "dayjs";
class HotelListPage {
  constructor() {}

  verifyBookingDetails(dataName, dataValue) {
    var newdate, dateType, formattedCheckInDate, formattedCheckOutDate;
    switch (dataName) {
      case "city":
        cy.get("input#city").should("have.value", dataValue);
        break;
      case "checkInDate & Nights":
        //verify checkin date
        dateType = dataValue.split(" ");
        newdate = this.getDateOfBooking(dateType[0], dateType[1]);
        formattedCheckInDate = dayjs(newdate);
        this.verifyDate("input#checkin", formattedCheckInDate);

        //verify checkout date
        formattedCheckOutDate = this.getCheckOutDate(newdate, dateType[3]);
        this.verifyDate("input#checkout", formattedCheckOutDate);
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
  selectFilters(modificationFilter) {
    cy.get('span[data-testid="checkboxFilter"]').each(
      (element, index, list) => {
        const filter = element
          .find('label div[class="makeFlex hrtlCenter"]')
          .text();
        cy.log(filter);
        if (filter.includes(modificationFilter)) {
          cy.wrap(element)
            .find("input[type='checkbox']")
            .click({ force: true })
            .should("be.checked");
          return false;
        }
      }
    );
    cy.wait(4000);
  }
  getDateOfBooking(number, type) {
    /* 
    Get the checkin date by the 
    number of weeks/days from now 
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
    checkin date and adding the number
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
    return checkOut;
  }
  checkDateFormat(date, dateFormat) {
    if (date == dateFormat.format("ddd, D MMM YYYY")) {
      return true;
    }
    return false;
  }
  verifyDate(selector, formattedDate) {
    cy.get(selector).then((element) => {
      const dateVal = element.val();
      if (this.checkDateFormat(dateVal, formattedDate)) {
        cy.get(selector).should(
          "have.value",
          formattedDate.format("ddd, D MMM YYYY")
        );
      } else {
        cy.get(selector).should(
          "have.value",
          formattedDate.format("ddd, DD MMM YYYY")
        );
      }
    });
  }
}
export default HotelListPage;
