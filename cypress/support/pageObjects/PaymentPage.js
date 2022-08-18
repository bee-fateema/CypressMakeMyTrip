class PaymentPage {
  constructor() {}

  verifyTotalAmount(totalAmount) {
    cy.get('div[class="fare__summary__card append-bottom20 font14"]').contains(
      "Total Due"
    );
    cy.get("span.push-right.rupees", { timeout: 8000 })
      .should("be.visible")
      .last()
      .scrollIntoView()
      .should((total) => {
        const amount = total.text();
        expect(amount).to.equal(totalAmount);
      });
  }
}
export default PaymentPage;
