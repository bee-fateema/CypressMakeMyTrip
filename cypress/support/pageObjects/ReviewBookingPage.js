class ReviewBookingPage {
  constructor() {}
  getPayNowBtn() {
    return cy.get("a[class='btnContinuePayment primaryBtn capText  ']", {
      timeout: 10000,
    });
  }
  getTotalAmount() {
    return cy.get(
      "div[class=\"prcBreakup__rht\"] p[class='latoBlack redText']"
    );
  }
  enterContactInfo(dataName, dataValue) {
    switch (dataName) {
      case "title":
        cy.get("#title", { timeout: 8000 })
          .should("be.visible")
          .scrollIntoView()
          .select(dataValue)
          .should("have.value", dataValue);
        break;
      case "firstName":
      case "lastName":
      case "email":
      case "mobileNo":
        cy.inputInfo(dataName, dataValue);
        break;
      default:
        cy.log("Invalid selection!!!");
        break;
    }
    // cy.get("#title", { timeout: 8000 })
    //   .should("be.visible")
    //   .scrollIntoView()
    //   .select(title)
    //   .should("have.value", title);
    // cy.inputInfo("#fName", firstname);
    // cy.inputInfo("#lName", lastname);
    // cy.inputInfo("#email", emailId);
    // cy.inputInfo("#mNo", mobileNo);
  }
}
export default ReviewBookingPage;
