Feature: End to End Hotel Booking Validaiton

    Background: Before Each
        Given I open MakeMyTrip page
        When I select "Hotels" tab

    Scenario: Booking hotel 
        And enter reservation details
        |city   |checkInDate & Nights|adults |
        |Bangkok|4 weeks & 1         |1      |
        And select search button 
        Then verify details
        |city               |checkInDate & Nights|adults |
        |Bangkok, Thailand  |4 weeks & 1         |1      |
        When I choose filter
        |modificationFilter |
        |4 Star             |
        Then select hotel and verify hotel details
        |hotelName|
        |Ambassador|
        When I click BOOK THIS NOW
        And enter contact information
        |title  |firstName  |lastName   |email              |mobileNo   |
        |Mrs    |Bee        |Shiras     |bshiras@gmail.com  |9876543219 | 
        And select pay now
        Then verify total Due

    # Scenario: Booking hotel with specific room selection
    #     And enter reservation details
    #     |city   |checkInDate    |checkOutDate   |adults|
    #     |Goa    |Fri Aug 26 2022|Sat Aug 27 2022|1     |
    #     And select search button 
    #     Then verify details
    #     |city      |checkInDate     |checkOutDate    |adults|
    #     |Goa, India|Fri, 26 Aug 2022|Sat, 27 Aug 2022|1     |
    #     When I choose filter
    #     |modificationFilter|
    #     |MMT Luxe          |
    #     |Beachfront        |
    #     Then select hotel and verify hotel details
    #     |hotelName  |
    #     |Lalit Golf |
    #     When I select room
    #     |roomType    |roomCategory|
    #     |Lalit Legacy|Breakfast   |
    #     And enter contact information
    #     |title  |firstName  |lastName   |email         |mobileNo   |
    #     |Mrs    |Bee Fateema|T Shiras   |bts@gmail.com |9876543219 | 
    #     And select pay now
    #     Then verify total Due






    # Scenario: Booking hotel with specific room selection
    #     And enter reservation details
    #     |city   |checkInDate    |checkOutDate   |adults|
    #     |Goa    |Fri Aug 26 2022|Sat Aug 27 2022|1     |
    #     And select search button 
    #     Then verify details
    #     |city      |checkInDate     |checkOutDate    |adults|
    #     |Goa, India|Fri, 26 Aug 2022|Sat, 27 Aug 2022|1     |
    #     When I choose filter
    #     |modificationFilter |
    #     |Free Breakfast     |
    #     Then select hotel and verify hotel details
    #     |hotelName  |
    #     |Riva Beach |
    #     When I select room
    #     |roomType       |roomCategory       |
    #     |Premium Room   |Breakfast + Dinner |
    #     And enter contact information
    #     |title  |firstName  |lastName   |email         |mobileNo   |
    #     |Mrs    |Bee Fateema|T Shiras   |bts@gmail.com |9876543219 | 
    #     And select pay now
    #     Then verify total Due