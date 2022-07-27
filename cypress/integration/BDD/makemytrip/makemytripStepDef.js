"use strict";
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import BasePage from "../../../support/pageObjects/BasePage";
import HotelPage from "../../../support/pageObjects/HotelPage";
import HotelListPage from "../../../support/pageObjects/HotelListPage";
import ReviewBookingPage from "../../../support/pageObjects/ReviewBookingPage";
import PaymentPage from "../../../support/pageObjects/PaymentPage";

const basePage = new BasePage();
const hotelPage = new HotelPage();
const hotelListPage = new HotelListPage();
const reviewBookingPage = new ReviewBookingPage();
const paymentPage = new PaymentPage();
var totalAmount;
let roomType,
  roomCategory,
  hotelName,
  title,
  firstname,
  lastname,
  emailId,
  mobileNo,
  dataValue;

Given("I open MakeMyTrip page", () => {
  basePage.visitHomePage();
});
When("I select {string} tab", (tab) => {
  basePage.selectTab(tab);
});
And("enter reservation details", (dataTable) => {
  dataTable.hashes().forEach((element) => {
    for (var dataName in element) {
      dataValue = element[dataName];
      basePage.enterReservationDetails(dataName, dataValue);
    }
  });
});
And("select search button", () => {
  basePage.SearchBtn();
});
Then("verify details", (dataTable) => {
  dataTable.hashes().forEach((element) => {
    for (var dataName in element) {
      dataValue = element[dataName];
      hotelListPage.verifyBookingDetails(dataName, dataValue);
    }
  });
});
When("I choose filter", (dataTable) => {
  dataTable.hashes().forEach((element) => {
    for (var dataName in element) {
      dataValue = element[dataName];
      hotelListPage.selectFilters(dataValue);
    }
  });
});
Then("select hotel and verify hotel details", (dataTable) => {
  hotelName = dataTable.rawTable[1][0];
  hotelPage.selectAndVerifyHotelPrice(hotelName);
});
When("I click BOOK THIS NOW", () => {
  hotelPage.getBookNowBtn();
});
When("I select room", { scrollBehaviour: true }, (dataTable) => {
  roomType = dataTable.rawTable[1][0];
  roomCategory = dataTable.rawTable[1][1];
  hotelPage.selectRoom(roomType, roomCategory);
});
And("enter contact information", (dataTable) => {
  title = dataTable.rawTable[1][0];
  firstname = dataTable.rawTable[1][1];
  lastname = dataTable.rawTable[1][2];
  emailId = dataTable.rawTable[1][3];
  mobileNo = dataTable.rawTable[1][4];
  reviewBookingPage.enterContactInfo(
    title,
    firstname,
    lastname,
    emailId,
    mobileNo
  );
  reviewBookingPage.getTotalAmount().then((total) => {
    const amount = total.text();
    totalAmount = amount.split(" ");
    totalAmount = totalAmount[1].trim();
  });
  cy.scrollTo("bottom");
});
And("select pay now", () => {
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
Then("verify total Due", () => {
  paymentPage.verifyTotalAmount(totalAmount);
});
