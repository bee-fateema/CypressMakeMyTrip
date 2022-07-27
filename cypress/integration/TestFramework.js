/// <reference types = "Cypress" />
"use strict";

import BasePage from "../support/pageObjects/BasePage";
import HotelPage from "../support/pageObjects/HotelPage";
import HotelListPage from "../support/pageObjects/HotelListPage";
import ReviewBookingPage from "../support/pageObjects/ReviewBookingPage";
import PaymentPage from "../support/pageObjects/PaymentPage";

describe("Booking Hotel Reservation", { scrollBehavior: false }, () => {
  const basePage = new BasePage();
  const hotelPage = new HotelPage();
  const hotelListPage = new HotelListPage();
  const reviewBookingPage = new ReviewBookingPage();
  const paymentPage = new PaymentPage();
  var totalAmount, totalA;

  it("Navigating to Hotel Page", () => {
    basePage.visitHomePage();
  });
  it("Select tab", () => {
    basePage.selectTab("Hotels");
  });
  it("Enter reservation details", () => {
    basePage.enterReservationDetails(
      "Goa",
      "Fri Aug 26 2022",
      "Sun Aug 28 2022",
      "1"
    );
    basePage.SearchBtn();
  });
  it("Verify reservation details", () => {
    hotelListPage.verifyBookingDetails(
      "Goa, India",
      "Fri, 26 Aug 2022",
      "Sun, 28 Aug 2022",
      "1"
    );
  });
  it("Filter search", () => {
    hotelListPage.selectFilters("Free Breakfast");
  });
  it("Select and verify hotel details", () => {
    hotelPage.selectAndVerifyHotelPrice("Riva Beach");
    hotelPage.getBookNowBtn();
  });
  it("Input contact information", () => {
    // reviewBookingPage.verifyPriceBreakUp();
    reviewBookingPage.enterContactInfo(
      "Mrs",
      "Bee",
      "Shiras",
      "bshiras@gmial.com",
      "9876543211"
    );
    reviewBookingPage.getTotalAmount().then((total) => {
      const amount = total.text();
      totalAmount = amount.split(" ");
      totalAmount = totalAmount[1].trim();
      // totalA = totalAmount.split(",");
      // totalAmount = totalA[0] + totalA[1];
    });
    cy.scrollTo("bottom");
  });
  it("Select pay now", () => {
    reviewBookingPage
      .getPayNowBtn()
      .then((element) => {
        if (element.text() === "RESERVE NOW") {
          totalAmount = "1";
        }
      })
      .scrollIntoView()
      .should("be.visible")
      .invoke("show")
      .trigger("click");
    cy.wait(3000);
  });
  it("Verifying Total Reservation Amount", () => {
    paymentPage.verifyTotalAmount(totalAmount);
  });
});
