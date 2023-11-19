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
        description: "Domino's Pizza, Inc., branded as Domino's, is an American multinational pizza restaurant chain founded in 1960. The corporation is Delaware-domiciled and headquartered at the Domino's Farms Office Park in Ann Arbor, Michigan.",
        socialMedia: "customercare@dominospizza.ph",
        phoneNumber: "(02) 8997 3030",
        recommendedCount: 0,
        notRecommendedCount: 0, 
    },
]);
