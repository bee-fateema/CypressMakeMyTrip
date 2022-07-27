class PaymentPage {
  constructor() {}

  verifyDetails() {}
  verifyTotalAmount(totalAmount) {
    var totalA;
    cy.get('div[class="fare__summary__card append-bottom20 font14"]').contains(
      "Total Due"
    );
    cy.get("span.push-right.rupees", { timeout: 8000 })
      .should("be.visible")
      .last()
      .scrollIntoView()
      .should((total) => {
        const amount = total.text();
        // totalA = amount.split(",");
        // amount = totalA[0] + totalA[1];
        expect(amount).to.equal(totalAmount);
      });
  }
}
export default PaymentPage;
