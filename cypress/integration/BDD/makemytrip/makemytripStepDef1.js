// "use strict";
// import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
// import BasePage from "../../../support/pageObjects/BasePage";
// import HotelPage from "../../../support/pageObjects/HotelPage";
// import HotelListPage from "../../../support/pageObjects/HotelListPage";
// import ReviewBookingPage from "../../../support/pageObjects/ReviewBookingPage";
// import PaymentPage from "../../../support/pageObjects/PaymentPage";

// const basePage = new BasePage();
// const hotelPage = new HotelPage();
// const hotelListPage = new HotelListPage();
// const reviewBookingPage = new ReviewBookingPage();
// const paymentPage = new PaymentPage();
// var totalAmount;
// let city,
//   checkInDate,
//   checkOutDate,
//   adults,
//   modificationFilter,
//   hotelName,
//   title,
//   firstname,
//   lastname,
//   emailId,
//   roomType,
//   roomCategory,
//   mobileNo;

// Then("select hotel and verify hotel details", (dataTable) => {
//   hotelName = dataTable.rawTable[1][0];
//   hotelPage.selectAndVerifyHotelPrice(hotelName);
// });
// When("I click BOOK THIS NOW", () => {
//   hotelPage.getBookNowBtn();
// });
// When("I select room", { scrollBehaviour: true }, (dataTable) => {
//   roomType = dataTable.rawTable[1][0];
//   roomCategory = dataTable.rawTable[1][1];
//   hotelPage.selectRoom(roomType, roomCategory);
// });
