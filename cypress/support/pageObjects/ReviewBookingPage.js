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
  enterContactInfo(title, firstname, lastname, emailId, mobileNo) {
    cy.get("#title", { timeout: 8000 })
      .should("be.visible")
      .scrollIntoView()
      .select(title)
      .should("have.value", title);
    cy.inputInfo("#fName", firstname);
    cy.inputInfo("#lName", lastname);
    cy.inputInfo("#email", emailId);
    cy.inputInfo("#mNo", mobileNo);
  }
}
export default ReviewBookingPage;
