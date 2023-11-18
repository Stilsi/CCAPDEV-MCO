// Select the database to use.
use('restaurantDB');

// Insert a few documents into the sales collection.
db.getCollection('restaurants').insertMany([
    {  _id: "dominos_pizza",
        name: "Domino's Pizza",
        logo: {
            type: String,
            default: '/public/assets/restaurant-icons/dominos.png'   
            },
        location: "E.A. Fernandez Bldg, G/F, 2510 Taft Ave, Manila, 1004 Metro Manila",
        socialMedia: "customercare@dominospizza.ph",
        phoneNumber: "(02) 8997 3030",
        recommendedCount: 0,
        notRecommendedCount: 0, 
    },
]);
